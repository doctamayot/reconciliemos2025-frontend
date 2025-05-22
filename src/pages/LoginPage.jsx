// src/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Hooks de React-Redux
import {
  loginUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  clearAuthError,
} from "../features/auth/authSlice"; // Importa acciones y selectors
import LogoImage from "../assets/logo.webp";
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
// import { XCircleIcon } from '@heroicons/react/24/solid'; // Para el mensaje de error

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  useEffect(() => {
    // Si el usuario ya está autenticado (ej. por una sesión previa o después de un login exitoso),
    // redirigirlo al dashboard de admin.
    if (isAuthenticated) {
      // Podrías verificar el rol aquí antes de redirigir si fuera necesario
      // const user = useSelector(selectUser);
      // if(user && user.role === 'admin') navigate('/admin/dashboard');
      // else navigate('/perfil'); // O a una página de perfil genérica
      navigate("/admin/dashboard"); // Asumimos que el login es para admin por ahora
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Limpiar errores de auth al montar el componente o si el usuario navega aquí
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      // Podrías usar un estado local para errores de formulario antes de enviar a Redux
      dispatch(
        loginUser.rejected("Correo electrónico y contraseña son requeridos.")
      ); // O un estado local
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 xl:px-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <img
          className="mx-auto h-20 w-auto"
          src={LogoImage}
          alt="Reconciliemos Colombia Logo"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-800">
          Acceso Administrador
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ingresa tus credenciales para continuar
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* ... (campos de email y password sin cambios, pero ahora sus valores son manejados por estado local 'email' y 'password') ... */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="tu@correo.com"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Tu contraseña"
                />
              </div>
            </div>

            {authError && ( // Mostrar error del estado de Redux
              <div className="rounded-md bg-red-50 p-4 mt-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    {/* <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" /> */}
                    <span className="text-red-400 font-bold text-xl">!</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">
                      {authError}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ... (resto del formulario como "Olvidaste tu contraseña") ... */}
            <div className="flex items-center justify-between">
              <div></div>{" "}
              {/* Placeholder para alinear el botón de "Olvidaste tu contraseña" si lo añades */}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
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
                  "Iniciar Sesión"
                )}
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-xs text-gray-500">
            <Link
              to="/"
              className="font-medium text-gray-700 hover:text-gray-900"
            >
              &larr; Volver al sitio principal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
