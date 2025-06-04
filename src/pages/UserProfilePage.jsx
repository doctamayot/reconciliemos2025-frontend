// src/pages/UserProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, loadUser } from '../features/auth/authSlice'; // Asumimos que loadUser actualiza el user en el store
import LoadingSpinner from '../components/common/LoadingSpinner';
import { UserCircleIcon, CameraIcon, KeyIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
// import * as userApi from '../../services/userApi'; // O authApi si las funciones están allí

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false); // Para operaciones de actualización
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Estado para el formulario de cambio de contraseña
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // Estado para la subida de foto (solo manejo de archivo seleccionado por ahora)
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Cargar datos del usuario si no están (aunque deberían estar por el loadUser en App.jsx)
  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
    // Si el usuario ya está en el store, pre-llenar preview si tuviera foto
    // if (user && user.profileImageUrl) {
    //   setPreviewImage(user.profileImageUrl);
    // }
  }, [user, dispatch]);

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError('Las nuevas contraseñas no coinciden.');
      return;
    }
    if (passwordData.newPassword.length < 8) {
        setError('La nueva contraseña debe tener al menos 8 caracteres.');
        return;
    }
    // Validación de complejidad (mayúscula, especial) - el backend la hará también
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(passwordData.newPassword)) {
        setError('La nueva contraseña debe tener al menos una mayúscula y un carácter especial.');
        return;
    }


    setIsLoading(true);
    console.log('Enviando datos de cambio de contraseña:', passwordData);
    // TODO: Implementar llamada al API para cambiar contraseña
    // try {
    //   await userApi.changePassword(passwordData); // Necesitarás crear esta función en tu servicio API
    //   setSuccessMessage('¡Contraseña actualizada con éxito!');
    //   setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    // } catch (err) {
    //   setError(err.message || 'Error al cambiar la contraseña.');
    // } finally {
    //   setIsLoading(false);
    // }
    setTimeout(() => { // Simulación
        setSuccessMessage('Funcionalidad de cambio de contraseña pendiente de implementación en backend.');
        // setError('Error simulado al cambiar contraseña.');
        setIsLoading(false);
    }, 1500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Mostrar previsualización
      setError('');
      setSuccessMessage('');
    }
  };

  const handlePhotoUpload = async () => {
    if (!selectedFile) {
      setError('Por favor, selecciona una imagen primero.');
      return;
    }
    setIsLoading(true);
    setError('');
    setSuccessMessage('');
    console.log('Subiendo archivo:', selectedFile.name);
    // TODO: Implementar lógica de subida al backend, y luego a Google Drive
    // const formData = new FormData();
    // formData.append('profileImage', selectedFile);
    // try {
    //   const response = await userApi.uploadProfilePicture(formData); // Necesitarás esta función API
    //   setSuccessMessage('¡Foto de perfil actualizada!');
    //   // Actualizar el usuario en Redux con la nueva URL de la imagen si el backend la devuelve
    //   // dispatch(updateUserProfile({ profileImageUrl: response.imageUrl }));
    //   setSelectedFile(null); // Limpiar selección
    // } catch (err) {
    //   setError(err.message || 'Error al subir la foto.');
    // } finally {
    //   setIsLoading(false);
    // }
    setTimeout(() => { // Simulación
        setSuccessMessage('Funcionalidad de subida de foto pendiente (integración Google Drive).');
        setIsLoading(false);
    }, 1500);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <LoadingSpinner message="Cargando perfil..." />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">Mi Perfil</h1>

      {/* Sección de Información del Perfil */}
      <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Información de la Cuenta</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Nombre Completo</p>
            <p className="text-lg text-gray-900">{user.firstName} {user.lastName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Correo Electrónico</p>
            <p className="text-lg text-gray-900">{user.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Rol</p>
            <p className="text-lg text-gray-900 capitalize">{user.role}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Cédula</p>
            <p className="text-lg text-gray-900">{user.cedula}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Celular</p>
            <p className="text-lg text-gray-900">{user.phoneNumber || 'No registrado'}</p>
          </div>
          {user.role === 'conciliador' && user.numeroSicac && (
            <div>
              <p className="text-sm font-medium text-gray-500">Número SICAAC</p>
              <p className="text-lg text-gray-900">{user.numeroSicac}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-500">Estado de la Cuenta</p>
            <p className={`text-lg font-semibold ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
              {user.isActive ? 'Activa' : 'Inactiva'}
            </p>
          </div>
        </div>
      </div>

      {/* Sección de Foto de Perfil */}
      <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Foto de Perfil</h2>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {previewImage ? (
              <img src={previewImage} alt="Vista previa perfil" className="w-full h-full object-cover" />
            ) : user.profileImageUrl ? ( // Suponiendo que user.profileImageUrl existe
              <img src={user.profileImageUrl} alt="Perfil" className="w-full h-full object-cover" />
            ) : (
              <UserCircleIcon className="w-24 h-24 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="profile-image-upload" className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <CameraIcon className="h-5 w-5 text-gray-500 mr-2" />
              Seleccionar Imagen
            </label>
            <input id="profile-image-upload" name="profile-image-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
            {selectedFile && <p className="text-sm text-gray-500 mt-2">Archivo seleccionado: {selectedFile.name}</p>}
            <button
              onClick={handlePhotoUpload}
              disabled={!selectedFile || isLoading}
              className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {isLoading ? 'Subiendo...' : 'Actualizar Foto'}
            </button>
          </div>
        </div>
      </div>

      {/* Sección de Cambio de Contraseña */}
      <div className="bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-3">Cambiar Contraseña</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-5">
          {/* Contraseña Actual */}
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Contraseña Actual</label>
            <div className="relative">
              <KeyIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              <input type={showCurrentPassword ? "text" : "password"} name="currentPassword" id="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} required className="appearance-none block w-full pl-10 pr-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                {showCurrentPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500"/> : <EyeIcon className="h-5 w-5 text-gray-500"/>}
              </button>
            </div>
          </div>
          {/* Nueva Contraseña */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
            <div className="relative">
              <KeyIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              <input type={showNewPassword ? "text" : "password"} name="newPassword" id="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} required className="appearance-none block w-full pl-10 pr-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
               <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                {showNewPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500"/> : <EyeIcon className="h-5 w-5 text-gray-500"/>}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">Mínimo 8 caracteres, una mayúscula y un carácter especial.</p>
          </div>
          {/* Confirmar Nueva Contraseña */}
          <div>
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nueva Contraseña</label>
            <div className="relative">
              <KeyIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              <input type={showConfirmNewPassword ? "text" : "password"} name="confirmNewPassword" id="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={handlePasswordChange} required className="appearance-none block w-full pl-10 pr-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              <button type="button" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                {showConfirmNewPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500"/> : <EyeIcon className="h-5 w-5 text-gray-500"/>}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          {successMessage && <p className="text-sm text-green-600 mt-2">{successMessage}</p>}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {isLoading ? 'Actualizando...' : 'Cambiar Contraseña'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfilePage;