import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, loadUser, updateUserProfile } from '../features/auth/authSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { UserCircleIcon, CameraIcon, KeyIcon, EyeIcon, EyeSlashIcon, TrashIcon, IdentificationIcon, EnvelopeIcon, PhoneIcon, HashtagIcon, CheckBadgeIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import * as authApi from '../services/authApi';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

// Tu lógica de estado y manejadores se mantiene intacta.
const API_BASE_URL ='http://localhost:3001/api';

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());

  useEffect(() => {
    if (!user) {
        dispatch(loadUser());
    } else if (user.profileImageUrl) {
        setPreviewImage(`${API_BASE_URL}/users/${user._id}/picture?t=${imageTimestamp}`);
    } else {
        setPreviewImage(null);
    }
  }, [user, imageTimestamp, dispatch]);

  const handlePasswordChange = (e) => { setPasswordData({ ...passwordData, [e.target.name]: e.target.value }); };
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setFormError('Las nuevas contraseñas no coinciden.');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(passwordData.newPassword)) {
      setFormError('La nueva contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Llamada real al API
      const response = await authApi.changeMyPassword(passwordData);
      
      // Mostrar notificación de éxito con SweetAlert
      MySwal.fire({
        title: '¡Éxito!',
        text: response.message || 'Contraseña actualizada correctamente.',
        icon: 'success',
        timer: 2500,
        showConfirmButton: false
      });

      // Limpiar el formulario y los mensajes
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      setFormSuccess(response.message); // Puedes seguir usando esto si quieres
      setFormError('');

    } catch (err) {
      // Mostrar error con SweetAlert o en el formulario
      setFormError(err.message || 'Ocurrió un error inesperado.');
      MySwal.fire({
        title: 'Error',
        text: err.message || 'No se pudo actualizar la contraseña.',
        icon: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { setFormError('El archivo es demasiado grande. El límite es 5MB.'); return; }
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setFormError('');
      setFormSuccess('');
    }
  };

  const handlePhotoUpload = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setFormError('');
    setFormSuccess('');
    try {
      const { user: updatedUser } = await authApi.uploadProfilePicture(selectedFile);
      dispatch(updateUserProfile(updatedUser));
      MySwal.fire('¡Éxito!', 'Foto de perfil actualizada.', 'success');
      setImageTimestamp(Date.now());
      setSelectedFile(null);
    } catch (err) {
      setFormError(err.message || 'Error al subir la foto.');
      setPreviewImage(user?.profileImageUrl ? `${API_BASE_URL}/users/${user._id}/picture?t=${Date.now()}` : null);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeletePhoto = () => {
    MySwal.fire({
      title: '¿Eliminar foto de perfil?', text: 'Esta acción no se puede deshacer.', icon: 'warning',
      showCancelButton: true, confirmButtonColor: '#d33', cancelButtonColor: '#6B7280',
      cancelButtonText: 'Cancelar', confirmButtonText: 'Sí, eliminarla',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        try {
          const { user: updatedUser } = await authApi.deleteProfilePicture();
          dispatch(updateUserProfile(updatedUser));
          MySwal.fire('¡Eliminada!', 'Tu foto de perfil ha sido eliminada.', 'success');
          setImageTimestamp(Date.now());
        } catch (err) {
          setFormError(err.message || 'Error al eliminar la foto.');
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  if (!user) {
    return (<div className="flex justify-center items-center min-h-[calc(100vh-200px)]"><LoadingSpinner message="Cargando perfil..." /></div>);
  }

  // --- INICIO DE LA PARTE VISUAL (JSX) CORREGIDA ---
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          {/* Columna Izquierda: Foto, Nombre y Gestión de Foto */}
          <div className="md:w-1/3 bg-slate-50 p-8 text-center flex flex-col items-center justify-center border-r border-slate-200">
            {/* Contenedor de la Imagen */}
            <div className="w-36 h-36 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden ring-4 ring-white shadow-lg">
              {previewImage ? (
                <img src={previewImage} alt="Perfil" className="w-full h-full object-cover" />
              ) : (
                <UserCircleIcon className="w-32 h-32 text-gray-400" />
              )}
            </div>
            
            <h2 className="mt-4 text-2xl font-bold text-gray-900">{user.firstName} {user.lastName}</h2>
            <p className={`mt-1 px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full capitalize ${user.role === 'admin' ? 'bg-red-100 text-red-800' : user.role === 'conciliador' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
              {user.role}
            </p>

            {/* Acciones de la foto ahora están debajo */}
            <div className="mt-6 w-full space-y-2">
                <label htmlFor="profile-image-upload" className="w-full cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <CameraIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span>{user.profileImageUrl || selectedFile ? 'Cambiar Foto' : 'Seleccionar Foto'}</span>
                </label>
                <input id="profile-image-upload" name="profile-image-upload" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={handleFileChange} />
                
                {selectedFile && (
                    <button onClick={handlePhotoUpload} disabled={isLoading} className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300">
                        {isLoading ? 'Guardando...' : 'Guardar Foto'}
                    </button>
                )}
                {user.profileImageUrl && !selectedFile && (
                    <button onClick={handleDeletePhoto} disabled={isLoading} className="text-xs text-red-600 hover:underline">
                        Eliminar foto actual
                    </button>
                )}
            </div>

          </div>

          {/* Columna Derecha: Información y Mensaje de Contraseña */}
          <div className="md:w-2/3 p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-4">Información de la Cuenta</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <EnvelopeIcon className="h-6 w-6 text-blue-600"/>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Correo Electrónico</p>
                  <p className="text-md font-semibold text-gray-900">{user.email}</p>
                </div>
              </div>
              <div className="flex items-end ml-12 ">
                 <div className="p-3 bg-blue-100 rounded-full">
                  <IdentificationIcon className="h-6 w-6 text-blue-600"/>
                </div>
                <div className="ml-4">
                  <p className="text-xs text-gray-500">Cédula</p>
                  <p className="text-md font-semibold text-gray-900">{user.cedula}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <PhoneIcon className="h-6 w-6 text-blue-600"/>
                </div>
                <div className="ml-4">
                  <p className="text-xs text-gray-500">Celular</p>
                  <p className="text-md font-semibold text-gray-900">{user.phoneNumber || 'No registrado'}</p>
                </div>
              </div>
               <div className="flex items-center ml-12">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckBadgeIcon className="h-6 w-6 text-green-600"/>
                </div>
                <div className="ml-4">
                  <p className="text-xs text-gray-500">Estado</p>
                  <p className={`text-md font-semibold ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>{user.isActive ? 'Activa' : 'Inactiva'}</p>
                </div>
              </div>
              {user.role === 'conciliador' && (
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <HashtagIcon className="h-6 w-6 text-blue-600"/>
                  </div>
                  <div className="ml-4">
                    <p className="text-xs text-gray-500">Número SICAAC</p>
                    <p className="text-md font-semibold text-gray-900">{user.numeroSicac || '-'}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Mensaje de Gestión de Contraseña (Solo para no-admins) */}
            {user.role !== 'admin' && (
                <div className="mt-8 border-t pt-6">
                    <div className="flex items-start bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
                        <ShieldCheckIcon className="h-6 w-6 text-blue-600 mr-3 shrink-0"/>
                        <div>
                            <h4 className="font-semibold text-blue-800">Gestión de Contraseña</h4>
                            <p className="text-sm text-blue-700 mt-1">
                                Por motivos de seguridad, el cambio de contraseñas es gestionado por un administrador del sistema. Si necesitas cambiar tu contraseña, por favor contáctalo.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Formulario de cambio de contraseña que solo ve el admin */}
            {user.role === 'admin' && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Cambiar Mi Contraseña</h3>
                 <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-sm mx-auto">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Contraseña Actual</label>
                      <div className="relative">
                        <input type={showCurrentPassword ? "text" : "password"} name="currentPassword" id="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} required className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm" />
                        <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700">
                          {showCurrentPassword ? <EyeIcon className="h-5 w-5"/> : <EyeSlashIcon className="h-5 w-5"/>}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
                      <div className="relative">
                        <input type={showNewPassword ? "text" : "password"} name="newPassword" id="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} required className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm" />
                        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700">
                           {showNewPassword ? <EyeIcon className="h-5 w-5"/> : <EyeSlashIcon className="h-5 w-5"/>}
                        </button>
                      </div>
                       <p className="mt-1 text-xs text-gray-500">Mín. 8 caracteres, 1 mayús., 1 especial.</p>
                    </div>
                    <div>
                      <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nueva Contraseña</label>
                      <input type="password" name="confirmNewPassword" id="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={handlePasswordChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    {formError && <p className="text-sm text-red-600 text-center">{formError}</p>}
                    {formSuccess && <p className="text-sm text-green-600 text-center">{formSuccess}</p>}
                    <div className="pt-2">
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-red-300">
                            {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
                        </button>
                    </div>
                 </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
