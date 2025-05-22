// src/components/admin/CreateUserForm.jsx
import React, { useState, useEffect } from "react";
import * as authApi from "../../services/authApi"; // Nuestro servicio API
import {
  EnvelopeIcon,
  UserIcon,
  DevicePhoneMobileIcon,
  IdentificationIcon,
  LockClosedIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";

const CreateUserForm = ({ roleToCreate }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cedula: "",
    phoneNumber: "",
    password: "",
    role: roleToCreate || "tercero", // Rol por defecto si no se pasa
    numeroSicac: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate(); // Descomenta si necesitas redirigir después de crear

  // Actualizar el rol en el estado del formulario si roleToCreate cambia (desde la URL)
  useEffect(() => {
    if (roleToCreate) {
      setFormData((prev) => ({
        ...prev,
        role: roleToCreate,
        numeroSicac: roleToCreate === "conciliador" ? prev.numeroSicac : "", // Limpiar si no es conciliador
      }));
    }
  }, [roleToCreate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    // Validación de contraseña en frontend (el backend también la valida)
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial."
      );
      setIsLoading(false);
      return;
    }

    if (!formData.role) {
      // Doble chequeo, aunque debería estar seteado por roleToCreate
      setError("El rol es requerido.");
      setIsLoading(false);
      return;
    }

    // Validar que numeroSicac esté presente si el rol es conciliador
    if (formData.role === "conciliador" && !formData.numeroSicac) {
      setError("El Número SICAAC es requerido para el rol de conciliador.");
      setIsLoading(false);
      return;
    }

    // Preparar los datos a enviar
    const dataToSend = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      cedula: formData.cedula,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      role: formData.role,
    };

    if (formData.role === "conciliador") {
      dataToSend.numeroSicac = formData.numeroSicac;
    }
    // No es necesario `delete dataToSend.numeroSicac` si no es conciliador,
    // porque solo lo añadimos si el rol es conciliador.

    try {
      const response = await authApi.adminCreateUser(dataToSend); // Llama al API
      setSuccessMessage(
        `¡${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} "${
          formData.firstName
        }" creado con éxito! Se ha enviado un correo de activación.`
      );
      // Limpiar formulario
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        cedula: "",
        phoneNumber: "",
        password: "",
        role: roleToCreate || "tercero",
        numeroSicac: "",
      });
      // Opcional: redirigir después de un tiempo o con un botón
      // setTimeout(() => navigate('/admin/lista-usuarios'), 3000);
    } catch (apiError) {
      setError(
        apiError.message ||
          `Error al crear el ${formData.role}. Por favor, verifique los datos.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const roleLabel =
    formData.role.charAt(0).toUpperCase() + formData.role.slice(1);

  return (
    <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">
        Crear Nuevo {roleLabel}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nombre */}
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nombre
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Juan"
            />
          </div>
        </div>

        {/* Apellidos */}
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Apellidos
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Pérez"
            />
          </div>
        </div>

        {/* Correo Electrónico */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Correo Electrónico
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="usuario@correo.com"
            />
          </div>
        </div>

        {/* Cédula */}
        <div>
          <label
            htmlFor="cedula"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Número de Cédula
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IdentificationIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="cedula"
              id="cedula"
              value={formData.cedula}
              onChange={handleChange}
              required
              className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="1234567890"
            />
          </div>
        </div>

        {/* Número de Celular */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Número de Celular
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="3001234567"
            />
          </div>
        </div>

        {/* Campo Condicional para Numero SICAAC */}
        {formData.role === "conciliador" && (
          <div>
            <label
              htmlFor="numeroSicac"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Número SICAAC
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HashtagIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="numeroSicac"
                id="numeroSicac"
                value={formData.numeroSicac}
                onChange={handleChange}
                required // Requerido si el rol es conciliador
                className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Número de registro SICAAC"
              />
            </div>
          </div>
        )}

        {/* Contraseña */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contraseña Temporal
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockClosedIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Mín. 8 caracteres, 1 mayús., 1 especial"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Debe contener al menos 8 caracteres, una mayúscula y un carácter
            especial (ej. !@#$).
          </p>
        </div>

        {/* Mostrar Rol Asignado (informativo, no editable aquí directamente) */}
        <div>
          <label
            htmlFor="role-display"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Rol Asignado
          </label>
          <input
            type="text"
            name="role-display"
            id="role-display"
            value={roleLabel}
            disabled
            className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md cursor-not-allowed"
          />
        </div>

        {/* Mensajes de Error y Éxito */}
        {error && (
          <div className="rounded-md bg-red-50 p-3 my-3">
            {" "}
            {/* Ajustado margen */}
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}
        {successMessage && (
          <div className="rounded-md bg-green-50 p-3 my-3">
            {" "}
            {/* Ajustado margen */}
            <p className="text-sm font-medium text-green-700">
              {successMessage}
            </p>
          </div>
        )}

        {/* Botón de Envío */}
        <div className="pt-2">
          {" "}
          {/* Añadido un poco de padding arriba del botón */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              `Crear ${roleLabel}`
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
