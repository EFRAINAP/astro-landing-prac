// Tipos para el proyecto
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface FormData {
  name: string;
  email: string;
  framework: string;
  experience: string;
  newsletter: boolean;
  message: string;
}

export interface CardProps {
  title: string;
  description: string;
  icon?: string;
  variant?: ThemeVariant;
  onclick?: () => void;
}

export type ThemeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'light';