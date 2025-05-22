// src/router/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectIsAuthenticated, selectUser } from "../features/auth/authSlice";

/**
 * Componente para proteger rutas basadas en autenticación y roles.
 * @param {Object} props
 * @param {string[]} props.allowedRoles - Array de roles permitidos para acceder a la ruta.
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!isAuthenticated) {
    // Si no está autenticado, redirigir a la página de login.
    // Guardamos la ubicación original para redirigir de vuelta después del login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user?.role)
  ) {
    // Si está autenticado pero su rol no está permitido,
    // redirigir a una página de "No Autorizado" o a la página principal.
    // Por ahora, redirigimos a la página principal. Puedes crear una página /unauthorized.
    return <Navigate to="/" state={{ from: location }} replace />;
    // Opcional: return <Navigate to="/unauthorized" replace />;
  }

  // Si está autenticado y tiene el rol permitido (o no se especificaron roles), renderizar el contenido.
  return <Outlet />; // Outlet renderiza el componente hijo de la ruta
};

export default ProtectedRoute;
