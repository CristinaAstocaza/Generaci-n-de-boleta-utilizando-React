import React from 'react';
import './Body2.scss';

// --- Definición de datos para los beneficios ---
const benefitsData = [
  {
    iconClass: "bi bi-lightning-charge-fill",
    title: "Ventas Ultra Rápidas (POS)",
    description: "Agiliza cada transacción. Menos colas y más clientes satisfechos en tu local.",
    iconStyle: "icon-1"
  },
  {
    iconClass: "bi bi-check-circle-fill",
    title: "100% Electrónico y Legal",
    description: "Cumple con todas las normativas de la SUNAT automáticamente. Olvídate de multas.",
    iconStyle: "icon-2"
  },
  {
    iconClass: "bi bi-cloud-arrow-up-fill",
    title: "Respaldo en la Nube",
    description: "Toda tu información está segura y respaldada en la nube, accesible 24/7.",
    iconStyle: "icon-3"
  },
  {
    iconClass: "bi bi-journal-text",
    title: "Reportes Detallados",
    description: "Genera reportes de ventas, productos más vendidos y ganancias con un solo clic.",
    iconStyle: "icon-4"
  }
];


/**
 * Sección de Beneficios clave del Punto de Venta (POS) y Facturación.
 */
const Body2: React.FC = () => {
  return (
    <section id="beneficios-pos" className="pos-benefits-section py-5">
      <div className="container text-center">
        <h2 className="main-title mb-3 display-5">
          Potencia tus Ventas y Cumple con la Ley 🚀
        </h2>
        <p className="lead text-light mb-5">
          Enfócate en tu crecimiento mientras nosotros manejamos la complejidad.
        </p>

        <div className="row g-4 justify-content-center">
          {benefitsData.map((benefit, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="p-4 benefit-card">
                <div className={`benefit-icon ${benefit.iconStyle}`}>
                  <i className={benefit.iconClass}></i>
                </div>
                <h5 className="fw-bold mb-2">{benefit.title}</h5>
                <p className="small text-light opacity-75">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Body2;