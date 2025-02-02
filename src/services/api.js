import axios from "axios";

// Definir la URL base de la API dependiendo del entorno
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://back-app-production-54e2.up.railway.app/api" // ⬅️ URL en producción
    : "http://localhost:5000/api"; // ⬅️ Para desarrollo local

// Crear la instancia de Axios con la URL base y headers por defecto
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Interceptor para incluir el token en cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Interceptor para manejar errores globalmente (Ej: token expirado)
api.interceptors.response.use(
  (response) => response, // Si la respuesta es correcta, la devuelve tal cual
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Token inválido o expirado. Redirigiendo al login...");
      localStorage.removeItem("token"); // Eliminar token inválido
      window.location.href = "/login"; // Redirigir al login automáticamente
    }
    return Promise.reject(error);
  }
);

export default api;
