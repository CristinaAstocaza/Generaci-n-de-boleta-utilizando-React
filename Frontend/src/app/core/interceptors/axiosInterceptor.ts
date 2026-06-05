import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

const URL_EXCLUIDA = 'https://apiperu.dev';

const esUrlExternaExcluida = (url?: string): boolean => {
  return !!url?.includes(URL_EXCLUIDA);
};

/*Interceptor de peticiones: Agrega el token JWT automáticamente */
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // aqui excluye la parte del api
    if (esUrlExternaExcluida(config.url)) {
      console.log(` Interceptor omitido para URL externa: ${config.url}`);
      return config;
    }

   
    const token = localStorage.getItem('authToken');

   
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(' Token agregado a la petición:', config.url);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*Interceptor de respuestas: Maneja errores globalmente*/
axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('Error en petición HTTP:', error);

    if (esUrlExternaExcluida(error.config?.url)) {
      console.warn('Error de API externa, no se cerrará la sesión del usuario:', error.config?.url);
      return Promise.reject(error);
    }

    // Si es error 401 (No autorizado), redirigir al login
    if (error.response?.status === 401) {
      console.warn('Token inválido o expirado, redirigiendo a login...');

      
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      window.location.href = '/autenticacion';
    }

    return Promise.reject(error);
  }
);

export default axios;
