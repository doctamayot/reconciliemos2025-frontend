import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import * as authApi from '../services/authApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SetPasswordModal from '../components/admin/SetPasswordModal';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { PencilSquareIcon, TrashIcon, CheckCircleIcon, XCircleIcon, KeyIcon } from '@heroicons/react/24/outline';
import SearchBar from '../components/common/SearchBar';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { debounce } from 'lodash'
const MySwal = withReactContent(Swal);

const PAGE_LIMIT = 15;

const AdminUserListPage = () => {
  // --- Estados del Componente ---
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('todos');
  
  // Estado para el valor inmediato del input del buscador
  const [searchInputValue, setSearchInputValue] = useState('');
  // Estado para el valor "debounced" que realmente dispara la búsqueda en la API
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [elementToObserveRef, isSentinelVisible] = useIntersectionObserver({ rootMargin: '0px 0px 200px 0px' });

  const fetchUsers = useCallback(async (pageNum, roleFilter, searchFilter, shouldAppend) => {
    setIsLoading(true);
    setError('');
    try {
      const data = await authApi.adminGetAllUsers(pageNum, PAGE_LIMIT, roleFilter, searchFilter);
      setUsers(prevUsers => shouldAppend ? [...prevUsers, ...data.users] : data.users);
      setHasMore(data.hasMore);
    } catch (err) {
      setError(err.message || 'Error al cargar la lista de usuarios.');
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // --- LÓGICA DE DEBOUNCE PARA LA BÚSQUEDA ---
  const debouncedSetSearchTerm = useMemo(
    () => debounce((value) => {
      setDebouncedSearchTerm(value);
    }, 500), // 500ms de retraso
    [] // Se crea solo una vez
  );

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchInputValue(value); // Actualiza el input inmediatamente
    debouncedSetSearchTerm(value); // Llama a la versión debounced para actualizar el término de búsqueda real
  };

  useEffect(() => {
    return () => {
      debouncedSetSearchTerm.cancel(); // Limpia el debounce al desmontar
    };
  }, [debouncedSetSearchTerm]);
  // --- FIN LÓGICA DE DEBOUNCE ---


  // Efecto para la carga inicial y cuando los filtros o la búsqueda (debounced) cambian
  useEffect(() => {
    setPage(1);
    setUsers([]);
    setHasMore(true);
    fetchUsers(1, filterRole, debouncedSearchTerm, false);
  }, [filterRole, debouncedSearchTerm, fetchUsers]);

  // Efecto para cargar más páginas con scroll infinito
  useEffect(() => {
    if (isSentinelVisible && hasMore && !isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  }, [isSentinelVisible, hasMore, isLoading]);

  // Efecto que reacciona al cambio de página para cargar más datos
  useEffect(() => {
    if (page > 1) {
      fetchUsers(page, filterRole, debouncedSearchTerm, true);
    }
  }, [page, filterRole, debouncedSearchTerm, fetchUsers]);
  
  // --- Manejadores de Acciones ---
  const handleOpenPasswordModal = (user) => { setSelectedUser(user); setIsPasswordModalOpen(true); };
  const handleClosePasswordModal = () => { setSelectedUser(null); setIsPasswordModalOpen(false); };
  const handlePasswordUpdateSuccess = (successMessage) => { MySwal.fire({ title: '¡Éxito!', text: successMessage, icon: 'success', timer: 2000, showConfirmButton: false }); };
  
  const toggleUserStatus = async (user) => {
    const newStatus = !user.isActive;
    const actionText = newStatus ? 'activar' : 'desactivar';
    MySwal.fire({
        title: `¿Confirmar ${actionText} cuenta?`,
        html: `Deseas ${actionText} la cuenta de <strong>${user.firstName} ${user.lastName}</strong>?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: newStatus ? '#10B981' : '#EF4444',
        cancelButtonColor: '#6B7280',
        confirmButtonText: `Sí, ¡${actionText}!`,
        cancelButtonText: 'Cancelar',
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await authApi.adminUpdateUser(user._id, { isActive: newStatus });
                MySwal.fire('¡Estado Cambiado!', `La cuenta ha sido ${newStatus ? 'activada' : 'desactivada'}.`, 'success');
                // Actualizar el estado localmente para reflejar el cambio inmediatamente
                setUsers(prev => prev.map(u => u._id === user._id ? { ...u, isActive: newStatus } : u));
            } catch (err) {
                MySwal.fire('Error', err.message || `No se pudo cambiar el estado del usuario.`, 'error');
            }
        }
    });
  };

  const handleDeleteUser = (userId, userName) => {
    MySwal.fire({
        title: '¿Estás seguro?',
        html: `Deseas eliminar al usuario <strong>${userName}</strong>?<br/>¡Esta acción no se puede deshacer!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, ¡eliminar!',
        cancelButtonText: 'Cancelar',
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await authApi.adminDeleteUser(userId);
                MySwal.fire('¡Eliminado!', `El usuario ${userName} ha sido eliminado.`, 'success');
                // Actualizar el estado localmente para reflejar el cambio inmediatamente
                setUsers(prev => prev.filter(u => u._id !== userId));
            } catch (err) {
                MySwal.fire('Error', err.message || 'No se pudo eliminar el usuario.', 'error');
            }
        }
    });
  };

  const filterButtons = [
    { label: 'Todos', value: 'todos' }, { label: 'Conciliadores', value: 'conciliador' },
    { label: 'Terceros', value: 'tercero' }, { label: 'Admins', value: 'admin' },
  ];

  if (isLoading && page === 1) {
    return (<div className="flex justify-center items-center min-h-[calc(100vh-200px)]"><LoadingSpinner message="Buscando usuarios..." /></div>);
  }

  return (
    <>
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6 text-center sm:text-left">Lista de Usuarios del Sistema</h1>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Filtrar por rol:</span>
            {filterButtons.map(button => (
              <button
                key={button.value}
                onClick={() => setFilterRole(button.value)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ${filterRole === button.value ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {button.label}
              </button>
            ))}
          </div>
          <SearchBar 
            value={searchInputValue} 
            onChange={handleSearchChange} 
            placeholder="Buscar por nombre, email, etc."
          />
        </div>
      
        {error && !isLoading && <p className="text-sm text-red-500 my-2 text-center">{error}</p>}

        <div className="bg-white shadow-xl rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email / Rol</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Info Adicional</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="text-gray-900">{user.email}</div>
                    <span className={`mt-1 px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-red-100 text-red-800' : user.role === 'conciliador' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>Cédula: {user.cedula}</div>
                    {user.role === 'conciliador' && <div>SICAAC: {user.numeroSicac || '-'}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    <button onClick={() => toggleUserStatus(user)} className={`p-1 rounded-full transition-colors duration-150 focus:outline-none hover:opacity-80 ${user.isActive ? 'text-green-500' : 'text-red-500'}`} title={user.isActive ? 'Desactivar Cuenta' : 'Activar Cuenta'}>
                      {user.isActive ? <CheckCircleIcon className="h-6 w-6"/> : <XCircleIcon className="h-6 w-6"/>}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center justify-center space-x-2">
                        <Link to={`/admin/editar-usuario/${user._id}`} className="text-indigo-600 p-2 rounded-full hover:bg-indigo-100 transition-colors" title="Editar Usuario"><PencilSquareIcon className="h-5 w-5"/></Link>
                        <button onClick={() => handleOpenPasswordModal(user)} className="text-yellow-600 p-2 rounded-full hover:bg-yellow-100 transition-colors" title="Cambiar Contraseña"><KeyIcon className="h-5 w-5" /></button>
                        <button onClick={() => handleDeleteUser(user._id, `${user.firstName} ${user.lastName}`)} className="text-red-600 p-2 rounded-full hover:bg-red-100 transition-colors" title="Eliminar Usuario" disabled={isLoading}><TrashIcon className="h-5 w-5"/></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-sm text-gray-500 italic">No se encontraron usuarios para los criterios actuales.</td></tr>
              )}
              {hasMore && (
                <tr><td colSpan="5" ref={elementToObserveRef} className="p-4 h-20 text-center">{isLoading && page > 1 && <LoadingSpinner size="sm" message="Cargando más..." />}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isPasswordModalOpen && (<SetPasswordModal user={selectedUser} onClose={handleClosePasswordModal} onSuccess={handlePasswordUpdateSuccess}/>)}
    </>
  );
};
export default AdminUserListPage;