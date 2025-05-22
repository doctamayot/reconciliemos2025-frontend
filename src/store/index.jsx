// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"; // Importa el authReducer
// import uiReducer from '../features/ui/uiSlice'; // Si tenías otros reducers

export const store = configureStore({
  reducer: {
    auth: authReducer, // Añade el reducer de autenticación
    // ui: uiReducer,
    // ...otros reducers que puedas tener
  },
  devTools: process.env.NODE_ENV !== "production",
});
