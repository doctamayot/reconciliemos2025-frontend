// src/pages/AdminDashboardPage.jsx
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../features/auth/authSlice";
import {
  UserPlusIcon,
  UsersIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

const AdminDashboardPage = () => {
  const user = useSelector(selectUser);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Panel de Administración
      </h1>
      {user && (
        <p className="text-xl text-gray-700 mb-8">
          Bienvenido de nuevo,{" "}
          <span className="font-semibold">{user.firstName || user.email}</span>.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tarjeta para Crear Usuarios */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <UserPlusIcon className="h-10 w-10 text-green-500 mb-3" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Crear Nuevos Usuarios
          </h2>
          <p className="text-gray-600 mb-4">
            Añade nuevos conciliadores o terceros (clientes) al sistema.
          </p>
          {/* Estos enlaces podrían llevar a una única página de creación con un selector de rol, o a páginas separadas */}
          <div className="space-y-2">
            <Link
              to="/admin/crear-usuario?rol=conciliador" // Usaremos query params para preseleccionar el rol
              className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-150"
            >
              Crear Conciliador
            </Link>
            <Link
              to="/admin/crear-usuario?rol=tercero"
              className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-150"
            >
              Crear Tercero/Cliente
            </Link>
          </div>
        </div>

        {/* Tarjeta para Ver Usuarios */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <UsersIcon className="h-10 w-10 text-blue-500 mb-3" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Gestionar Usuarios
          </h2>
          <p className="text-gray-600 mb-4">
            Visualiza, edita o activa/desactiva las cuentas de los usuarios
            existentes.
          </p>
          <Link
            to="/admin/lista-usuarios" // Necesitaremos crear esta página
            className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-150"
          >
            Ver Lista de Usuarios
          </Link>
        </div>

        {/* Más opciones para el admin podrían ir aquí */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <AdjustmentsHorizontalIcon className="h-10 w-10 text-purple-500 mb-3" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Configuración
          </h2>
          <p className="text-gray-600 mb-4">
            Ajustes generales de la plataforma (placeholder).
          </p>
          <button
            disabled // Botón deshabilitado como placeholder
            className="block w-full text-center bg-gray-300 text-gray-500 font-medium py-2 px-4 rounded-md cursor-not-allowed"
          >
            Ir a Configuración
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
