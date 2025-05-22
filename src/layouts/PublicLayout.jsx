// src/layouts/PublicLayout.jsx
import { Outlet } from "react-router-dom"; // Importa Outlet para renderizar rutas hijas
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      {/* Layout de columna flexible que ocupa al menos toda la pantalla */}
      <Header />
      <main className="flex-grow">
        {/* El contenido principal crece para ocupar el espacio disponible */}
        <Outlet /> {/* Aquí se renderizarán las páginas (HomePage, etc.) */}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
