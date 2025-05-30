// src/components/dashboard/Sidebar.jsx
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import LogoImage from '../../assets/logo.webp'; // Reutilizamos el logo

// Importa los íconos que necesitarás para el sidebar
import {
  Squares2X2Icon, // Dashboard
  UserPlusIcon,    // Crear Usuario (usaremos este para ambos)
  UsersIcon,       // Lista de Usuarios
  // Cog6ToothIcon,   // Configuración (si la añades después)
  DocumentTextIcon,// Mis Casos (Conciliador)
  UserCircleIcon,  // Mi Perfil
  FolderOpenIcon,  // Mis Solicitudes (Tercero)
  ShieldCheckIcon, // Icono para Conciliador
  UserIcon as UserIconOutline, // Icono para Tercero (usaremos el de User normal)
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const user = useSelector(selectUser);

  const commonLinkClasses = "flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors duration-150 text-sm"; // Ajustado text-sm
  const activeLinkClasses = "bg-blue-600 text-white";

  // Función para determinar la clase del NavLink (considerando query params para 'crear-usuario')
  const getNavLinkClass = ({ isActive, location, to }) => {
    let fullClassName = `${commonLinkClasses}`;
    if (isActive) {
      // Para la ruta de crear usuario, verificamos también el query param 'rol'
      if (to.pathname === '/admin/crear-usuario' && location.search) {
        if (to.search === location.search) { // Si el query param 'rol' coincide
          fullClassName += ` ${activeLinkClasses}`;
        }
      } else {
        fullClassName += ` ${activeLinkClasses}`;
      }
    }
    return fullClassName;
  };


  return (
    <aside className="w-64 bg-gray-800 text-gray-100 flex flex-col min-h-0">
      <div className="flex items-center justify-center h-20 border-b border-gray-700 px-4">
        <Link to="/" className="flex items-center shrink-0"> {/* shrink-0 para evitar que el texto se corte */}
          <img src={LogoImage} alt="Reconciliemos Colombia" className="h-10 w-auto" />
          {/* <span className="ml-2 text-lg font-semibold text-white truncate">Admin</span> */}
        </Link>
      </div>

      <nav className="flex-grow px-3 py-4 space-y-1 overflow-y-auto"> {/* Ajustado padding y space */}
        {user && user.role === 'admin' && (
          <>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => getNavLinkClass({ isActive, location: window.location, to: { pathname: "/admin/dashboard", search: "" }})}
            >
              <Squares2X2Icon className="h-5 w-5 mr-3" /> {/* Iconos un poco más pequeños */}
              Dashboard
            </NavLink>

            {/* Separador o Título para Creación */}
            <p className="px-2 pt-3 pb-1 text-xs text-gray-500 uppercase tracking-wider">Gestión de Usuarios</p>

            <NavLink
              to="/admin/crear-usuario?rol=conciliador" // Enlace específico para crear conciliador
              className={({ isActive }) => getNavLinkClass({ isActive, location: window.location, to: { pathname: "/admin/crear-usuario", search: "?rol=conciliador" }})}
            >
              <ShieldCheckIcon className="h-5 w-5 mr-3 text-pink-400" /> {/* Icono y color distintivo */}
              Crear Conciliador
            </NavLink>

            <NavLink
              to="/admin/crear-usuario?rol=tercero" // Enlace específico para crear tercero
              className={({ isActive }) => getNavLinkClass({ isActive, location: window.location, to: { pathname: "/admin/crear-usuario", search: "?rol=tercero" }})}
            >
              <UserIconOutline className="h-5 w-5 mr-3 text-yellow-400" /> {/* Icono y color distintivo */}
              Crear Tercero
            </NavLink>

            <NavLink
              to="/admin/lista-usuarios"
              className={({ isActive }) => getNavLinkClass({ isActive, location: window.location, to: { pathname: "/admin/lista-usuarios", search: "" }})}
            >
              <UsersIcon className="h-5 w-5 mr-3" />
              Lista de Usuarios
            </NavLink>
          </>
        )}

        {/* Aquí irían los enlaces para 'conciliador' y 'tercero' si se loguean */}
        {user && user.role === 'conciliador' && (
          <>
            <p className="px-2 pt-3 pb-1 text-xs text-gray-500 uppercase tracking-wider">Conciliador</p>
            <NavLink to="/conciliador/dashboard" className={({ isActive }) => getNavLinkClass({ isActive, location: window.location, to: { pathname: "/conciliador/dashboard", search: "" }})}>
              <Squares2X2Icon className="h-5 w-5 mr-3" />
              Mis Casos
            </NavLink>
            {/* ... otros enlaces de conciliador ... */}
          </>
        )}
         {user && user.role === 'tercero' && (
          <>
            <p className="px-2 pt-3 pb-1 text-xs text-gray-500 uppercase tracking-wider">Usuario</p>
            <NavLink to="/tercero/mis-solicitudes" className={({ isActive }) => getNavLinkClass({ isActive, location: window.location, to: { pathname: "/tercero/mis-solicitudes", search: "" }})}>
              <FolderOpenIcon className="h-5 w-5 mr-3" />
              Mis Solicitudes
            </NavLink>
            {/* ... otros enlaces de tercero ... */}
          </>
        )}


        {/* Enlaces Comunes para todos los roles autenticados */}
        <div className="pt-3 mt-3 border-t border-gray-700"> {/* Ajustado padding y margen */}
            <NavLink
              to={`/${user?.role}/perfil`} // La ruta de perfil ahora depende del rol
              onClick={() => { /* Lógica para cerrar menú móvil si el sidebar es colapsable en móvil */ }}
              className={({ isActive }) => getNavLinkClass({ isActive, location: window.location, to: { pathname: `/${user?.role}/perfil`, search: "" }})}
            >
                <UserCircleIcon className="h-5 w-5 mr-3" />
                Mi Perfil
            </NavLink>
            {/* El Logout lo mantenemos en el Header principal por ahora */}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;