// � Tipos para el módulo de usuarios

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

export interface CreateUsuarioDTO {
  nombre: string;
  email: string;
  rol: Usuario['rol'];
  departamento: string;
}

export interface UpdateUsuarioDTO extends Partial<CreateUsuarioDTO> {
  estado?: Usuario['estado'];
}
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