<script lang="ts">
	import type { ThemeVariant } from '../../types';
	import { variantStyles, iconStyles, animations } from '../../lib/theme';
	import Icon from './Icon.svelte';

	interface Props {
		title: string;
		description: string;
		icon?: string; // emoji (legacy) o nombre de icono heroicons
		iconType?: 'emoji' | 'heroicons'; // especifica el tipo
		variant?: ThemeVariant;
		onclick?: () => void;
	}

	let { 
		title, 
		description, 
		icon = 'target', 
		iconType = 'heroicons', // por defecto usar heroicons
		variant = 'primary', 
		onclick 
	}: Props = $props();

	let isHovered = $state(false);
</script>

<button 
    class="border-2 rounded-xl p-6 cursor-pointer transform {variantStyles[variant]} {animations.scale} {isHovered ? 'shadow-lg' : 'shadow-md'}"
	onmouseenter={() => isHovered = true}
	onmouseleave={() => isHovered = false}
	onclick={() => onclick?.()}
>
	<div class="flex items-start gap-4">
		<div class="flex-shrink-0 mt-1">
			{#if iconType === 'emoji'}
				<span class="text-3xl {iconStyles[variant]}">{icon}</span>
			{:else}
				<Icon name={icon} variant={variant} size="xl" />
			{/if}
		</div>
		<div class="flex-1">
			<h3 class="font-bold text-lg text-gray-800 mb-2">
				{title}
			</h3>
			<p class="text-gray-600 text-sm leading-relaxed">
				{description}
			</p>
		</div>
		{#if isHovered}
			<div class="text-gray-400 transition-all duration-300 flex-shrink-0">
				<Icon name="chevronRight" variant="secondary" size="md" />
			</div>
		{/if}
	</div>
</button>