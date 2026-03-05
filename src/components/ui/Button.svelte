<script lang="ts">
  import type { ThemeVariant } from '../../types';
  import { getButtonClasses } from '../../lib/theme';

  interface Props {
    variant?: ThemeVariant;
    size?: 'sm' | 'md' | 'lg';
    outline?: boolean;
    loading?: boolean;
    disabled?: boolean;
    class?: string;
    onclick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    children?: any;
  }

  let {
    variant = 'primary',
    size = 'md',
    outline = false,
    loading = false,
    disabled = false,
    class: className = '',
    onclick,
    type = 'button',
    children
  }: Props = $props();

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  // Computed classes usando $derived y las funciones helper del theme
  const classes = $derived([
    getButtonClasses(variant, outline),
    sizeStyles[size],
    loading && 'opacity-75 cursor-not-allowed',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  ].filter(Boolean).join(' '));
</script>

<button
  class={classes}
  disabled={disabled || loading}
  onclick={onclick}
  type={type}
>
  {#if loading}
    <div class="inline-flex items-center">
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Cargando...
    </div>
  {:else}
    {#if children}
      {@render children()}
    {:else}
      Botón
    {/if}
  {/if}
</button>