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
		ArrowLeft,
		ArrowRight,
		type IconSource,
		// Iconos adicionales para pruebas rápidas
		Star,
		Heart,
		Bell,
		Envelope, // Era Mail
		MagnifyingGlass, // Era Search
		Plus,
		Minus,
		PencilSquare, // Era Edit
		Trash,
		Eye,
		EyeSlash,
		ArrowDownTray, // Era Download
		ArrowUpTray, // Era Upload
		Share,
		Cog8Tooth, // Settings alternativo
		Bars3, // Era Menu
		XMark, // Era X
		ChevronLeft,
		ChevronUp,
		ChevronDown
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

	// Mapeo de nombres personalizados + iconos comunes listos para usar
	const iconMap: Record<string, IconSource> = {
		// Nombres personalizados
		target: Tag,
		cog: Cog6Tooth,
		
		// Iconos comunes con nombres directos (listos para probar)
		chevronRight: ChevronRight,
		chevronLeft: ChevronLeft,
		chevronUp: ChevronUp,
		chevronDown: ChevronDown,
		home: Home,
		users: Users,
		folder: Folder,
		currencyDollar: CurrencyDollar,
		documentText: DocumentText,
		check: Check,
		exclamationTriangle: ExclamationTriangle,
		rocketLaunch: RocketLaunch,
		arrowLeft: ArrowLeft,
		arrowRight: ArrowRight,
		star: Star,
		heart: Heart,
		bell: Bell,
		mail: Envelope, // Nombre corregido
		search: MagnifyingGlass, // Nombre corregido
		plus: Plus,
		minus: Minus,
		edit: PencilSquare, // Nombre corregido
		trash: Trash,
		eye: Eye,
		eyeSlash: EyeSlash,
		download: ArrowDownTray, // Nombre corregido
		upload: ArrowUpTray, // Nombre corregido
		share: Share,
		settings: Cog8Tooth, // Nombre corregido
		menu: Bars3, // Nombre corregido
		x: XMark // Nombre corregido
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