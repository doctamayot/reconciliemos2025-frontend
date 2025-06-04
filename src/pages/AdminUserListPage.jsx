// src/pages/AdminUserListPage.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react'; // Añadido useRef
import { Link } from 'react-router-dom';
import * as authApi from '../services/authApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { UserPlusIcon, PencilSquareIcon, TrashIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import useIntersectionObserver from '../hooks/useIntersectionObserver'; // Importamos el hook

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const PAGE_LIMIT = 15; // Cuántos usuarios cargar por página



const AdminUserListPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('todos');
  
  const [page, setPage] = useState(1); // Página actual a cargar
  const [hasMore, setHasMore] = useState(true); // Si hay más datos para cargar
  const [isLoading, setIsLoading] = useState(false); // Para carga inicial Y carga de más
  const [error, setError] = useState('');

  const [elementToObserveRef, isSentinelVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px 200px 0px' // Aumentar rootMargin para disparar un poco antes
  });

  // fetchUsers ahora solo depende de las funciones de seteo de estado, que son estables.
  const fetchUsersCallback = useCallback(async (pageNumToFetch) => {
    // No necesitamos la guarda aquí si el useEffect que llama a setPage ya tiene !isLoading
    // if (isLoading || !hasMore) return; // Esta guarda es importante pero se manejará antes de llamar a setPage

    console.log(`Fetching page: ${pageNumToFetch}`);
    setIsLoading(true);
    setError('');
    try {
      const data = await authApi.adminGetAllUsers(pageNumToFetch, PAGE_LIMIT);
      setUsers(prevUsers => pageNumToFetch === 1 ? data.users : [...prevUsers, ...data.users]);
      setHasMore(data.hasMore);
      if (pageNumToFetch === 1) { // Si es la carga inicial
        // No necesitamos setPage(1) aquí si la carga inicial ya usa page=1
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message || 'Error al cargar la lista de usuarios.');
      setHasMore(false); // Detener intentos si hay error
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setError, setUsers, setHasMore]); // PAGE_LIMIT es constante, no necesita ser dependencia

  // Carga inicial de usuarios
  useEffect(() => {
    console.log("Initial load: fetching page 1");
    setPage(1); // Asegurar que la página sea 1 para la carga inicial
    setUsers([]); // Limpiar usuarios antes de la carga inicial
    setHasMore(true); // Resetear hasMore
    fetchUsersCallback(1); // Llama con página 1 explícitamente
  }, [fetchUsersCallback]); // Solo depende de fetchUsersCallback, que es estable

  // Efecto para cargar más cuando el sentinela es visible
  useEffect(() => {
    if (isSentinelVisible && hasMore && !isLoading) {
      console.log("Sentinel visible, hasMore, not loading. Incrementing page.");
      setPage(prevPage => prevPage + 1);
    }
  }, [isSentinelVisible, hasMore, isLoading]);

  // Efecto para llamar a fetchUsers cuando `page` cambia (para páginas > 1)
  useEffect(() => {
    if (page > 1 && hasMore && !isLoading) { // Solo cargar si es una página nueva, hay más y no se está cargando
      console.log(`Page changed to ${page}, fetching more users.`);
      fetchUsersCallback(page);
    }
  }, [page, fetchUsersCallback, hasMore, isLoading]); // Añadido hasMore e isLoading a las dependencias para re-evaluar

  // Filtrado (se aplica a los usuarios ya cargados)
  useEffect(() => {
    console.log("Filtering users based on role:", filterRole);
    if (filterRole === 'todos') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => user.role === filterRole));
    }
  }, [filterRole, users]);


  const handleDeleteUser = async (userId, userName) => { /* ... sin cambios ... */ };
  const toggleUserStatus = async (user) => { /* ... sin cambios ... */ };
  const filterButtons = [ /* ... sin cambios ... */ ];


  // --- Renderizado ---
  if (isLoading && page === 1 && users.length === 0) { // Spinner para la carga inicial absoluta
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]"> {/* Aproximar altura para centrar */}
        <LoadingSpinner message="Cargando usuarios..." />
      </div>
    );
  }

  if (error && users.length === 0) { // Error solo si no hay nada que mostrar
    return <div className="text-center text-red-600 p-8 text-lg">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 text-center sm:text-left">
          Lista de Usuarios del Sistema
        </h1>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700 mr-2">Filtrar por rol:</span>
        {filterButtons.map(button => (
          <button
            key={button.value}
            onClick={() => { setFilterRole(button.value); }}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
              ${filterRole === button.value ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {button.label}
          </button>
        ))}
      </div>
      
      {/* Mensaje de error general si ocurre después de la carga inicial */}
      {error && users.length > 0 && <p className="text-sm text-red-500 my-2 text-center">{error}</p>}

      <div className="bg-white shadow-xl rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
           {/* ... (columnas de la tabla sin cambios) ... */}
           <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cédula</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nº SICAAC</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              // ... (renderizado de cada fila <tr> sin cambios) ...
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.cedula}</td>
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
                    {user.isActive ? <CheckCircleIcon className="h-6 w-6"/> : <XCircleIcon className="h-6 w-6"/>}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1 text-center">
                  <Link to={`/admin/editar-usuario/${user._id}`} className="text-indigo-600 hover:text-indigo-800 p-1 inline-block" title="Editar Usuario"><PencilSquareIcon className="h-5 w-5"/></Link>
                  <button onClick={() => handleDeleteUser(user._id, `${user.firstName} ${user.lastName}`)} className="text-red-600 hover:text-red-800 p-1 inline-block" title="Eliminar Usuario" disabled={isLoading}><TrashIcon className="h-5 w-5"/></button>
                </td>
              </tr>
            ))}
            {/* Elemento Sentinela para cargar más */}
            {hasMore && ( // Solo mostrar sentinela si hay más por cargar
              <tr>
                <td colSpan="7" ref={elementToObserveRef} className="p-4 h-20 text-center"> {/* Aumentar altura para que el observer tenga más margen */}
                  {isLoading && page > 1 && <LoadingSpinner size="sm" message="Cargando más usuarios..." />}
                </td>
              </tr>
            )}
            {!hasMore && users.length > 0 && (
                 <tr><td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500 italic">No hay más usuarios para mostrar.</td></tr>
            )}
            {/* Mensaje cuando no hay usuarios en absoluto */}
            {users.length === 0 && !isLoading && !error && (
                 <tr><td colSpan="7" className="px-6 py-12 text-center text-sm text-gray-500 italic">No hay usuarios registrados en el sistema.</td></tr>
            )}
            {/* Mensaje cuando el filtro no devuelve resultados pero hay usuarios cargados */}
            {filteredUsers.length === 0 && users.length > 0 && !isLoading && !error && (
                <tr><td colSpan="7" className="px-6 py-12 text-center text-sm text-gray-500 italic">No hay usuarios que coincidan con el filtro de rol seleccionado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserListPage;