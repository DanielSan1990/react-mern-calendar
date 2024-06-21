import axios from 'axios';
import { getEnvVariables } from '../helpers';

// Extraer la URL de la API de las variables de entorno
const { VITE_API_URL } = getEnvVariables();

// Crear una instancia de axios con la URL base configurada
const apiClient = axios.create({
    baseURL: VITE_API_URL
});

// Configurar interceptores para añadir el token en las cabeceras de las solicitudes
apiClient.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token') // Añadir el token desde el localStorage
    };

    return config;
});

export default apiClient;
