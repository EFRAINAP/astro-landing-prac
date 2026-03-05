import type { ThemeVariant } from '../types';

// 🎨 SISTEMA DE DISEÑO CENTRALIZADO
// Todos los estilos del proyecto en un solo lugar para consistencia

// 🎯 Estilos para Cards y elementos con fondo suave
export const variantStyles: Record<ThemeVariant, string> = {
  primary: 'border-blue-200 bg-blue-50 hover:bg-blue-100',
  secondary: 'border-gray-200 bg-gray-50 hover:bg-gray-100', 
  success: 'border-green-200 bg-green-50 hover:bg-green-100',
  warning: 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100'
};

// 🎯 Colores de iconos y texto
export const iconStyles: Record<ThemeVariant, string> = {
  primary: 'text-blue-600',
  secondary: 'text-gray-600',
  success: 'text-green-600', 
  warning: 'text-yellow-600'
};

// 🎯 Estilos para botones sólidos
export const buttonStyles: Record<ThemeVariant, string> = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
  success: 'bg-green-500 hover:bg-green-600 text-white',
  warning: 'bg-yellow-500 hover:bg-yellow-600 text-white'
};

// 🎯 Estilos para botones outline (borde)
export const buttonOutlineStyles: Record<ThemeVariant, string> = {
  primary: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
  secondary: 'border-2 border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white',
  success: 'border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white',
  warning: 'border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white'
};

// 🎭 Animaciones reutilizables
export const animations = {
  fadeIn: 'transition-opacity duration-300 ease-in-out',
  slideIn: 'transition-transform duration-300 ease-in-out',
  scale: 'transition-all duration-200 ease-in-out hover:scale-105',
  bounce: 'transition-transform duration-200 ease-in-out hover:-translate-y-1',
  glow: 'transition-shadow duration-300 ease-in-out hover:shadow-lg',
  float: 'transition-transform duration-300 ease-in-out hover:-translate-y-2'
};

// 📱 Breakpoints para responsive design
export const breakpoints = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

// 📏 Espaciados consistentes
export const spacing = {
  xs: 'p-2',
  sm: 'p-4', 
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-12'
};

// 🔤 Tamaños de texto
export const textSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl'
};

// 🔄 Funciones helper para combinar estilos
export const getButtonClasses = (variant: ThemeVariant, outline = false) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold transition-all duration-300 cursor-pointer';
  const variantClasses = outline ? buttonOutlineStyles[variant] : buttonStyles[variant];
  return `${baseClasses} ${variantClasses}`;
};

export const getCardClasses = (variant: ThemeVariant, animated = true) => {
  const baseClasses = 'border-2 rounded-xl p-6';
  const variantClasses = variantStyles[variant];
  const animationClasses = animated ? `${animations.scale} ${animations.glow}` : '';
  return `${baseClasses} ${variantClasses} ${animationClasses}`;
};