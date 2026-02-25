import React from 'react';
import type { ClienteData, TipoDocumento } from '../types/formulario.types';

interface SeccionClienteProps {
  cliente: ClienteData;
  cargandoDocumento: boolean;
  onCambiarTipoDocumento: (tipo: TipoDocumento) => void;
  onActualizarDocumento: (documento: string) => void;
  onActualizarEmail: (email: string) => void;
  onBuscarDocumento: () => void;
}

export const SeccionCliente: React.FC<SeccionClienteProps> = ({
  cliente,
  cargandoDocumento,
  onCambiarTipoDocumento,
  onActualizarDocumento,
  onActualizarEmail,
  onBuscarDocumento
}) => {
  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">Datos del Cliente</div>
      <div className="card-body">
        {/* Selector de tipo de documento */}
        <div className="row mb-3">
          <div className="col-12">
            <div className="btn-group w-100" role="group">
              <button
                type="button"
                className={`btn ${cliente.tipoDocumento === 'DNI' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => onCambiarTipoDocumento('DNI')}
                disabled={cargandoDocumento}
              >
                <i className="fas fa-id-card me-2"></i>
                DNI (Persona Natural)
              </button>
              <button
                type="button"
                className={`btn ${cliente.tipoDocumento === 'RUC' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => onCambiarTipoDocumento('RUC')}
                disabled={cargandoDocumento}
              >
                <i className="fas fa-building me-2"></i>
                RUC (Empresa)
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="documento">{cliente.tipoDocumento}</label>
            <div className="input-group">
              <input
                type="text"
                id="documento"
                className="form-control"
                placeholder={cliente.tipoDocumento === 'DNI' ? '8 dígitos' : '11 dígitos'}
                value={cliente.documento}
                onChange={(e) => onActualizarDocumento(e.target.value)}
                maxLength={cliente.tipoDocumento === 'DNI' ? 8 : 11}
                required
                disabled={cargandoDocumento}
              />
              <button
                className="btn btn-secondary"
                type="button"
                onClick={onBuscarDocumento}
                disabled={
                  cargandoDocumento || 
                  cliente.documento.length !== (cliente.tipoDocumento === 'DNI' ? 8 : 11)
                }
              >
                {cargandoDocumento ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-search me-2"></i>
                    Buscar
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="nombres">
              {cliente.tipoDocumento === 'DNI' ? 'Nombres' : 'Razón Social'}
            </label>
            <input
              type="text"
              id="nombres"
              className="form-control"
              value={cliente.nombres}
              readOnly
            />
          </div>

          {cliente.tipoDocumento === 'DNI' && (
            <div className="col-md-4 mb-3">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                type="text"
                id="apellidos"
                className="form-control"
                value={cliente.apellidos}
                readOnly
              />
            </div>
          )}

          <div className={`col-md-${cliente.tipoDocumento === 'DNI' ? '12' : '4'} mb-3`}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="correo@ejemplo.com"
              value={cliente.email}
              onChange={(e) => onActualizarEmail(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};