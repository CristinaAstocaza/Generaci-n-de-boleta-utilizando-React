// Frontend/src/components/Sidebar/Sidebar.tsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// 1. Define las props que el Sidebar espera recibir del componente padre
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  // Hook de React Router para saber en qué ruta estamos
  const location = useLocation();

  // Función auxiliar para determinar si un link está activo
  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  // Clase que Bootstrap usa para mostrar/ocultar el Offcanvas
  const visibilityClass = isOpen ? 'show' : '';

  return (
    <div 
      className={`offcanvas offcanvas-start custom-sidebar ${visibilityClass}`} 
      tabIndex={-1} 
      id="sidebarMenu"
      // Estos atributos ARIA son importantes para accesibilidad
      aria-labelledby="sidebarMenuLabel" 
      aria-modal={isOpen ? true : false}
    >
      
      <div className="offcanvas-header custom-sidebar-header">
        <h5 className="offcanvas-title" id="sidebarMenuLabel">Menú</h5>
        {/* El botón de cerrar usa la función onClose proporcionada por el padre */}
        <button 
          type="button" 
          className="btn-close" 
          onClick={onClose} 
          aria-label="Cerrar"
        />
      </div>
      
      <div className="offcanvas-body">
        {/* Links de navegación */}
        <ul className="navbar-nav px-3">
          <li>
            {/* Etiqueta de autocierre en JSX */}
            <hr className="mb-3" /> 
          </li>
          
          <li className="nav-item">
            {/* Enlace de React Router. Al hacer clic, cerramos el menú. */}
            <Link 
              to="/dashboard" 
              className={`nav-link ${isActive('/dashboard')}`}
              onClick={onClose}
            >
              DASHBOARD
            </Link>
          </li>
          
          <li className="nav-item">
            <Link 
              to="/catalogo" 
              className={`nav-link ${isActive('/catalogo')}`}
              onClick={onClose}
            >
              Catálogo
            </Link>
          </li>
          
          <li className="nav-item">
            <Link 
              to="/nosotros" 
              className={`nav-link ${isActive('/nosotros')}`}
              onClick={onClose}
            >
              Nosotros
            </Link>
          </li>
          
          <li className="nav-item">
            <Link 
              to="/contactanos" 
              className={`nav-link ${isActive('/contactanos')}`}
              onClick={onClose}
            >
              Contáctanos
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;