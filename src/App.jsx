// src/App.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRouter from "./router";
import "./App.css";
import {
  loadUser,
  selectToken,
  selectIsAuthenticated,
} from "./features/auth/authSlice"; // Importa loadUser

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken); // O podrías leerlo directamente de localStorage aquí para el primer chequeo

  useEffect(() => {
    // Si hay un token en localStorage (o en el estado inicial de Redux que lo leyó),
    // intenta cargar la información del usuario.
    if (token) {
      // Este token viene del estado inicial de Redux que intentó leer de localStorage
      dispatch(loadUser());
    }
  }, [dispatch, token]); // Ejecutar solo si dispatch o token cambian (token cambiará al inicio si existe en localStorage)

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
