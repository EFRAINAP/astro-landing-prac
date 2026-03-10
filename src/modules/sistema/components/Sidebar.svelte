<script lang="ts">
  import Icon from '../../../components/ui/Icon.svelte';
  import type { MenuItem } from '../types';

  export let menuItems: MenuItem[];
  export let currentPath: string = '';

  $: isMinimized = false;
  
  function toggleMinimize() {
    isMinimized = !isMinimized;
    
    // Ajustar el contenido principal
    setTimeout(() => {
      const mainContent = document.querySelector('[data-main-content]');
      if (mainContent && mainContent instanceof HTMLElement) {
        mainContent.style.marginLeft = isMinimized ? '4rem' : '16rem';
      }
    }, 50);
  }
  
  // Escuchar eventos desde el header
  import { onMount } from 'svelte';
  
  onMount(() => {
    window.addEventListener('toggleSidebar', toggleMinimize);
    return () => window.removeEventListener('toggleSidebar', toggleMinimize);
  });

  function isActive(path: string): boolean {
    return currentPath === path || currentPath.startsWith(path + '/');
  }

  function handleLogout() {
    // Lógica de logout aquí
    console.log('Cerrando sesión...');
  }

  // Información del sistema
  const systemInfo = {
    company: "TU EMPRESA",
    version: "v2.5.1",
    environment: "Producción"
  };

  const userInfo = {
    name: "Admin Usuario", 
    email: "admin@empresa.com",
    role: "Administrador",
    avatar: "/api/placeholder/32/32"
  };
</script>

<!-- Sidebar fijo para desktop -->
<aside class="fixed top-0 left-0 z-20 h-full bg-gray-900 border-r 
              border-gray-800 shadow-xl transition-all duration-300 
              flex flex-col {isMinimized ? 'w-16' : 'w-64'}">
  <div class="flex flex-col h-full">
    
    <!-- Logo/BrandSection -->
    <div class="flex items-center justify-between flex-shrink-0 
                px-4 bg-gradient-to-r from-blue-900 to-blue-800 border-b 
                border-gray-700 {isMinimized ? 'h-16' : 'h-16'}">
      {#if !isMinimized}
        <div class="flex items-center">
          <div class="h-10 w-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-md">
            <Icon name="cog" size="sm" variant="primary" />
          </div>
          <div>
            <h1 class="text-white font-bold text-lg leading-5">Sistema SIG</h1>
            <p class="text-blue-200 text-xs">{systemInfo.company}</p>
          </div>
        </div>
        <!-- Ya no hay botón aquí, se movió al header -->
      {/if}
    </div>

    <!-- Navegación Principal -->
    <nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
      {#if !isMinimized}
        <div class="px-3 py-2">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Panel Principal</p>
        </div>
      {/if}
      
      {#each menuItems as item}
        <a
          href={item.path}
          class="group flex items-center text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 {isMinimized ? 'px-2 py-3 justify-center' : 'px-3 py-3'}"
          class:bg-blue-600={isActive(item.path)}
          class:text-white={isActive(item.path)}
          class:shadow-lg={isActive(item.path)}
          class:border={isActive(item.path)}
          class:border-blue-500={isActive(item.path)}
          class:text-gray-300={!isActive(item.path)}
          class:hover:bg-gray-800={!isActive(item.path)}
          class:hover:text-white={!isActive(item.path)}
          class:hover:shadow-md={!isActive(item.path)}
          title={isMinimized ? item.label : ''}
        >
          <div class="flex-shrink-0">
            <Icon 
              name={item.icon} 
              size="sm" 
              variant={isActive(item.path) ? 'primary' : 'secondary'} 
            />
          </div>
          
          {#if !isMinimized}
            <span class="ml-3 flex-1">{item.label}</span>
            {#if item.badge && item.badge > 0}
              <span class="ml-3 inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-red-500 text-white animate-pulse">
                {item.badge}
              </span>
            {/if}
          {:else if item.badge && item.badge > 0}
            <div class="absolute left-8 top-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          {/if}
        </a>
      {/each}
    </nav>

    <!-- User Section -->
    <div class="flex-shrink-0 border-t border-gray-700 bg-gray-800 p-4 transition-all duration-300 h-16">
      {#if !isMinimized}
        <div class="flex items-center">
          <img 
            class="h-10 w-10 rounded-full border-2 border-gray-600 shadow-md" 
            src={userInfo.avatar} 
            alt="Usuario" 
          />
          <div class="ml-3 flex-1 min-w-0">
            <p class="text-sm font-medium text-white truncate">{userInfo.name}</p>
            <p class="text-xs text-gray-400 truncate">{userInfo.role}</p>
          </div>
          <button 
            on:click={handleLogout}
            class="ml-2 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            title="Cerrar sesión"
          >
            <Icon name="x" size="sm" variant="secondary" />
          </button>
        </div>
      {:else}
        <div class="flex flex-col items-center space-y-2">
          <img 
            class="h-8 w-8 rounded-full border-2 border-gray-600 shadow-md" 
            src={userInfo.avatar} 
            alt="Usuario" 
            title={userInfo.name}
          />
        </div>
      {/if}
    </div>
  </div>
</aside>

