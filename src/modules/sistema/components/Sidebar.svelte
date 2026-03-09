<script lang="ts">
  import Icon from '../../../components/ui/Icon.svelte';
  import type { MenuItem } from '../types';

  export let menuItems: MenuItem[];
  export let currentPath: string = '';

  $: isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function isActive(path: string): boolean {
    return currentPath === path || currentPath.startsWith(path + '/');
  }
</script>

<!-- Sidebar para desktop -->
<aside class="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-gray-900 border-r border-gray-800">
  <div class="flex-1 flex flex-col min-h-0">
    <!-- Header del sidebar -->
    <div class="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900 border-b border-gray-800">
      <div class="flex items-center">
        <div class="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
          <Icon name="cog" size="sm" variant="primary" />
        </div>
        <h1 class="text-white font-bold text-lg">Sistema SIG</h1>
      </div>
    </div>

    <!-- Navegación -->
    <nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
      {#each menuItems as item}
        <a
          href={item.path}
          class="group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 {
            isActive(item.path)
              ? 'bg-gray-800 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }"
        >
          <Icon 
            name={item.icon} 
            size="sm" 
            variant={isActive(item.path) ? 'primary' : 'secondary'} 
          />
          <span class="ml-3 flex-1">{item.label}</span>
          {#if item.badge && item.badge > 0}
            <span class="ml-3 inline-block py-0.5 px-2 text-xs font-medium rounded-full bg-red-500 text-white">
              {item.badge}
            </span>
          {/if}
        </a>
      {/each}
    </nav>

    <!-- Footer del sidebar -->
    <div class="flex-shrink-0 p-4 border-t border-gray-800">
      <div class="flex items-center">
        <img class="h-8 w-8 rounded-full" src="/api/placeholder/32/32" alt="Usuario" />
        <div class="ml-3">
          <p class="text-sm font-medium text-white">Admin Usuario</p>
          <p class="text-xs text-gray-400">admin@empresa.com</p>
        </div>
      </div>
    </div>
  </div>
</aside>

<!-- Sidebar móvil -->
<div class="lg:hidden">
  <!-- Overlay -->
  {#if isMenuOpen}
    <div
      class="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
      role="button"
      tabindex="0"
      on:click={toggleMenu}
      on:keydown={(e) => { if (e.key === 'Escape' || e.key === 'Enter') toggleMenu(); }}
    ></div>
  {/if}

  <!-- Panel del sidebar móvil -->
  <aside class="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ease-in-out {
    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
  } lg:translate-x-0 lg:static lg:inset-0">
    <div class="flex items-center justify-between h-16 px-4 bg-gray-900 border-b border-gray-800 lg:justify-center">
      <div class="flex items-center">
        <div class="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
          <Icon name="cog" size="sm" variant="primary" />
        </div>
        <h1 class="text-white font-bold text-lg">Sistema SIG</h1>
      </div>
      <button
        on:click={toggleMenu}
        class="lg:hidden p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
      >
        ✕
      </button>
    </div>

    <!-- Mismo contenido de navegación -->
    <nav class="flex-1 px-2 py-4 space-y-1">
      {#each menuItems as item}
        <a
          href={item.path}
          class="group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 {
            isActive(item.path)
              ? 'bg-gray-800 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }"
          on:click={() => isMenuOpen = false}
        >
          <Icon 
            name={item.icon} 
            size="sm" 
            variant={isActive(item.path) ? 'primary' : 'secondary'} 
          />
          <span class="ml-3 flex-1">{item.label}</span>
          {#if item.badge && item.badge > 0}
            <span class="ml-3 inline-block py-0.5 px-2 text-xs font-medium rounded-full bg-red-500 text-white">
              {item.badge}
            </span>
          {/if}
        </a>
      {/each}
    </nav>
  </aside>
</div>

<!-- Botón de menú móvil -->
<button
  on:click={toggleMenu}
  class="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-gray-900 text-white hover:bg-gray-700 transition-colors"
>
  <Icon name="target" size="sm" variant="primary" />
</button>