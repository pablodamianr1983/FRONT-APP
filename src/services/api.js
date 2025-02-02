import axios from 'axios';

// Crear la instancia de Axios con la URL base y headers por defecto
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',  // Se envían los datos en formato JSON
  },
});

// Interceptor para incluir el token en cada solicitud, si existe en el localStorage
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
