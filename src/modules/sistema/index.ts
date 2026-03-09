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
  getUsuarios,
  getDocumentosSIG,
  getAccionesCorrectivas,
  getAuditorias,
  getMenuItems,
  getDashboardStats,
  fetchUsuarios,
  fetchDocumentosSIG
} from './services/dataService';