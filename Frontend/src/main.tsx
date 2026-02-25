import React from 'react'; // Necesitas importar React para usar React.StrictMode
import { createRoot } from 'react-dom/client'; // Usa createRoot para React 18+
import { BrowserRouter } from 'react-router-dom'; // Importación de Router
import './index.css';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const rootElement = document.getElementById('root');

if (rootElement) {
  
  createRoot(rootElement).render(
    <React.StrictMode>
      
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {

  console.error("No se encontró el elemento con ID 'root'.");
}