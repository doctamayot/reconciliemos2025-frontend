// src/router/index.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout'; // Usamos DashboardLayout

// Componentes de Página Públicos
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/TermsOfServicePage';
// import ActivateAccountPage from '../pages/ActivateAccountPage'; // --- ELIMINADO ---
import NotFoundPage from '../pages/NotFoundPage';

// Componentes de Página de Admin (y futuras para otros roles)
import AdminDashboardPage from '../pages/AdminDashboardPage';
import AdminCreateUserPage from '../pages/AdminCreateUserPage';
import AdminUserListPage from '../pages/AdminUserListPage';
// import UserProfilePage from '../pages/UserProfilePage';

// Componente de Ruta Protegida
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/politica-de-privacidad" element={<PrivacyPolicyPage />} />
        <Route path="/terminos-y-condiciones" element={<TermsOfServicePage />} />
        {/* <Route path="/activar-cuenta/:token" element={<ActivateAccountPage />} /> // --- LÍNEA ELIMINADA --- */}
      </Route>

      {/* Rutas de Dashboard (Protegidas y con Sidebar) */}
      {/* Rutas para Administradores */}
      <Route element={<DashboardLayout />}>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/crear-usuario" element={<AdminCreateUserPage />} />
          <Route path="/admin/lista-usuarios" element={<AdminUserListPage />} />
          <Route path="/admin/perfil" element={<div>Página de Perfil Admin (Placeholder)</div>} />
        </Route>
      </Route>

      {/* Rutas para Conciliadores (Ejemplo) */}
      <Route element={<DashboardLayout />}>
        <Route element={<ProtectedRoute allowedRoles={['conciliador']} />}>
          <Route path="/conciliador/dashboard" element={<div>Dashboard Conciliador (Placeholder)</div>} />
          <Route path="/conciliador/agenda" element={<div>Agenda Conciliador (Placeholder)</div>} />
          <Route path="/conciliador/perfil" element={<div>Página de Perfil Conciliador (Placeholder)</div>} />
        </Route>
      </Route>

      {/* Rutas para Terceros (Ejemplo) */}
      <Route element={<DashboardLayout />}>
        <Route element={<ProtectedRoute allowedRoles={['tercero']} />}>
          <Route path="/tercero/mis-solicitudes" element={<div>Mis Solicitudes - Tercero (Placeholder)</div>} />
          <Route path="/tercero/perfil" element={<div>Página de Perfil Tercero (Placeholder)</div>} />
        </Route>
      </Route>

      {/* Ruta Catch-all para 404 (debe ir al final) */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;