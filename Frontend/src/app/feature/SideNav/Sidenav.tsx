import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { authService } from '../../core/servicios/ServicioAuth';
import './Sidenav.scss';

export const SideNav: React.FC = () => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    if (window.confirm('¿Estás seguro de cerrar sesión?')) {
      authService.logout();
      navigate('/autenticacion');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <nav className="nav flex-column">
        {/* ⭐ Rutas RELATIVAS (sin / al inicio) */}
        <NavLink
          to="tabla-boletas"
          className={({ isActive }) =>
            `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded text-secondary ${
              isActive ? 'active' : ''
            }`
          }
        >
          <span className="material-symbols-outlined">ballot</span>
          <span className="small fw-semibold">LISTA DE BOLETAS</span>
        </NavLink>

        <NavLink
          to="formulario-boletas"
          className={({ isActive }) =>
            `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded text-secondary ${
              isActive ? 'active' : ''
            }`
          }
        >
          <span className="material-symbols-outlined">assignment_add</span>
          <span className="small fw-medium">NUEVA BOLETA</span>
        </NavLink>

        <hr />

        <button
          onClick={cerrarSesion}
          className="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded border-0 bg-transparent text-start w-100"
          style={{ cursor: 'pointer' }}
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="small fw-medium">Cerrar Sesión</span>
        </button>
      </nav>
    </div>
  );
};

