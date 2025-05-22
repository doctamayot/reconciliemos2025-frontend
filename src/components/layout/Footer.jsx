// src/components/layout/Footer.jsx
import React from "react";
import { Link } from "react-router-dom"; // Importa Link para la navegación interna

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const siteName = "Reconciliemos Colombia"; // Definimos el nombre del sitio aquí

  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      {" "}
      {/* Aumenté un poco el padding vertical */}
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm mb-3">
          {" "}
          {/* Añadí un margen inferior */}
          &copy; {currentYear} {siteName}. Todos los derechos reservados.
        </p>
        <div className="space-x-4">
          {" "}
          {/* Mantenemos space-x para el espaciado horizontal */}
          <Link
            to="/politica-de-privacidad"
            className="text-gray-400 hover:text-white hover:underline text-sm"
          >
            Política de Privacidad
          </Link>
          <span className="text-gray-500 text-sm">|</span>
          <Link
            to="/terminos-y-condiciones"
            className="text-gray-400 hover:text-white hover:underline text-sm"
          >
            Términos y Condiciones
          </Link>
        </div>
        {/* Opcional: Puedes añadir un pequeño texto o información de contacto adicional si lo deseas */}
        {/* <p className="text-xs text-gray-500 mt-3">
          [Alguna dirección o teléfono principal si es pertinente aquí]
        </p> */}
      </div>
    </footer>
  );
};

export default Footer;
