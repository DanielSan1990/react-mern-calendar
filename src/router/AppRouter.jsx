import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {
    const { status, verifyAuthToken } = useAuthStore();

    // Verificar el token de autenticación al montar el componente
    useEffect(() => {
        verifyAuthToken();
    }, []);

    // Mostrar mensaje de carga mientras se verifica el estado de autenticación
    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        );
    }

    return (
        <Routes>
            {
                (status === 'not-authenticated')
                    ? (
                        <>
                            <Route path="/auth/*" element={<LoginPage />} />
                            <Route path="/*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={<CalendarPage />} />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )
            }
        </Routes>
    );
}
