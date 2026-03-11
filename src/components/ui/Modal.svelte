<script lang="ts">
  import type { ThemeVariant } from '../../types';
  import { onMount } from 'svelte';
  import Button from './Button.svelte';

  interface Props {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: ThemeVariant;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    children?: any;
    showActions?: boolean;
    loading?: boolean;
    closeOnBackdrop?: boolean;
  }

  let {
    title,
    isOpen = false,
    onClose,
    onConfirm,
    onCancel,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    confirmVariant = 'primary',
    size = 'md',
    children,
    showActions = true,
    loading = false,
    closeOnBackdrop = true
  }: Props = $props();

  let modalElement: HTMLDivElement | undefined = $state();

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  // Cerrar con tecla Escape
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      onClose();
    }
  };

  // Handler para teclas en backdrop
  const handleBackdropKeydown = (event: KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && closeOnBackdrop) {
      event.preventDefault();
      onClose();
    }
  };

  // Handler para teclas en modal container
  const handleContainerKeydown = (event: KeyboardEvent) => {
    // Solo detener propagación, no cerrar
    event.stopPropagation();
  };

  // Cerrar al hacer click en backdrop
  const handleBackdropClick = (event: MouseEvent) => {
    if (closeOnBackdrop && event.target === modalElement) {
      onClose();
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm?.();
  };

  // Gestionar scroll del body cuando el modal está abierto
  $effect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus trap simple - enfocar el modal
      modalElement?.focus();
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = '';
    };
  });

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  });
</script>

{#if isOpen}
  <!-- Backdrop -->
  <div 
    bind:this={modalElement}
    class="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300"
    onclick={handleBackdropClick}
    onkeydown={handleBackdropKeydown}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    tabindex="0"
  >
    <!-- Modal Container -->
    <div 
      class="relative bg-white rounded-lg shadow-xl {sizeClasses[size]} w-full transform transition-all duration-300 scale-100"
      role="document"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 id="modal-title" class="text-lg font-semibold text-gray-900">
          {title}
        </h3>
        <button
          class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
          onclick={onClose}
          type="button"
          aria-label="Cerrar modal"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6">
        {@render children?.()}
      </div>

      <!-- Actions -->
      {#if showActions}
        <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <Button
            variant="secondary"
            onclick={handleCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>
          
          {#if onConfirm}
            <Button
              variant={confirmVariant}
              onclick={handleConfirm}
              loading={loading}
              disabled={loading}
            >
              {confirmText}
            </Button>
          {/if}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  /* Animación de entrada */
  :global(body.modal-open) {
    overflow: hidden;
  }
</style>