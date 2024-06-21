/**
 * Obtiene las variables de entorno de la aplicación
 * @returns {Object} - Un objeto con las variables de entorno
 */
export const getEnvVariables = () => {
    return {
        ...import.meta.env
    };
}
