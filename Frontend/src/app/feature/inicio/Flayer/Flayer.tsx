import React from 'react';
import './Flayer.scss'; // El archivo SCSS de la sección Hero

// Definir las props que usará el componente (FlayerProps)
interface FlayerProps {
  onRegisterClick: () => void;
}

/**
 * Componente principal (Flayer/Landing Page Hero Section)
 * Incluye estilos de Bootstrap y clases personalizadas.
 */
const Flayer: React.FC<FlayerProps> = ({ onRegisterClick }) => {
  return (
    <div className="landing-hero-wrapper">
      <section className="hero-section text-center">
        <div className="container py-5">
          {/* Icono animado y texto */}
          <div className="icon-text">🚀</div>
          <h1 className="display-4 fw-bold mb-3">Sistema de Facturación Electrónica y Punto de Venta</h1>
          <p className="lead mb-5 fs-4">
            Gestiona tu negocio con nuestra plataforma fácil, rápida y segura. ¡Optimiza tus ventas hoy mismo!
          </p>
          
          {/* Contenedor de botones */}
          <div className="d-flex justify-content-center gap-4 flex-wrap">
            {/* Botón de Registro (Comienza ahora gratis) */}
            <button 
              onClick={onRegisterClick} 
              className="btn btn-light btn-lg text-primary fw-bold btn-custom-light"
            >
              <i className="bi bi-box-arrow-in-right me-2"></i> Comienza ahora gratis
            </button>

            
          </div>
        </div>
      </section>
    </div>
  );
};

// Exportación por defecto
export default Flayer;
