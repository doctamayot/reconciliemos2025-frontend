// src/pages/AdminCreateUserPage.jsx

import { useLocation, Link } from "react-router-dom";
import CreateUserForm from "../components/admin/CreateUserForm"; // Ajusta la ruta si es necesario

const AdminCreateUserPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roleFromQuery = queryParams.get("rol"); // Obtiene 'conciliador' o 'tercero'

  // Validar el rol o establecer uno por defecto si no se proporciona o es inválido
  let roleToCreate = "tercero"; // Rol por defecto
  if (
    roleFromQuery &&
    ["conciliador", "tercero"].includes(roleFromQuery.toLowerCase())
  ) {
    roleToCreate = roleFromQuery.toLowerCase();
  }

  const roleLabel =
    roleToCreate.charAt(0).toUpperCase() + roleToCreate.slice(1);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {" "}
      {/* Contenedor para centrar el formulario */}
      <div className="mb-6">
        <Link
          to="/admin/dashboard"
          className="text-sm text-blue-600 hover:underline"
        >
          &larr; Volver al Dashboard
        </Link>
      </div>
      <CreateUserForm roleToCreate={roleToCreate} />
    </div>
  );
};

export default AdminCreateUserPage;
