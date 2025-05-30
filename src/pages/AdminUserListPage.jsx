// src/pages/AdminUserListPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authApi from '../services/authApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { UserCircleIcon, PencilSquareIcon, TrashIcon, CheckCircleIcon, XCircleIcon, EyeIcon, UserPlusIcon } from '@heroicons/react/24/outline';

// Importaciones para SweetAlert2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal); // Crea una instancia de Swal compatible con React

const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('todos');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  // const navigate = useNavigate(); // Descomenta si lo necesitas para editar

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await authApi.adminGetAllUsers();
      setUsers(data || []);
      setFilteredUsers(data || []);
    } catch (err) {
      setError(err.message || 'Error al cargar la lista de usuarios.');
      setUsers([]);
      setFilteredUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (filterRole === 'todos') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => user.role === filterRole));
    }
  }, [filterRole, users]);

  const handleDeleteUser = async (userId, userName) => {
    MySwal.fire({
      title: '¿Estás seguro?',
      html: `Deseas eliminar al usuario <strong>${userName}</strong>?<br/>¡Esta acción no se puede deshacer!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33', // Rojo de Tailwind (red-600 o red-500)
      cancelButtonColor: '#3085d6', // Azul de Tailwind (blue-600 o blue-500)
      confirmButtonText: 'Sí, ¡eliminar!',
      cancelButtonText: 'Cancelar',
      customClass: { // Clases personalizadas si necesitas ajustar más el estilo
        popup: 'rounded-lg',
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        // setIsLoading(true); // Podrías tener un loading específico para la fila o general
        try {
          await authApi.adminDeleteUser(userId);
          MySwal.fire(
            '¡Eliminado!',
            `El usuario ${userName} ha sido eliminado.`,
            'success'
          );
          fetchUsers(); // Recargar la lista de usuarios
        } catch (err) {
          MySwal.fire(
            'Error',
            err.message || 'No se pudo eliminar el usuario.',
            'error'
          );
          // setIsLoading(false);
        }
      }
    });
  };

  const toggleUserStatus = async (user) => {
    const newStatus = !user.isActive;
    const actionText = newStatus ? 'activar' : 'desactivar';

    MySwal.fire({
      title: `¿Confirmar ${actionText} cuenta?`,
      html: `Deseas ${actionText} la cuenta de <strong>${user.firstName} ${user.lastName}</strong>?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: newStatus ? '#10B981' : '#EF4444', // Verde para activar, Rojo para desactivar (Tailwind green-500, red-500)
      cancelButtonColor: '#6B7280', // Gris (Tailwind gray-500)
      confirmButtonText: `Sí, ¡${actionText}!`,
      cancelButtonText: 'Cancelar',
      customClass: { popup: 'rounded-lg' }
    }).then(async (result) => {
      if (result.isConfirmed) {
        // setIsLoading(true);
        try {
          await authApi.adminUpdateUser(user._id, { isActive: newStatus });
          MySwal.fire(
            `¡Estado Cambiado!`,
            `La cuenta ha sido ${newStatus ? 'activada' : 'desactivada'}.`,
            'success'
          );
          fetchUsers(); // Recargar lista
        } catch (err) {
          MySwal.fire(
            'Error',
            err.message || `No se pudo cambiar el estado del usuario.`,
            'error'
          );
          // setIsLoading(false);
        }
      }
    });
  };

  const filterButtons = [
    { label: 'Todos', value: 'todos' },
    { label: 'Conciliadores', value: 'conciliador' },
    { label: 'Terceros', value: 'tercero' },
    { label: 'Admins', value: 'admin' },
  ];

  // Renderizado condicional de Loading y Error
  if (isLoading && users.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner message="Cargando usuarios..." />
      </div>
    );
  }
  if (error && users.length === 0) {
    return <div className="text-center text-red-600 p-8 text-lg">{error}</div>;
  }


  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-800">Lista de Usuarios</h1>
        
      </div>

      {/* Filtros */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700 mr-2">Filtrar por rol:</span>
        {filterButtons.map(button => (
          <button
            key={button.value}
            onClick={() => setFilterRole(button.value)}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
              ${filterRole === button.value
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            {button.label}
          </button>
        ))}
      </div>
      
      {isLoading && <p className="text-sm text-gray-500 my-2 text-center">Actualizando lista...</p>}
      {error && !isLoading && <p className="text-sm text-red-500 my-2 text-center">{error}</p>}


      <div className="bg-white shadow-xl rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100"> {/* Un gris un poco más oscuro para el header */}
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cédula</th>
              {/* <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Celular</th> */}
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nº SICAAC</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.length > 0 ? filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.cedula}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phoneNumber || '-'}</td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.role === 'admin' ? 'bg-red-100 text-red-800' :
                          user.role === 'conciliador' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.numeroSicac || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <button onClick={() => toggleUserStatus(user)} className={`p-1 rounded-full transition-colors duration-150 focus:outline-none hover:opacity-80 ${user.isActive ? 'text-green-500' : 'text-red-500'}`} title={user.isActive ? 'Desactivar Cuenta' : 'Activar Cuenta'}>
                    {user.isActive ? (
                      <CheckCircleIcon className="h-6 w-6"/>
                    ) : (
                      <XCircleIcon className="h-6 w-6"/>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1 text-center"> {/* Centrado y menos espacio */}
                  <Link
                    to={`/admin/editar-usuario/${user._id}`}
                    className="text-indigo-600 hover:text-indigo-800 p-1 inline-block"
                    title="Editar Usuario"
                  >
                    <PencilSquareIcon className="h-5 w-5"/>
                  </Link>
                  <button
                    onClick={() => handleDeleteUser(user._id, `${user.firstName} ${user.lastName}`)}
                    className="text-red-600 hover:text-red-800 p-1 inline-block"
                    title="Eliminar Usuario"
                    disabled={isLoading && users.length > 0} // Deshabilitar mientras la lista entera carga
                  >
                    <TrashIcon className="h-5 w-5"/>
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="8" className="px-6 py-12 text-center text-sm text-gray-500 italic">
                  No se encontraron usuarios con el filtro seleccionado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserListPage;