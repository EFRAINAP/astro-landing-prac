<script lang="ts">
  import Modal from '../../../components/ui/Modal.svelte';
  import Button from '../../../components/ui/Button.svelte';
  import type { Usuario, CreateUsuarioDTO, UpdateUsuarioDTO } from '../types';
  import { createUsuario, updateUsuario } from '../services/data';

  interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (usuario: Usuario) => void;
    usuario?: Usuario;
    mode?: 'create' | 'edit';
  }

  let {
    isOpen = false,
    onClose,
    onSave,
    usuario,
    mode = 'create'
  }: Props = $props();

  // Estado del formulario
  let formData = $state<{
    nombre: string;
    email: string;
    rol: Usuario['rol'];
    departamento: string;
    estado: Usuario['estado'];
  }>({
    nombre: '',
    email: '',
    rol: 'consulta',
    departamento: '',
    estado: 'activo'
  });

  let loading = $state(false);
  let errors = $state<Record<string, string>>({});

  // Roles disponibles
  const rolesOptions = [
    { value: 'admin', label: 'Administrador' },
    { value: 'auditor', label: 'Auditor' },
    { value: 'responsable', label: 'Responsable' },
    { value: 'consulta', label: 'Consulta' }
  ];

  // Estados disponibles
  const estadosOptions = [
    { value: 'activo', label: 'Activo' },
    { value: 'inactivo', label: 'Inactivo' }
  ];

  // Departamentos disponibles (podrías cargarlos desde un servicio)
  const departamentosOptions = [
    'Administración',
    'Recursos Humanos',
    'Finanzas',
    'Operaciones',
    'Tecnología',
    'Ventas',
    'Marketing',
    'Producción'
  ];

  // Resetear formulario cuando cambie el modal
  $effect(() => {
    if (isOpen) {
      if (mode === 'edit' && usuario) {
        formData.nombre = usuario.nombre;
        formData.email = usuario.email;
        formData.rol = usuario.rol;
        formData.departamento = usuario.departamento;
        formData.estado = usuario.estado;
      } else {
        // Reset para crear nuevo
        formData.nombre = '';
        formData.email = '';
        formData.rol = 'consulta';
        formData.departamento = '';
        formData.estado = 'activo';
      }
      errors = {};
    }
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email no válido';
    }

    if (!formData.departamento) {
      newErrors.departamento = 'El departamento es obligatorio';
    }

    errors = newErrors;
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    loading = true;
    
    try {
      let savedUsuario: Usuario;

      if (mode === 'create') {
        const createData: CreateUsuarioDTO = {
          nombre: formData.nombre.trim(),
          email: formData.email.trim(),
          rol: formData.rol,
          departamento: formData.departamento
        };
        savedUsuario = await createUsuario(createData);
      } else {
        const updateData: UpdateUsuarioDTO = {
          nombre: formData.nombre.trim(),
          email: formData.email.trim(),
          rol: formData.rol,
          departamento: formData.departamento,
          estado: formData.estado
        };
        if (!usuario) return;
        savedUsuario = await updateUsuario(usuario.id, updateData);
      }

      onSave(savedUsuario);
      onClose();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      errors.submit = 'Error al guardar el usuario. Inténtalo de nuevo.';
    } finally {
      loading = false;
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  // Título dinámico
  const title = $derived(mode === 'create' ? 'Nuevo Usuario' : 'Editar Usuario');
</script>

<Modal
  {title}
  {isOpen}
  onClose={handleClose}
  onConfirm={handleSubmit}
  confirmText={mode === 'create' ? 'Crear Usuario' : 'Guardar Cambios'}
  confirmVariant="primary"
  {loading}
  size="lg"
>
  {#snippet children()}
    <form class="space-y-6" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
    <!-- Error general -->
    {#if errors.submit}
      <div class="bg-red-50 border border-red-200 rounded-md p-3">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
              {errors.submit}
            </h3>
          </div>
        </div>
      </div>
    {/if}

    <!-- Nombre -->
    <div>
      <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1">
        Nombre completo *
      </label>
      <input
        id="nombre"
        type="text"
        bind:value={formData.nombre}
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 {errors.nombre ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}"
        placeholder="Ej: Juan Pérez"
        disabled={loading}
      />
      {#if errors.nombre}
        <p class="mt-1 text-sm text-red-600">{errors.nombre}</p>
      {/if}
    </div>

    <!-- Email -->
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
        Email *
      </label>
      <input
        id="email"
        type="email"
        bind:value={formData.email}
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 {errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}"
        placeholder="juan@empresa.com"
        disabled={loading}
      />
      {#if errors.email}
        <p class="mt-1 text-sm text-red-600">{errors.email}</p>
      {/if}
    </div>

    <!-- Fila de Rol y Estado -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Rol -->
      <div>
        <label for="rol" class="block text-sm font-medium text-gray-700 mb-1">
          Rol *
        </label>
        <select
          id="rol"
          bind:value={formData.rol}
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          disabled={loading}
        >
          {#each rolesOptions as { value, label }}
            <option value={value}>{label}</option>
          {/each}
        </select>
      </div>

      <!-- Estado -->
      <div>
        <label for="estado" class="block text-sm font-medium text-gray-700 mb-1">
          Estado *
        </label>
        <select
          id="estado"
          bind:value={formData.estado}
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          disabled={loading}
        >
          {#each estadosOptions as { value, label }}
            <option value={value}>{label}</option>
          {/each}
        </select>
      </div>
    </div>

    <!-- Departamento -->
    <div>
      <label for="departamento" class="block text-sm font-medium text-gray-700 mb-1">
        Departamento *
      </label>
      <select
        id="departamento"
        bind:value={formData.departamento}
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 {errors.departamento ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}"
        disabled={loading}
      >
        <option value="">Seleccionar departamento...</option>
        {#each departamentosOptions as departamento}
          <option value={departamento}>{departamento}</option>
        {/each}
      </select>
      {#if errors.departamento}
        <p class="mt-1 text-sm text-red-600">{errors.departamento}</p>
      {/if}
    </div>

    <!-- Información adicional para modo edición -->
    {#if mode === 'edit' && usuario}
      <div class="bg-gray-50 rounded-md p-4">
        <h4 class="text-sm font-medium text-gray-700 mb-2">Información del sistema</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span class="font-medium">ID:</span> {usuario.id}
          </div>
          <div>
            <span class="font-medium">Creado:</span> 
            {usuario.fechaCreacion?.toLocaleDateString('es-ES') || 'No disponible'}
          </div>
          <div>
            <span class="font-medium">Último acceso:</span> 
            {usuario.ultimoAcceso?.toLocaleDateString('es-ES') || 'Nunca'}
          </div>
        </div>
      </div>
    {/if}
    </form>
  {/snippet}
</Modal>