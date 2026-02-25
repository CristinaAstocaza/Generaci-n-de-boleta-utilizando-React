import React from 'react';
import type { TipoMoneda } from '../../Formulario/types/formulario.types';

interface Props {
  monedaVista: TipoMoneda;
  setMonedaVista: (moneda: TipoMoneda) => void;
  tipoCambio: number | null;
  disabled?: boolean;
}

export const CurrencySelector: React.FC<Props> = ({ monedaVista, setMonedaVista, tipoCambio, disabled }) => {
  return (
    <div className="row mb-3">
      <div className="col-12">
        <div className="btn-group btn-group-sm w-100" role="group">
          <button
            type="button"
            className={`btn ${monedaVista === 'PEN' ? 'btn-info' : 'btn-outline-info'}`}
            onClick={() => setMonedaVista('PEN')}
            disabled={disabled}
          >
            <i className="fas fa-coins me-1"></i> Ver en Soles (S/)
          </button>
          <button
            type="button"
            className={`btn ${monedaVista === 'USD' ? 'btn-info' : 'btn-outline-info'}`}
            onClick={() => setMonedaVista('USD')}
            disabled={disabled || !tipoCambio}
          >
            <i className="fas fa-dollar-sign me-1"></i> Ver en Dólares ($)
          </button>
        </div>
        {tipoCambio && (
          <small className="text-muted d-block text-center mt-2">
            Tipo de cambio: S/ {tipoCambio.toFixed(3)}
          </small>
        )}
      </div>
    </div>
  );
};