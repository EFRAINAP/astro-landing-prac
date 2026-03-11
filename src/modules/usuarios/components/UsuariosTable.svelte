<script lang="ts">
  import UsuarioModal from './UsuarioModal.svelte';
  import Button from '../../../components/ui/Button.svelte';
  import type { Usuario } from '../types';

  interface Props {
    usuarios: Usuario[];
  }

  let { usuarios }: Props = $props();

  // Estado del modal
  let showModal = $state(false);
  let editingUsuario = $state<Usuario | undefined>(undefined);
  let mode = $state<'create' | 'edit'>('create');

  // Lista local de usuarios (para updates inmediatos)
  let localUsuarios = $derived([...usuarios]);

  // Handlers para abrir modal
  const openCreateModal = () => {
    editingUsuario = undefined;
    mode = 'create';
    showModal = true;
  };

  const openEditModal = (usuario: Usuario) => {
    editingUsuario = usuario;
    mode = 'edit';
    showModal = true;
  };

  // Handler para cerrar modal
  const closeModal = () => {
    showModal = false;
    editingUsuario = undefined;
  };

  // Handler para cuando se guarda un usuario
  const handleUsuarioSaved = (usuario: Usuario) => {
    if (mode === 'create') {
      // Añadir nuevo usuario a la lista
      localUsuarios = [...localUsuarios, usuario];
    } else {
      // Actualizar usuario existente
      localUsuarios = localUsuarios.map(u => 
        u.id === usuario.id ? usuario : u
      );
    }
  };

  // Handler para eliminar usuario (para futura implementación)
  const handleDeleteUsuario = async (usuarioId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        // Aquí llamarías al servicio deleteUsuario
        // await deleteUsuario(usuarioId);
        localUsuarios = localUsuarios.filter(u => u.id !== usuarioId);
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('Error al eliminar el usuario');
      }
    }
  };
</script>

<div>
  <!-- Tabla de usuarios -->
  <div class="bg-white shadow rounded-lg overflow-hidden">
    <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">Lista de Usuarios</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">Gestión de usuarios del sistema</p>
        </div>
        <Button
          variant="primary"
          onclick={openCreateModal}
          class="inline-flex items-center"
        >
          <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Usuario
        </Button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usuario
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rol
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Departamento
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Último Acceso
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each localUsuarios as usuario (usuario.id)}
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img 
                      class="h-10 w-10 rounded-full" 
                      src="/api/placeholder/40/40" 
                      alt={usuario.nombre} 
                    />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{usuario.nombre}</div>
                    <div class="text-sm text-gray-500">{usuario.email}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  usuario.rol === 'admin' ? 'bg-purple-100 text-purple-800' :
                  usuario.rol === 'auditor' ? 'bg-blue-100 text-blue-800' :
                  usuario.rol === 'responsable' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {usuario.rol === 'admin' ? 'Administrador' :
                   usuario.rol === 'auditor' ? 'Auditor' :
                   usuario.rol === 'responsable' ? 'Responsable' : 'Consulta'}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {usuario.departamento}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  usuario.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {usuario.estado === 'activo' ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {usuario.ultimoAcceso?.toLocaleDateString('es-ES') || 'Nunca'}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button 
                  class="text-blue-600 hover:text-blue-900 mr-3 font-medium"
                  onclick={() => openEditModal(usuario)}
                >
                  Editar
                </button>
                <button 
                  class="text-red-600 hover:text-red-900 font-medium"
                  onclick={() => handleDeleteUsuario(usuario.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      
      <!-- Estado vacío -->
      {#if localUsuarios.length === 0}
        <div class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No hay usuarios</h3>
          <p class="mt-1 text-sm text-gray-500">Comienza creando un nuevo usuario.</p>
          <div class="mt-6">
            <Button variant="primary" onclick={openCreateModal}>
              <svg class="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Nuevo Usuario
            </Button>
          </div>
        </div>
      {/if}
    </div>
  </div>

  <!-- Modal de usuario -->
  <UsuarioModal
    isOpen={showModal}
    onClose={closeModal}
    onSave={handleUsuarioSaved}
    usuario={editingUsuario}
    {mode}
  />
</div>