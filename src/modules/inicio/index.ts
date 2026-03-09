// 📦 Exportaciones del módulo inicio
// Permite importar todo desde un solo lugar: import { ... } from '@/modules/inicio'

// Types
export type {
  Hero,
  ServiceCard,
  Testimonial,
  HomeStats
} from './types';

// Services  
export {
  getHeroData,
  getFeaturedServices,
  getTestimonials,
  getHomeStats,
  fetchHeroData,
  fetchFeaturedServices
} from './services/homeData';

// Utils
export {
  fadeInConfig,
  staggerConfig,
  filterFeaturedServices,
  generateCardGradient,
  formatStatNumber
} from './utils/animations';

// Components (para uso en otros módulos si es necesario)
// Los componentes Svelte se importan directamente desde su ruta