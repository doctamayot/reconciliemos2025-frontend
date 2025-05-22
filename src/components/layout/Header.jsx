// src/components/layout/Header.jsx
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUser,
  selectIsAuthenticated,
  selectUser,
} from "../../features/auth/authSlice";
import LogoImage from "../../assets/logo.webp"; // Asegúrate que la ruta es correcta
import {
  Bars3Icon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
  Squares2X2Icon, // Ícono para Dashboard
} from "@heroicons/react/24/outline";

// WhatsAppIcon sin cambios
const WhatsAppIcon = () => (
  <svg
    fill="currentColor"
    className="w-5 h-5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.33 3.42 16.8L2.07 22L7.33 20.62C8.75 21.39 10.35 21.81 12.04 21.81C17.5 21.81 21.95 17.36 21.95 11.91C21.95 9.27 20.92 6.87 19.17 5.11C17.41 3.36 14.99 2 12.04 2ZM12.04 3.62C14.31 3.62 16.37 4.39 17.93 5.96C19.5 7.52 20.33 9.6 20.33 11.91C20.33 16.49 16.63 20.19 12.04 20.19C10.55 20.19 9.15 19.81 7.95 19.15L7.51 18.91L4.56 19.82L5.53 16.96L5.28 16.51C4.52 15.24 4.09 13.63 4.09 11.91C4.09 7.33 7.79 3.62 12.04 3.62ZM9.95 8.42C9.76 8.42 9.59 8.46 9.45 8.61C9.31 8.75 8.87 9.18 8.87 10.14C8.87 11.11 9.47 12.02 9.6 12.18C9.74 12.33 11.03 14.42 13.08 15.3C14.83 16.04 15.14 15.93 15.4 15.89C15.81 15.79 16.61 15.32 16.82 14.75C17.04 14.18 17.04 13.72 16.95 13.59C16.86 13.46 16.67 13.38 16.39 13.24C16.11 13.1 14.95 12.53 14.73 12.45C14.5 12.36 14.34 12.32 14.18 12.57C14.01 12.81 13.58 13.32 13.44 13.49C13.3 13.66 13.17 13.68 12.92 13.58C12.44 13.39 11.62 13.07 10.67 12.2C10.03 11.64 9.6 10.93 9.47 10.68C9.34 10.44 9.45 10.32 9.58 10.2C9.69 10.09 9.83 9.92 9.99 9.76C10.14 9.6 10.21 9.51 10.31 9.32C10.41 9.14 10.37 8.99 10.31 8.87C10.26 8.75 9.95 8.42 9.95 8.42Z" />
  </svg>
);

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    closeMobileMenu();
    navigate("/login");
  };

  const whatsAppLink =
    "https://api.whatsapp.com/send?phone=573133547614&text=Hola,%20quiero%20una%20asesor%C3%ADa!!!";
  const commonButtonClasses =
    "font-semibold py-2 px-4 rounded-md text-sm transition duration-200 ease-in-out flex items-center space-x-2 shadow-sm";
  const whatsAppButtonClasses = `${commonButtonClasses} bg-green-500 hover:bg-green-600 text-white`;
  const adminButtonClasses = `${commonButtonClasses} bg-gray-700 hover:bg-gray-800 text-white`;
  const logoutButtonClasses = `${commonButtonClasses} bg-red-500 hover:bg-red-600 text-white`;
  const dashboardButtonClasses = `${commonButtonClasses} bg-blue-600 hover:bg-blue-700 text-white`; // Estilo para el botón de Dashboard

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex-shrink-0 flex items-center"
          >
            <img
              className="h-10 w-auto"
              src={LogoImage}
              alt="Reconciliemos Colombia Logo"
            />
            <span className="ml-3 text-lg font-bold text-gray-800">
              Reconciliemos Colombia
            </span>
          </Link>

          <div className="flex items-center space-x-3">
            {/* Botón WhatsApp Desktop */}
            <div className="hidden md:flex">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className={whatsAppButtonClasses}
              >
                <WhatsAppIcon />
                <span>Contactar</span>
              </a>
            </div>

            {/* Botones de Admin/Logout Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              {" "}
              {/* Añadido items-center y space-x-2 */}
              {isAuthenticated && user ? (
                <>
                  <span className="text-sm text-gray-700 hidden lg:inline">
                    Hola, {user.firstName || user.email}
                  </span>
                  {/* --- BOTÓN DASHBOARD PARA ADMIN --- */}
                  {user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className={dashboardButtonClasses}
                    >
                      <Squares2X2Icon className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                  )}
                  {/* --- FIN BOTÓN DASHBOARD --- */}
                  {/* El botón de perfil podría ser genérico o específico de admin */}
                  <Link
                    to={user.role === "admin" ? "/admin/perfil" : "/perfil"} // Rutas de perfil diferentes o la misma
                    className={`${commonButtonClasses} bg-gray-200 hover:bg-gray-300 text-gray-700`}
                  >
                    <UserCircleIcon className="h-5 w-5" />
                    <span>Perfil</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={logoutButtonClasses}
                  >
                    <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                    <span>Cerrar Sesión</span>
                  </button>
                </>
              ) : (
                <Link to="/login" className={adminButtonClasses}>
                  Acceso
                </Link>
              )}
            </div>
          </div>

          {/* Botón Menú Móvil */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Panel Menú Móvil */}
      <div
        className={`md:hidden transition-max-height duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
        id="mobile-menu"
      >
        <div className="px-4 pt-3 pb-4 space-y-3 border-t border-gray-200">
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
            className={`${whatsAppButtonClasses} w-full justify-center`}
          >
            <WhatsAppIcon />
            <span>Contactar por WhatsApp</span>
          </a>

          {isAuthenticated && user ? (
            <>
              {/* --- BOTÓN DASHBOARD MÓVIL PARA ADMIN --- */}
              {user.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  onClick={closeMobileMenu}
                  className={`${dashboardButtonClasses} w-full justify-center`}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              )}
              {/* --- FIN BOTÓN DASHBOARD MÓVIL --- */}
              <Link
                to={user.role === "admin" ? "/admin/perfil" : "/perfil"}
                onClick={closeMobileMenu}
                className={`${commonButtonClasses} bg-gray-200 hover:bg-gray-300 text-gray-700 w-full justify-center`}
              >
                <UserCircleIcon className="h-5 w-5" />
                <span>Mi Perfil</span>
              </Link>
              <button
                onClick={handleLogout}
                className={`${logoutButtonClasses} w-full justify-center`}
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                <span>Cerrar Sesión</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={closeMobileMenu}
              className={`${adminButtonClasses} block w-full max-w-xs mx-auto text-center justify-center`}
            >
              Admin {/* O "Acceso" */}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
