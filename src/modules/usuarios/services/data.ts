import type { Usuario, CreateUsuarioDTO, UpdateUsuarioDTO } from '../types';

// 👥 Datos mock de usuarios para desarrollo
const usuariosMock: Usuario[] = [
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
  },
  {
    id: '4',
    nombre: 'José Mendoza',
    email: 'jose.mendoza@empresa.com',
    rol: 'consulta',
    estado: 'inactivo',
    fechaCreacion: new Date('2024-01-20'),
    ultimoAcceso: new Date('2026-02-15'),
    departamento: 'Finanzas'
  }
];

// 📊 Servicios de datos para usuarios
export const getUsuarios = (): Usuario[] => {
  return [...usuariosMock];
};

export const getUsuarioById = (id: string): Usuario | undefined => {
  return usuariosMock.find(usuario => usuario.id === id);
};

export const createUsuario = (data: CreateUsuarioDTO): Usuario => {
  const newUser: Usuario = {
    ...data,
    id: Date.now().toString(),
    estado: 'activo',
    fechaCreacion: new Date(),
    ultimoAcceso: undefined
  };
  
  usuariosMock.push(newUser);
  return newUser;
};

export const updateUsuario = async (id: string, data: UpdateUsuarioDTO): Promise<Usuario> => {
  const index = usuariosMock.findIndex(usuario => usuario.id === id);
  if (index === -1) {
    throw new Error(`Usuario con ID ${id} no encontrado`);
  }

  usuariosMock[index] = {
    ...usuariosMock[index],
    ...data
  };
  
  return usuariosMock[index];
};

export const deleteUsuario = (id: string): boolean => {
  const index = usuariosMock.findIndex(usuario => usuario.id === id);
  if (index === -1) return false;
  
  usuariosMock.splice(index, 1);
  return true;
};

export const getUsuariosStats = () => {
  const total = usuariosMock.length;
  const activos = usuariosMock.filter(u => u.estado === 'activo').length;
  const administradores = usuariosMock.filter(u => u.rol === 'admin').length;
  const auditores = usuariosMock.filter(u => u.rol === 'auditor').length;

  return {
    total,
    activos,
    inactivos: total - activos,
    administradores,
    auditores
  };
};
