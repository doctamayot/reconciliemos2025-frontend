// src/layouts/AdminLayout.jsx

import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header"; // Reutilizamos el header principal
import Footer from "../components/layout/Footer"; // Reutilizamos el footer principal

// Opcional: Podrías tener un Sidebar específico para el admin aquí
// import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        {" "}
        {/* Contenedor para sidebar y contenido */}
        {/* <AdminSidebar /> // Descomenta si implementas un sidebar */}
        <main className="flex-grow p-6 bg-gray-100">
          {" "}
          {/* Padding y fondo para el área de contenido admin */}
          <Outlet />{" "}
          {/* Aquí se renderizarán las páginas de admin (Dashboard, etc.) */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
