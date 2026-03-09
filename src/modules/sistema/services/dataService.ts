// 📊 Servicios de datos para el sistema SIG
import type { Usuario, DocumentoSIG, AccionCorrectiva, Auditoria, DashboardStats, MenuItem } from '../types';

// Datos mock para la interfaz
export const getUsuarios = (): Usuario[] => [
  {
    id: '1',
    nombre: 'Ana García',
    email: 'ana.garcia@empresa.com',
    rol: 'admin',
    estado: 'activo',
    fechaCreacion: new Date('2024-01-15'),
    ultimoAcceso: new Date('2026-03-09'),
    departamento: 'Sistemas'
  },
  {
    id: '2', 
    nombre: 'Carlos Ruiz',
    email: 'carlos.ruiz@empresa.com',
    rol: 'auditor',
    estado: 'activo',
    fechaCreacion: new Date('2024-02-20'),
    ultimoAcceso: new Date('2026-03-08'),
    departamento: 'Calidad'
  },
  {
    id: '3',
    nombre: 'María López',
    email: 'maria.lopez@empresa.com',
    rol: 'responsable',
    estado: 'activo',
    fechaCreacion: new Date('2024-03-10'),
    ultimoAcceso: new Date('2026-03-07'),
    departamento: 'Operaciones'
  }
];

export const getDocumentosSIG = (): DocumentoSIG[] => [
  {
    id: '1',
    codigo: 'PR-001',
    nombre: 'Procedimiento de Control de Documentos',
    version: '3.0',
    tipo: 'procedimiento',
    estado: 'vigente',
    fechaCreacion: new Date('2024-01-10'),
    fechaRevision: new Date('2025-01-10'),
    responsable: 'Ana García',
    descripcion: 'Control y mantenimiento de documentos del SIG'
  },
  {
    id: '2',
    codigo: 'IN-002', 
    nombre: 'Instructivo de Auditorías Internas',
    version: '2.1',
    tipo: 'instructivo',
    estado: 'vigente',
    fechaCreacion: new Date('2024-02-15'),
    responsable: 'Carlos Ruiz'
  }
];

export const getAccionesCorrectivas = (): AccionCorrectiva[] => [
  {
    id: '1',
    codigo: 'AC-001-2026',
    titulo: 'No conformidad en proceso de revisión documental',
    descripcion: 'Se detectaron documentos sin revisión periódica',
    causaRaiz: 'Falta de procedimiento de control de versiones',
    fechaDeteccion: new Date('2026-02-15'),
    fechaLimite: new Date('2026-04-15'),
    estado: 'enProceso',
    responsable: 'María López',
    verificador: 'Carlos Ruiz',
    prioridad: 'alta',
    origen: 'auditoria'
  },
  {
    id: '2',
    codigo: 'AC-002-2026',
    titulo: 'Mejora en capacitación de personal',
    descripcion: 'Actualizar programa de capacitación en ISO 9001',
    causaRaiz: 'Cambios en normativa',
    fechaDeteccion: new Date('2026-03-01'),
    fechaLimite: new Date('2026-06-01'),
    estado: 'abierta',
    responsable: 'Ana García',
    verificador: 'Carlos Ruiz',
    prioridad: 'media',
    origen: 'mejora'
  }
];

export const getAuditorias = (): Auditoria[] => [
  {
    id: '1', 
    codigo: 'AI-001-2026',
    tipo: 'interna',
    nombre: 'Auditoría Interna ISO 9001:2015',
    norma: 'ISO 9001:2015',
    fechaInicio: new Date('2026-03-15'),
    fechaFin: new Date('2026-03-20'),
    estado: 'planificada',
    auditorLider: 'Carlos Ruiz',
    auditores: ['Ana García', 'María López'],
    alcance: 'Todos los procesos del SGC',
    objetivos: ['Verificar cumplimiento', 'Identificar oportunidades de mejora'],
    hallazgos: 0,
    noConformidades: 0
  }
];

export const getMenuItems = (): MenuItem[] => [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'home',
    path: '/sistema'
  },
  {
    id: 'usuarios',
    label: 'Usuarios',
    icon: 'users',
    path: '/sistema/usuarios',
    badge: 3
  },
  {
    id: 'documentos',
    label: 'Documentos SIG',
    icon: 'documentText',
    path: '/sistema/documentos_sig',
    badge: 12
  },
  {
    id: 'acciones',
    label: 'Acciones Correctivas',
    icon: 'exclamationTriangle',
    path: '/sistema/accion_correctiva',
    badge: 2
  },
  {
    id: 'auditorias',
    label: 'Auditorías',
    icon: 'check',
    path: '/sistema/auditorias',
    badge: 1
  }
];

export const getDashboardStats = (): DashboardStats => ({
  totalUsuarios: 3,
  documentosVigentes: 12,
  accionesAbiertas: 2,
  auditoriasEnCurso: 1
});

// Funciones async para futuras APIs
export const fetchUsuarios = async (): Promise<Usuario[]> => {
  return getUsuarios();
};

export const fetchDocumentosSIG = async (): Promise<DocumentoSIG[]> => {
  return getDocumentosSIG();
};