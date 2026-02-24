import type { ThemeVariant } from '../types';

// Configuración de estilos por variantes
export const variantStyles: Record<ThemeVariant, string> = {
  primary: 'border-blue-200 bg-blue-50 hover:bg-blue-100',
  secondary: 'border-gray-200 bg-gray-50 hover:bg-gray-100', 
  success: 'border-green-200 bg-green-50 hover:bg-green-100',
  warning: 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100'
};

export const iconStyles: Record<ThemeVariant, string> = {
  primary: 'text-blue-600',
  secondary: 'text-gray-600',
  success: 'text-green-600', 
  warning: 'text-yellow-600'
};

export const buttonStyles: Record<ThemeVariant, string> = {
  primary: 'bg-blue-500 hover:bg-blue-600',
  secondary: 'bg-gray-500 hover:bg-gray-600',
  success: 'bg-green-500 hover:bg-green-600',
  warning: 'bg-yellow-500 hover:bg-yellow-600'
};

// Configuración de animaciones
export const animations = {
  fadeIn: 'transition-opacity duration-300 ease-in-out',
  slideIn: 'transition-transform duration-300 ease-in-out',
  scale: 'transition-transform duration-200 ease-in-out hover:scale-105',
  bounce: 'transition-transform duration-200 ease-in-out hover:-translate-y-1'
};

// Breakpoints para responsive design
export const breakpoints = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px'
} as const;