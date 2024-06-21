import React from 'react';
import ReactDOM from 'react-dom/client';

import { CalendarApp } from './CalendarApp';
import './styles.css';

// Renderizar la aplicación principal de calendario en el elemento con id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> // Modo estricto de React, útil para detectar problemas potenciales
    <CalendarApp />
  // </React.StrictMode>
)
