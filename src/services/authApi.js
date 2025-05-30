// src/services/authApi.js

const BASE_URL = "http://localhost:3001/api"; // Asegúrate que el puerto coincida con tu backend

// Función para obtener el token del localStorage
const getToken = () => localStorage.getItem("token");

/**
 * Realiza una petición de login al backend.
 * @param {Object} credentials - Objeto con email y password.
 * @returns {Promise<Object>} - Promesa con los datos de la respuesta (token y usuario).
 */
export const login = async (credentials) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al iniciar sesión");
  }
  return data; // Devuelve { token, user, message }
};

/**
 * Obtiene el perfil del usuario actualmente autenticado.
 * @returns {Promise<Object>} - Promesa con los datos del perfil del usuario.
 */
export const getMyProfile = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No hay token de autenticación.");
  }

  const response = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET", // El backend lo definimos como GET para el perfil
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener el perfil.");
  }
  return data; // Devuelve el objeto usuario
};

/**
 * Activa una cuenta de usuario.
 * @param {string} activationToken - El token de activación desde la URL.
 * @returns {Promise<Object>} - Promesa con la respuesta del servidor.
 */
export const activateAccount = async (activationToken) => {
  const response = await fetch(`${BASE_URL}/auth/activate/${activationToken}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al activar la cuenta.");
  }
  return data; // Devuelve { message, user }
};

// Puedes añadir más funciones aquí para:
// - Crear usuarios (admin)
// - Actualizar usuarios (admin)
// - etc.
// Por ejemplo:
export const adminCreateUser = async (userData) => {
  const token = getToken();
  if (!token) throw new Error("Acción no autorizada. Se requiere token.");

  const response = await fetch(`${BASE_URL}/auth/admin/create-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error al crear usuario.");
  }
  return data;
};

export const adminGetAllUsers = async () => {
  const token = getToken();
  if (!token) throw new Error("Acción no autorizada. Se requiere token.");

  const response = await fetch(`${BASE_URL}/users`, {
    // Asumiendo que la ruta es /api/users
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error al obtener usuarios.");
  }
  return data;
};

export const adminUpdateUser = async (userId, updateData) => {
  const token = getToken();
  if (!token) throw new Error("Acción no autorizada. Se requiere token.");

  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    // Asumiendo que la ruta es /api/users/:id
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error al actualizar usuario.");
  }
  return data;
};

/**
 * Admin: Elimina un usuario por su ID.
 * @param {string} userId - El ID del usuario a eliminar.
 * @returns {Promise<Object>} - Promesa con el mensaje de éxito.
 */
export const adminDeleteUser = async (userId) => {
  const token = getToken();
  if (!token) {
    throw new Error('Acción no autorizada. Se requiere token.');
  }

  const response = await fetch(`${BASE_URL}/users/${userId}`, { // Asumiendo que la ruta es DELETE /api/users/:id
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al eliminar el usuario.');
  }
  return data; // Devuelve { message }
};
