// 📦 Exportaciones del módulo sistema
export type {
  Usuario,
  DocumentoSIG,
  AccionCorrectiva,
  Auditoria,
  MenuItem,
  DashboardStats
} from './types';

export {
  getDocumentosSIG,
  getAccionesCorrectivas,
  getAuditorias,
  getMenuItems,
  getDashboardStats,
  fetchDocumentosSIG
} from './services/dataService';