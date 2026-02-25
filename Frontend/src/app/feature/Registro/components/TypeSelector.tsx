import React from 'react';
import type { TipoDocumento } from '../hooks/useRegistro';

interface Props {
  tipoDocumento: TipoDocumento;
  onChange: (tipo: TipoDocumento) => void;
  disabled: boolean;
}

export const TypeSelector: React.FC<Props> = ({ tipoDocumento, onChange, disabled }) => {
  return (
    <div className="mb-3 w-100">
      <div className="btn-group w-100" role="group">
        <button
          type="button"
          className={`btn ${tipoDocumento === 'DNI' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onChange('DNI')}
          disabled={disabled}
        >
          <i className="fas fa-id-card me-2"></i> DNI (Persona)
        </button>
        <button
          type="button"
          className={`btn ${tipoDocumento === 'RUC' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onChange('RUC')}
          disabled={disabled}
        >
          <i className="fas fa-building me-2"></i> RUC (Empresa)
        </button>
      </div>
    </div>
  );
};