// 🔄 Servicios para obtener datos del módulo inicio
import type { Hero, ServiceCard, Testimonial, HomeStats } from '../types';

// Datos estáticos (después se puede conectar a una API)
export const getHeroData = (): Hero => ({
  title: "Transformamos ideas en realidad digital",
  subtitle: "Desarrollo web moderno",
  description: "Creamos experiencias web únicas con las últimas tecnologías. Desde landing pages hasta aplicaciones complejas.",
  ctaText: "Comenzar proyecto",
  ctaLink: "/cotiza",
  backgroundImage: "/public/background-tama.png"
});

export const getFeaturedServices = (): ServiceCard[] => [
  {
    id: "web-dev",
    title: "Desarrollo Web",
    description: "Sitios web modernos, rápidos y responsive",
    icon: "rocketLaunch",
    featured: true,
    link: "/servicios#web-development"
  },
  {
    id: "ui-design",
    title: "UI/UX Design",
    description: "Diseños intuitivos centrados en el usuario",
    icon: "target",
    featured: true,
    link: "/servicios#design"
  },
  {
    id: "ecommerce", 
    title: "E-commerce",
    description: "Tiendas online optimizadas para ventas",
    icon: "currencyDollar",
    featured: true,
    link: "/servicios#ecommerce"
  }
];

export const getTestimonials = (): Testimonial[] => [
  {
    id: "client-1",
    name: "Ana García",
    role: "CEO",
    company: "TechStart",
    content: "Excelente trabajo, superaron nuestras expectativas completamente.",
    avatar: "/images/testimonials/ana.jpg",
    rating: 5
  },
  {
    id: "client-2", 
    name: "Carlos Ruiz",
    role: "Marketing Director",
    company: "GrowthCo",
    content: "El equipo entendió perfectamente nuestra visión y la ejecutó a la perfección.",
    rating: 5
  }
];

export const getHomeStats = (): HomeStats => ({
  projects: 150,
  clients: 89,
  years: 5,
  satisfaction: 98
});

// Funciones async para preparar conexión a APIs
export const fetchHeroData = async (): Promise<Hero> => {
  // Aquí irían las llamadas a CMS o API
  return getHeroData();
};

export const fetchFeaturedServices = async (): Promise<ServiceCard[]> => {
  // Aquí irían las llamadas a la API
  return getFeaturedServices();
};