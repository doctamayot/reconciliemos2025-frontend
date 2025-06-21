import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../services/authApi"; // Importa tu servicio API

// Estado inicial
const initialState = {
  user: null, // Contendrá la información del usuario { id, email, role, firstName, lastName }
  token: localStorage.getItem("token") || null, // Intenta cargar el token desde localStorage
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// --- Async Thunks ---

// Thunk para el login del usuario
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authApi.login(credentials); // Llama al API
      localStorage.setItem("token", data.token); // Guarda el token
      return data; // { token, user, message }
    } catch (error) {
      return rejectWithValue(error.message || "Error desconocido en login");
    }
  }
);

// Thunk para cargar el perfil del usuario si hay un token
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue, getState }) => {
    const token = getState().auth.token; // Obtiene el token del estado actual si es necesario
    if (!token) {
      return rejectWithValue("No hay token para cargar usuario.");
    }
    try {
      const userData = await authApi.getMyProfile(); // Llama al API /auth/me
      return { user: userData }; // Devuelve solo el usuario
    } catch (error) {
      localStorage.removeItem("token"); // Si el token es inválido o hay error, límpialo
      return rejectWithValue(error.message || "No se pudo cargar el usuario.");
    }
  }
);

// Thunk para el logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("token");
  // Aquí podrías también llamar a un endpoint de logout en el backend si lo tienes
  // para invalidar el token en el servidor, por ejemplo, si usas una blacklist.
  return null;
});

// --- Slice ---
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Podrías tener reducers síncronos si los necesitas
    // por ejemplo, para limpiar errores manualmente
    clearAuthError: (state) => {
      state.error = null;
    },
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload; // El mensaje de error de rejectWithValue
        localStorage.removeItem("token");
      })
      // Load User
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        // El token ya debería estar en el estado si se llamó a loadUser
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null; // Asegurarse de limpiar el token en el estado si falla la carga
        state.error = action.payload;
      })
      // Logout User
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { clearAuthError, updateUserProfile } = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
