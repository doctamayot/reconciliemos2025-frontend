// src/router/index.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";

// Componentes de Página Públicos
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import TermsOfServicePage from "../pages/TermsOfServicePage";
import NotFoundPage from "../pages/NotFoundPage";

// Componentes de Página de Admin
import AdminDashboardPage from "../pages/AdminDashboardPage";
import AdminCreateUserPage from "../pages/AdminCreateUserPage";

// Componente de Ruta Protegida
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/politica-de-privacidad" element={<PrivacyPolicyPage />} />
        <Route
          path="/terminos-y-condiciones"
          element={<TermsOfServicePage />}
        />

        {/* Otras rutas públicas como /quienes-somos, /servicios, /contacto */}
      </Route>

      {/* Rutas de Administración (Protegidas) */}
      <Route element={<AdminLayout />}>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route
            path="/admin/crear-usuario"
            element={<AdminCreateUserPage />}
          />
          {/* <Route path="/admin/lista-usuarios" element={<AdminUserListPage />} /> */}
        </Route>
      </Route>

      {/* Ruta Catch-all para 404 (debe ir al final) */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
