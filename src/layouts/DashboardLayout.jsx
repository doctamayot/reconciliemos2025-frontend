// src/layouts/DashboardLayout.jsx

import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header'; // Reutilizamos el header principal
import Footer from '../components/layout/Footer'; // Reutilizamos el footer principal
import Sidebar from '../components/dashboard/Sidebar'; // Importamos el nuevo Sidebar

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* El Header se mantiene, podrías simplificarlo para vistas de dashboard */}
      <div className="flex flex-1 overflow-hidden"> {/* Contenedor para sidebar y contenido principal */}
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto"> {/* Área de contenido con scroll */}
          <Outlet /> {/* Aquí se renderizarán las páginas del dashboard */}
        </main>
      </div>
      {/* El Footer podría ser opcional en las vistas de dashboard */}
      {/* <Footer /> */}
    </div>
  );
};

export default DashboardLayout;