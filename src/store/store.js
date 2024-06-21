import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, calendarSlice, authSlice } from './';

// Configuración de la tienda de Redux
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer, // Reducer para la autenticación
        calendar: calendarSlice.reducer, // Reducer para el calendario
        ui: uiSlice.reducer // Reducer para la interfaz de usuario
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false // Deshabilitar la verificación de serialización para permitir estados no serializables
    })
});
