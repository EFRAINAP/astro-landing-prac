// ⚡ Utilidades específicas del módulo inicio
import type { ServiceCard } from '../types';

/**
 * Configuraciones de animaciones para la página de inicio
 */
export const fadeInConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const staggerConfig = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

/**
 * Filtra servicios destacados
 */
export const filterFeaturedServices = (services: ServiceCard[]): ServiceCard[] => {
  return services.filter(service => service.featured);
};

/**
 * Genera gradientes dinámicos para cards
 */
export const generateCardGradient = (index: number): string => {
  const gradients = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600', 
    'from-orange-500 to-red-600',
    'from-pink-500 to-rose-600'
  ];
  return gradients[index % gradients.length];
};

/**
 * Formatea números para estadísticas
 */
export const formatStatNumber = (num: number): string => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};