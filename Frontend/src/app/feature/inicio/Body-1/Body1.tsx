import React from 'react';
import './Body1.scss';

// --- Definición de datos para las funcionalidades ---
const featuresData = [
  {
    iconClass: "bi bi-bar-chart-fill",
    title: "Estadísticas en Tiempo Real",
    description: "Visibilidad completa de tu negocio con estadísticas diarias. Toma decisiones informadas basadas en datos actualizados.",
    colorClass: "text-primary"
  },
  {
    iconClass: "bi bi-box-seam",
    title: "Control de Inventario",
    description: "Gestiona tu inventario de manera eficiente. Verifica existencias y recibe alertas de stock bajo.",
    colorClass: "text-success"
  },
  {
    iconClass: "bi bi-laptop-fill",
    title: "Multiplataforma",
    description: "Accede desde cualquier dispositivo: laptop, tablet o smartphone. Todo en la nube, sin necesidad de instalación.",
    colorClass: "text-info"
  },
  {
    iconClass: "bi bi-receipt-cutoff",
    title: "Facturación Electrónica",
    description: "Emite boletas, facturas y notas de crédito de forma fácil y rápida. Envío directo a SUNAT para evitar multas.",
    colorClass: "text-danger"
  },
  {
    iconClass: "bi bi-cash-register",
    title: "Punto de Venta Integrado",
    description: "Sistema POS completo con gestión de caja, cierre de caja y registro de ventas por empleado.",
    colorClass: "text-warning"
  },
  {
    iconClass: "bi bi-shield-lock-fill",
    title: "Seguro y Confiable",
    description: "Certificación ISO 27001 para resguardar la información. Servicio de OSE sin costo adicional.",
    colorClass: "text-secondary"
  },
];

/**
 * Sección de Funcionalidades clave del sistema.
 */
const Body1: React.FC = () => {
  return (
    <section id="funcionalidades" className="py-5 bg-light feature-section">
      <div className="container">
        <h2 className="fw-bold mb-3 text-primary main-feature-title">
          Como emprendedores, sabemos lo que necesitas 😉
        </h2>
        <p className="text-muted mb-5 lead-subtitle">
          Somos emprendedores que hemos creado un sistema de punto de venta con facturación electrónica
          y buscamos brindar las herramientas clave que despeguen los negocios de los emprendedores de Latinoamérica.
        </p>

        <div className="row g-4 justify-content-center">
          {featuresData.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-4"> {/* col-lg-4 para 3 por fila, col-md-6 para 2 por fila */}
              <div className="card h-100 border-0 shadow-sm feature-card transition">
                <div className="card-body">
                  <div className={`mb-3 feature-icon ${feature.colorClass}`}>
                    <i className={`${feature.iconClass} fs-1`}></i>
                  </div>
                  <h5 className="card-title fw-semibold">{feature.title}</h5>
                  <p className="card-text text-muted">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Body1;