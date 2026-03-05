<script lang="ts">
	import type { ThemeVariant } from '../../types';
	import { iconStyles } from '../../lib/theme';
	import { 
		Icon as HeroIcon,
		Tag, // Similar a Target
		ChevronRight,
		Home,
		Users,
		Cog6Tooth,
		Folder,
		CurrencyDollar,
		DocumentText,
		Check,
		ExclamationTriangle,
		RocketLaunch,
		type IconSource
	} from 'svelte-hero-icons';
	
	interface Props {
		name: string;
		variant?: ThemeVariant;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		solid?: boolean;
	}

	let { 
		name, 
		variant = 'primary', 
		size = 'md', 
		solid = false 
	}: Props = $props();

	// Mapeo de nombres de iconos a iconos de Heroicons
	const iconMap: Record<string, IconSource> = {
		target: Tag, // Usando Tag como sustituto de Target
		chevronRight: ChevronRight,
		home: Home,
		users: Users,
		cog: Cog6Tooth,
		folder: Folder,
		currencyDollar: CurrencyDollar,
		documentText: DocumentText,
		check: Check,
		exclamationTriangle: ExclamationTriangle,
		rocketLaunch: RocketLaunch
	};

	// Obtener el icono
	const iconSource = $derived(iconMap[name]);

	// Clases de tamaño
	const sizeClasses = {
		sm: 'h-4 w-4',
		md: 'h-6 w-6', 
		lg: 'h-8 w-8',
		xl: 'h-12 w-12'
	};

	const iconClass = $derived(`${iconStyles[variant]} ${sizeClasses[size]}`);
</script>

{#if iconSource}
	<HeroIcon src={iconSource} {solid} class={iconClass} />
{:else}
	<!-- Fallback si el icono no existe -->
	<div class="flex items-center justify-center {sizeClasses[size]} {iconStyles[variant]} border-2 border-dashed border-gray-300 rounded">
		<span class="text-xs text-gray-400">?</span>
	</div>
{/if}