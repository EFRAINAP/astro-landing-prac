<script lang="ts">
  import Icon from '../../../components/ui/Icon.svelte';
  import { generateCardGradient } from '../utils/animations';
  import type { ServiceCard as ServiceCardType } from '../types';

  export let service: ServiceCardType;
  export let index: number = 0;
  
  $: gradient = generateCardGradient(index);
</script>

<div class="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
  <!-- Gradient background on hover -->
  <div class="absolute inset-0 bg-gradient-to-br {gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
  
  <!-- Content -->
  <div class="relative z-10">
    <!-- Icon -->
    <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br {gradient}">
      <Icon name={service.icon} size="md" variant="primary" />
    </div>
    
    <!-- Title & Description -->
    <h3 class="mb-2 font-semibold text-gray-900 group-hover:text-gray-800">
      {service.title}
    </h3>
    
    <p class="mb-4 text-sm text-gray-600 group-hover:text-gray-700">
      {service.description}
    </p>
    
    <!-- CTA -->
    <a 
      href={service.link}
      class="inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
    >
      Ver más
      <Icon name="chevronRight" size="sm" variant="primary" />
    </a>
  </div>
  
  <!-- Featured badge -->
  {#if service.featured}
    <div class="absolute right-4 top-4">
      <span class="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
        Destacado
      </span>
    </div>
  {/if}
</div>