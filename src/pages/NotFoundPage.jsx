// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"; // Ícono para la página de error

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center py-12 px-4 sm:px-6 lg:px-8">
      <ExclamationTriangleIcon className="h-20 w-20 text-yellow-500 mb-6" />
      <h1 className="text-5xl font-extrabold text-gray-900 mb-3">Error 404</h1>
      <p className="text-2xl font-semibold text-gray-700 mb-4">
        Página No Encontrada
      </p>
      <p className="text-md text-gray-500 mb-8 max-w-md">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
        Por favor, verifica la URL o regresa al inicio.
      </p>
      <div>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Volver a la Página Principal
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
