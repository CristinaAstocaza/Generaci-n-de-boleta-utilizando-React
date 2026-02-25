// features/boleta/components/BoletaTable.tsx
import React from 'react';
import type { DetalleBoletaDTO } from '../../../core/models/Boleta.models';

interface Props {
  detalles: DetalleBoletaDTO[];
  formatearPrecio: (precio: number) => string;
}

export const BoletaTable: React.FC<Props> = ({ detalles, formatearPrecio }) => {
  return (
    <div className="table-responsive">
      <table className="table table-sm">
        <thead className="bg-success text-white">
          <tr>
            <th>Cant.</th>
            <th>Descripción</th>
            <th>P.Unit</th>
            <th className="text-end">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((item) => (
            <tr key={item.idDetalle}>
              <td>{item.cantidad}</td>
              <td>{item.producto}</td>
              <td>{formatearPrecio(item.precio_unitario)}</td>
              <td className="text-end">
                {formatearPrecio(item.subtotal || item.cantidad * item.precio_unitario)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};