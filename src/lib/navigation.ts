// 🧭 CONFIGURACIÓN CENTRALIZADA DE NAVEGACIÓN
// Edita este archivo UNA VEZ y se actualiza en todo el sitio

export interface NavItem {
  name: string;
  href: string;
  icon: string;
  description?: string;
  showInHeader?: boolean;
  showInFooter?: boolean;
}

// 🎯 Lista principal de páginas del sitio
export const navigation: NavItem[] = [
  {
    name: "Inicio",
    href: "/",
    icon: "🏠",
    description: "Página principal",
    showInHeader: true,
    showInFooter: true
  },
  {
    name: "Nosotros",
    href: "/nosotros",
    icon: "👥",
    description: "Conoce nuestro equipo",
    showInHeader: true,
    showInFooter: true
  },
  {
    name: "Servicios",
    href: "/servicios",
    icon: "⚙️",
    description: "Nuestros servicios",
    showInHeader: true,
    showInFooter: true
  },
  {
    name: "Proyectos",
    href: "/proyectos", 
    icon: "📁",
    description: "Portfolio de trabajos",
    showInHeader: true,
    showInFooter: true
  },
  {
    name: "Blog",
    href: "/blog",
    icon: "📝",
    description: "Artículos y noticias",
    showInHeader: true,
    showInFooter: true
  },
  {
    name: "Cotizar",
    href: "/cotiza",
    icon: "💰",
    description: "Solicita una cotización",
    showInHeader: true,
    showInFooter: false
  },
  {
    name: "Diseño",
    href: "/design-system",
    icon: "🎨",
    description: "Componentes del sitio",
    showInHeader: true,
    showInFooter: true
  },
  {
    name: "Demo",
    href: "/demo-modular",
    icon: "🚀",
    description: "Demostración de funcionalidades",
    showInHeader: true,
    showInFooter: true
  },
];

// 🔍 Funciones helper
export const getHeaderNavItems = () => navigation.filter(item => item.showInHeader);
export const getFooterNavItems = () => navigation.filter(item => item.showInFooter);
export const getCurrentPage = (pathname: string) => navigation.find(item => item.href === pathname);
