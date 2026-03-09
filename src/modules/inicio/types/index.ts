// 🏷️ Tipos específicos del módulo inicio
export interface Hero {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
}

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  featured: boolean;
  link: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface HomeStats {
  projects: number;
  clients: number;
  years: number;
  satisfaction: number;
}