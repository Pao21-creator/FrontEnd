import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Asegúrate de que la ruta es correcta
import './styles/App.css'; // Si tienes estilos globales

// Montar la aplicación en el div con id "root"
const app = ReactDOM.createRoot(document.getElementById('app'));
app.render(<App />);
