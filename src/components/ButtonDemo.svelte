<script lang="ts">
  import Button from './ui/Button.svelte';
  
  let isLoading = $state(false);
  let message = $state('');

  async function handleClick() {
    isLoading = true;
    message = 'Procesando...';
    
    // Simular proceso async
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    isLoading = false;
    message = '¡Proceso completado! 🎉';
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(() => message = '', 3000);
  }
</script>

<div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
  <h3 class="text-xl font-bold text-gray-800 mb-4">🧪 Prueba del Button</h3>
  
  <!-- Grid de botones de ejemplo -->
  <div class="space-y-4">
    <!-- Tamaños -->
    <div>
      <h4 class="text-sm font-semibold text-gray-600 mb-2">Tamaños:</h4>
      <div class="flex gap-2">
        <Button size="sm" variant="secondary">Pequeño</Button>
        <Button size="md">Mediano</Button>
        <Button size="lg" variant="success">Grande</Button>
      </div>
    </div>

    <!-- Variantes -->
    <div>
      <h4 class="text-sm font-semibold text-gray-600 mb-2">Variantes:</h4>
      <div class="grid grid-cols-2 gap-2">
        <Button variant="primary">Primario</Button>
        <Button variant="secondary">Secundario</Button>
        <Button variant="success">Éxito</Button>
        <Button variant="warning">Advertencia</Button>
      </div>
    </div>

    <!-- Estados -->
    <div>
      <h4 class="text-sm font-semibold text-gray-600 mb-2">Estados:</h4>
      <div class="flex gap-2">
        <Button disabled>Deshabilitado</Button>
        <Button loading={isLoading} onclick={handleClick}>
          {isLoading ? 'Cargando...' : 'Procesar'}
        </Button>
      </div>
    </div>

    <!-- Botón personalizado -->
    <div>
      <h4 class="text-sm font-semibold text-gray-600 mb-2">Personalizado:</h4>
      <Button 
        variant="primary" 
        size="lg" 
        class="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        onclick={() => alert('¡Button personalizado funciona! 🎨')}
      >
        🚀 ¡Button Épico!
      </Button>
    </div>

    <!-- Mensaje de estado -->
    {#if message}
      <div class="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
        <p class="text-green-700 text-sm">{message}</p>
      </div>
    {/if}
  </div>
</div>