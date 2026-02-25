import React from 'react';
import { servicioBoleta } from '../../../core/servicios/ServicioBoleta';
import type { BoletaDetailsResponse } from '../../../core/models/Boleta.models';

interface Props {
  boleta: BoletaDetailsResponse;
}

export const BoletaInfo: React.FC<Props> = ({ boleta }) => {
  
  const esRUC = (documento: string) => documento.length === 11;

  return (
    <div className="row mb-3 info-clientes">
      {/* Columna Cliente */}
      <div className="col-6">
        <p className="mb-1">
          <strong>Cliente: </strong> <span>{boleta.nombreCliente}</span>
        </p>
        <p className="mb-1">
          <strong>{esRUC(boleta.documentoCliente) ? 'RUC' : 'DNI'}: </strong>
          <span> {boleta.documentoCliente}</span>
          {esRUC(boleta.documentoCliente) && (
            <span className="badge bg-info ms-2 small">Empresa</span>
          )}
        </p>
        <p className="mb-1">
          <strong>Email: </strong> <span>{boleta.emailCliente}</span>
        </p>
        <p className="mb-1">
          <strong>Estado: </strong> <span className="text-success fw-bold">PAGADO</span>
        </p>
      </div>

      {/* Columna Vendedor / Fecha */}
      <div className="col-6 text-end">
        <p className="mb-1">
          <strong>Fecha de emisión:</strong>
          <span> {servicioBoleta.formatearFecha(boleta.fecha_creacion)}</span>
        </p>
        <div className="mt-2 mb-1">
          <strong>Vendedor:</strong>
          {boleta.usuarioVendedor ? (
            <span>
              <br />
              {boleta.usuarioVendedor.nombres} {boleta.usuarioVendedor.apellidos}
              <br />
              <small className="text-muted">
                {esRUC(boleta.usuarioVendedor.numero_documento) ? 'RUC' : 'DNI'}: {boleta.usuarioVendedor.numero_documento}
              </small>
            </span>
          ) : (
            <span><br />Usuario ID {boleta.idUsuario}</span>
          )}
        </div>
      </div>
    </div>
  );
};