import React from "react";

// --- Datos de los Testimonios ---
const testimonials = [
  {
    id: 0,
    quote: "Desde que implementamos el sistema, la facturación es rapidísima y sin errores. ¡El punto de venta es muy intuitivo para mis empleados!",
    name: "Jorge L.",
    title: "Gerente de 'El Buen Sabor'",
    initial: "J",
    color: "4CAF50", // Verde
  },
  {
    id: 1,
    quote: "La gestión de inventario ha sido un cambio total. Ya no perdemos ventas por falta de stock. Soporte técnico siempre atento.",
    name: "María T.",
    title: "Propietaria de 'TecnoYa'",
    initial: "M",
    color: "2196F3", // Azul
  },
  {
    id: 2,
    quote: "Un sistema robusto y fácil de usar. Las actualizaciones son constantes y la integración con mi contabilidad fue simple.",
    name: "Alejandro G.",
    title: "Dueño de 'Distribuidora Central'",
    initial: "A",
    color: "FF9800", // Naranja
  },
];



/**
 * Sección de Testimonios con carrusel de Bootstrap.
 * NOTA: Para que el carrusel funcione, Bootstrap JS debe estar cargado en tu entorno.
 */
const Body3: React.FC = () => {
  return (
    <section id="testimonios" className="py-5 bg-light testimonial-section-wrapper">
      <div className="container text-center">
        <h2 className="fw-bold mb-5 display-5 text-dark">Nuestros Clientes lo Recomiendan ✨</h2>

        {/* --- Carrusel de Testimonios --- */}
        <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
          
          {/* Indicadores */}
          <div className="carousel-indicators">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                type="button" 
                data-bs-target="#testimonialCarousel" 
                data-bs-slide-to={index} 
                className={index === 0 ? 'active' : ''} 
                aria-current={index === 0 ? 'true' : 'false'} 
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Contenido del Carrusel (Iterado sobre el array) */}
          <div className="carousel-inner pb-5">
            {testimonials.map((t, index) => (
              <div key={t.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <div className="testimonial-card p-4 rounded shadow-lg bg-white">
                      <p className="lead fst-italic mb-4 testimonial-quote">
                        "{t.quote}"
                      </p>
                      <img 
                        src={`https://placehold.co/60x60/${t.color}/FFFFFF?text=${t.initial}`} 
                        className="rounded-circle mb-2 profile-img" 
                        alt={`Foto de Cliente ${t.name}`}
                      />
                      <h5 className="fw-bold mb-0">{t.name}</h5>
                      <p className="text-muted">{t.title}</p>
                      <div className="text-warning rating">
                        ★★★★★
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controles de Navegación */}
          <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </div>
    </section>
  );
}; 

export default Body3;