<script lang="ts">
	interface Props {
		title: string;
		description: string;
		icon?: string;
		variant?: 'primary' | 'secondary' | 'success' | 'warning';
		onclick?: () => void;
	}

	let { title, description, icon = '💡', variant = 'primary', onclick }: Props = $props();

	// Estilos dinámicos basados en la variante
	const variantStyles = {
		primary: 'border-blue-200 bg-blue-50 hover:bg-blue-100',
		secondary: 'border-gray-200 bg-gray-50 hover:bg-gray-100', 
		success: 'border-green-200 bg-green-50 hover:bg-green-100',
		warning: 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100'
	};

	const iconStyles = {
		primary: 'text-blue-600',
		secondary: 'text-gray-600',
		success: 'text-green-600', 
		warning: 'text-yellow-600'
	};

	let isHovered = $state(false);
</script>

<button 
    class="border-2 rounded-xl p-6 transition-all duration-300 cursor-pointer transform {variantStyles[variant]} {isHovered ? 'scale-105 shadow-lg' : 'shadow-md'}"
	onmouseenter={() => isHovered = true}
	onmouseleave={() => isHovered = false}
	onclick={() => onclick?.()}
>
	<div class="flex items-start gap-4">
		<div class="text-3xl {iconStyles[variant]}">
			{icon}
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
			<div class="text-gray-400 transition-all duration-300">
				→
			</div>
		{/if}
	</div>
</button>