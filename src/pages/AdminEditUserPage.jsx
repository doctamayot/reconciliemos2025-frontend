// src/pages/AdminEditUserPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as authApi from '../services/authApi';
import EditUserForm from '../components/admin/EditUserForm'; // Ajusta la ruta si es necesario
import LoadingSpinner from '../components/common/LoadingSpinner';

const AdminEditUserPage = () => {
  const { userId } = useParams(); // Obtiene el ID del usuario de la URL
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await authApi.adminGetUserById(userId);
      setUserData(data);
    } catch (err) {
      setError(err.message || 'Error al cargar los datos del usuario.');
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleUpdateSuccess = (updatedUser) => {
    // Opcional: Actualizar el estado local o simplemente mostrar un mensaje
    // y permitir que el admin navegue de vuelta o se quede.
    // Para este ejemplo, podemos redirigir a la lista después de un breve delay.
    // Si tienes notificaciones toast, este sería un buen lugar para usar una.
    setTimeout(() => {
      navigate('/admin/lista-usuarios');
    }, 1500); // Redirige después de 1.5 segundos
  };

  if (isLoading) {
    return <LoadingSpinner message="Cargando datos del usuario..." />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>{error}</p>
        <Link to="/admin/lista-usuarios" className="text-blue-600 hover:underline mt-4 inline-block">
          Volver a la lista
        </Link>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center text-gray-600 p-8">
        <p>No se encontraron datos para este usuario.</p>
        <Link to="/admin/lista-usuarios" className="text-blue-600 hover:underline mt-4 inline-block">
          Volver a la lista
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Link to="/admin/lista-usuarios" className="text-sm text-blue-600 hover:underline">
          &larr; Volver a Lista de Usuarios
        </Link>
      </div>
      <EditUserForm
        initialUserData={userData}
        userId={userId}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </div>
  );
};

export default AdminEditUserPage;