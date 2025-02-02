import axios from "axios";

// Definir la URL base de la API dependiendo del entorno
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://back-app-production-54e2.up.railway.app/api" // ⬅️ URL del backend en Railway
    : "http://localhost:5000/api"; // ⬅️ Para desarrollo local

// Crear la instancia de Axios con la URL base y headers por defecto
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json", // Se envían los datos en formato JSON
  },
});

// Interceptor para incluir el token en cada solicitud, si existe en el localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = Bearer ${token}; // ⬅️ Corrección: Usa "Authorization" estándar
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
