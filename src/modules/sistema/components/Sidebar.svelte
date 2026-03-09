<script lang="ts">
  import Icon from '../../../components/ui/Icon.svelte';
  import type { MenuItem } from '../types';

  export let menuItems: MenuItem[];
  export let currentPath: string = '';

  $: isMenuOpen = false;
  $: isMinimized = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function toggleMinimize() {
    isMinimized = !isMinimized;
  }

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
<aside class="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 bg-gray-900 border-r border-gray-800 transition-all duration-300 {
  isMinimized ? 'lg:w-16' : 'lg:w-64'
} z-30">
  <!-- Logo/BrandSection -->
  <div class="flex items-center justify-between h-20 flex-shrink-0 px-4 bg-gradient-to-r from-blue-900 to-blue-800 border-b border-gray-700">
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
      <button 
        on:click={toggleMinimize}
        class="p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-800 transition-colors"
        title="Minimizar sidebar"
      >
        <Icon name="arrow-left" size="sm" variant="secondary" />
      </button>
    {:else}
      <button 
        on:click={toggleMinimize}
        class="w-full flex justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-800 transition-colors"
        title="Expandir sidebar"
      >
        <div class="h-8 w-8 bg-white rounded-lg flex items-center justify-center shadow-md">
          <Icon name="cog" size="sm" variant="primary" />
        </div>
      </button>
    {/if}
  </div>

  <!-- Navegación Principal -->
  <nav class="flex-1 px-2 py-6 space-y-2 overflow-y-auto">
    {#if !isMinimized}
      <div class="px-3 py-2">
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Panel Principal</p>
      </div>
    {/if}
    
    {#each menuItems as item}
      <a
        href={item.path}
        class="group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 {
          isActive(item.path)
            ? 'bg-blue-600 text-white shadow-lg border border-blue-500'
            : 'text-gray-300 hover:bg-gray-800 hover:text-white hover:shadow-md'
        }"
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

  <!-- User Section (sin footer completo) -->
  <div class="flex-shrink-0 border-t border-gray-700 bg-gray-800 p-4">
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
</aside>

<!-- Sidebar móvil -->
<div class="lg:hidden">
  <!-- Overlay mejorado -->
  {#if isMenuOpen}
    <div
      class="fixed inset-0 z-40 bg-black bg-opacity-60 backdrop-blur-sm transition-all duration-300"
      role="button"
      tabindex="0"
      on:click={toggleMenu}
      on:keydown={(e) => { if (e.key === 'Escape' || e.key === 'Enter') toggleMenu(); }}
    ></div>
  {/if}

  <!-- Panel del sidebar móvil mejorado -->
  <aside class="fixed inset-y-0 left-0 z-50 w-80 bg-gray-900 border-r border-gray-800 shadow-2xl transform transition-transform duration-300 ease-out {
    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
  }">
    <div class="flex flex-col h-full">
      
      <!-- Header móvil -->
      <div class="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-blue-900 to-blue-800 border-b border-gray-700">
        <div class="flex items-center">
          <div class="h-10 w-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-md">
            <Icon name="cog" size="sm" variant="primary" />
          </div>
          <div>
            <h1 class="text-white font-bold text-lg leading-5">Sistema SIG</h1>
            <p class="text-blue-200 text-xs">{systemInfo.company}</p>
          </div>
        </div>
        <button
          on:click={toggleMenu}
          class="p-2 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition-colors"
        >
          <Icon name="x" size="sm" variant="secondary" />
        </button>
      </div>

      <!-- Información del usuario en móvil -->
      <div class="px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div class="flex items-center">
          <img 
            class="h-12 w-12 rounded-full border-2 border-gray-600 shadow-md" 
            src={userInfo.avatar} 
            alt="Usuario" 
          />
          <div class="ml-3 flex-1">
            <p class="text-sm font-medium text-white">{userInfo.name}</p>
            <p class="text-xs text-gray-400">{userInfo.role}</p>
            <div class="flex items-center mt-1">
              <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span class="text-xs text-green-400">En línea</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Navegación móvil -->
      <nav class="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        <div class="px-2 py-2">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Panel Principal</p>
        </div>
        
        {#each menuItems as item}
          <a
            href={item.path}
            class="group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] {
              isActive(item.path)
                ? 'bg-blue-600 text-white shadow-lg border border-blue-500'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white hover:shadow-md'
            }"
            on:click={() => isMenuOpen = false}
          >
            <Icon 
              name={item.icon} 
              size="sm" 
              variant={isActive(item.path) ? 'primary' : 'secondary'} 
            />
            <span class="ml-4 flex-1">{item.label}</span>
            {#if item.badge && item.badge > 0}
              <span class="ml-3 inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-red-500 text-white">
                {item.badge}
              </span>
            {/if}
          </a>
        {/each}
      </nav>

      <!-- Footer móvil -->
      <div class="border-t border-gray-700 bg-gray-800 p-4">
        <!-- Estado del sistema -->
        <div class="flex items-center justify-between mb-4 p-3 bg-gray-700 rounded-lg">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span class="text-sm text-gray-300">{systemInfo.environment}</span>
          </div>
          <span class="text-gray-400 text-sm">{systemInfo.version}</span>
        </div>

        <!-- Botones de acción móvil -->
        <div class="grid grid-cols-2 gap-3">
          <button class="flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 hover:text-white transition-colors">
            <Icon name="cog" size="sm" variant="secondary" />
            <span class="ml-2">Configurar</span>
          </button>
          <button 
            on:click={handleLogout}
            class="flex items-center justify-center px-4 py-3 text-sm font-medium text-red-300 bg-red-900/30 rounded-lg hover:bg-red-900/50 hover:text-red-200 transition-colors"
          >
            <Icon name="x" size="sm" variant="secondary" />
            <span class="ml-2">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  </aside>
</div>

<!-- Botón de menú móvil mejorado -->
<button
  on:click={toggleMenu}
  class="lg:hidden fixed top-4 left-4 z-30 p-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:scale-105"
>
  <Icon name="target" size="sm" variant="primary" />
</button>