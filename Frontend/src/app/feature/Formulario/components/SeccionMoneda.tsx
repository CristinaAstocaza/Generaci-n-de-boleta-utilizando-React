import React from 'react';
import type { TipoMoneda } from '../types/formulario.types';

interface SeccionMonedaProps {
  moneda: TipoMoneda;
  tipoCambio: number | null;
  onCambiarMoneda: (moneda: TipoMoneda) => void;
}

export const SeccionMoneda: React.FC<SeccionMonedaProps> = ({
  moneda,
  tipoCambio,
  onCambiarMoneda
}) => {
  return (
    <div className="card mb-4">
      <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
        <span>Moneda de Pago</span>
        {tipoCambio && (
          <small className="badge bg-light text-dark">
            T.C: S/ {tipoCambio.toFixed(3)}
          </small>
        )}
      </div>
      <div className="card-body">
        <div className="btn-group w-100" role="group">
          <button
            type="button"
            className={`btn ${moneda === 'PEN' ? 'btn-info' : 'btn-outline-info'}`}
            onClick={() => onCambiarMoneda('PEN')}
          >
            <i className="fas fa-coins me-2"></i>
            Soles (S/)
          </button>
          <button
            type="button"
            className={`btn ${moneda === 'USD' ? 'btn-info' : 'btn-outline-info'}`}
            onClick={() => onCambiarMoneda('USD')}
          >
            <i className="fas fa-dollar-sign me-2"></i>
            Dólares ($)
          </button>
        </div>
      </div>
    </div>
  );
};