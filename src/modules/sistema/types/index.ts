// 🗂️ Tipos para el módulo sistema
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'auditor' | 'responsable' | 'consulta';
  estado: 'activo' | 'inactivo';
  fechaCreacion: Date;
  ultimoAcceso?: Date;
  departamento: string;
}

export interface DocumentoSIG {
  id: string;
  codigo: string;
  nombre: string;
  version: string;
  tipo: 'procedimiento' | 'instructivo' | 'formato' | 'politica' | 'manual';
  estado: 'vigente' | 'revision' | 'obsoleto' | 'borrador';
  fechaCreacion: Date;
  fechaRevision?: Date;
  responsable: string;
  archivo?: string;
  descripcion?: string;
}

export interface AccionCorrectiva {
  id: string;
  codigo: string;
  titulo: string;
  descripcion: string;
  causaRaiz: string;
  fechaDeteccion: Date;
  fechaLimite: Date;
  estado: 'abierta' | 'enProceso' | 'cerrada' | 'vencida';
  responsable: string;
  verificador: string;
  prioridad: 'alta' | 'media' | 'baja';
  origen: 'auditoria' | 'noConformidad' | 'mejora' | 'cliente';
}

export interface Auditoria {
  id: string;
  codigo: string;
  tipo: 'interna' | 'externa' | 'seguimiento';
  nombre: string;
  norma: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: 'planificada' | 'enCurso' | 'terminada' | 'reportada';
  auditorLider: string;
  auditores: string[];
  alcance: string;
  objetivos: string[];
  hallazgos?: number;
  noConformidades?: number;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
  submenu?: MenuItem[];
}

export interface DashboardStats {
  totalUsuarios: number;
  documentosVigentes: number;
  accionesAbiertas: number;
  auditoriasEnCurso: number;
}