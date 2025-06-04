// src/components/admin/EditUserForm.jsx
import { useState, useEffect } from 'react';
import * as authApi from '../../services/authApi';
import { EnvelopeIcon, UserIcon, DevicePhoneMobileIcon, IdentificationIcon, HashtagIcon, ShieldCheckIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const EditUserForm = ({ initialUserData, userId, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cedula: '',
    phoneNumber: '',
    role: 'tercero',
    isActive: true,
    numeroSicac: '',
    // No incluimos 'password' para edición directa por el admin
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialUserData) {
      setFormData({
        firstName: initialUserData.firstName || '',
        lastName: initialUserData.lastName || '',
        email: initialUserData.email || '',
        cedula: initialUserData.cedula || '',
        phoneNumber: initialUserData.phoneNumber || '',
        role: initialUserData.role || 'tercero',
        isActive: typeof initialUserData.isActive === 'boolean' ? initialUserData.isActive : true,
        numeroSicac: initialUserData.numeroSicac || '',
      });
    }
  }, [initialUserData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    const dataToUpdate = { ...formData };
    // Si el rol no es conciliador, nos aseguramos que numeroSicac no se envíe o sea null
    if (dataToUpdate.role !== 'conciliador') {
      dataToUpdate.numeroSicac = null; // o delete dataToUpdate.numeroSicac;
    } else if (dataToUpdate.role === 'conciliador' && !dataToUpdate.numeroSicac) {
        setError('El Número SICAAC es requerido para el rol de conciliador.');
        setIsLoading(false);
        return;
    }

    try {
      const response = await authApi.adminUpdateUser(userId, dataToUpdate);
      setSuccessMessage('¡Usuario actualizado con éxito!');
      if (onUpdateSuccess) {
        onUpdateSuccess(response.user); // Devuelve el usuario actualizado a la página padre
      }
      // Opcional: podrías no limpiar el formulario para que el admin vea los datos actualizados.
    } catch (apiError) {
      setError(apiError.message || 'Error al actualizar el usuario.');
    } finally {
      setIsLoading(false);
    }
  };

  const roleLabel = formData.role.charAt(0).toUpperCase() + formData.role.slice(1);

  return (
    <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">
        Editar Usuario: {initialUserData?.firstName || ''} {initialUserData?.lastName || ''}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nombre */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <div className="relative">
            <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} required className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
        </div>
        {/* Apellidos */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
          <div className="relative">
            <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} required className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
        </div>
        {/* Correo Electrónico */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
          <div className="relative">
            <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
        </div>
        {/* Cédula */}
        <div>
          <label htmlFor="cedula" className="block text-sm font-medium text-gray-700 mb-1">Número de Cédula</label>
          <div className="relative">
            <IdentificationIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            <input type="text" name="cedula" id="cedula" value={formData.cedula} onChange={handleChange} required className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
        </div>
        {/* Número de Celular */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Número de Celular</label>
          <div className="relative">
            <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            <input type="tel" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
        </div>

        {/* Rol */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
          >
            <option value="tercero">Tercero</option>
            <option value="conciliador">Conciliador</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Número SICAAC (Condicional) */}
        {formData.role === 'conciliador' && (
          <div>
            <label htmlFor="numeroSicac" className="block text-sm font-medium text-gray-700 mb-1">Número SICAAC</label>
            <div className="relative">
                <HashtagIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                <input
                type="text"
                name="numeroSicac"
                id="numeroSicac"
                value={formData.numeroSicac}
                onChange={handleChange}
                required // Requerido si el rol es conciliador
                className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Número de registro SICAAC"
                />
            </div>
          </div>
        )}

        {/* Estado Activo/Inactivo */}
        <div className="flex items-center">
            <input
                id="isActive"
                name="isActive"
                type="checkbox"
                checked={formData.isActive}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Cuenta Activa
            </label>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3 my-3"><p className="text-sm font-medium text-red-700">{error}</p></div>
        )}
        {successMessage && (
          <div className="rounded-md bg-green-50 p-3 my-3"><p className="text-sm font-medium text-green-700">{successMessage}</p></div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
          >
            {isLoading ? 'Actualizando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;