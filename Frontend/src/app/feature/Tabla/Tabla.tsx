import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicioBoleta } from '../../core/servicios/ServicioBoleta';
import type { Boleta } from '../../core/models/Boleta.models';
import { ModalBoleta } from '../ModalBoleta/ModalBoleta';

import './Tabla.scss';

export const Tabla: React.FC = () => {
  const [boletas, setBoletas] = useState<Boleta[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedBoletaId, setSelectedBoletaId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    cargarBoletas();
  }, []);

  const cargarBoletas = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const data = await servicioBoleta.obtenerMisBoletasOrdenadas();
      console.log('✅ Boletas cargadas:', data);
      setBoletas(data);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error al cargar boletas';
      console.error('❌ Error:', errorMsg);
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const verDetalle = (idBoleta: number) => {
    navigate(`/detalles/${idBoleta}`);
  };

  const verDetalles = (id: number) => {
    console.log(`🔎 Abriendo detalles para Boleta ID: ${id}`);
    setSelectedBoletaId(id);
  };

  return (
    <div className="boletas-container">
      <h2>Mis Boletas</h2>

      {/* Loading */}
      {loading && (
        <div className="loading">
          <p>Cargando boletas...</p>
        </div>
      )}

      {/* Error */}
      {errorMessage && <div className="alert alert-error">{errorMessage}</div>}

      {/* Sin boletas */}
      {!loading && boletas.length === 0 && !errorMessage && (
        <div className="empty-state">
          <p>No tienes boletas registradas</p>
        </div>
      )}

      {/* Lista de boletas */}
      {!loading && boletas.length > 0 && (
        <div className="boletas-list">
          {boletas.map((boleta) => (
            <div
              key={boleta.idBoleta}
              className="boleta-card"
              onClick={() => verDetalle(boleta.idBoleta)}
            >
              <div className="boleta-header">
                <h3>Boleta #{boleta.idBoleta}</h3>
                <span className="boleta-fecha">
                  {servicioBoleta.formatearFecha(boleta.fecha_creacion)}
                </span>
              </div>
              <div className="boleta-body">
                <div className="boleta-total">
                  <span>Total:</span>
                  <strong>{servicioBoleta.formatearPrecio(boleta.total)}</strong>
                </div>
              </div>
              <div className="boleta-footer">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    verDetalles(boleta.idBoleta);
                  }}
                  className="btn-detail"
                >
                  Ver Detalles →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ModalBoleta boletaId={selectedBoletaId} onClose={() => setSelectedBoletaId(null)} />
    </div>
  );
};
