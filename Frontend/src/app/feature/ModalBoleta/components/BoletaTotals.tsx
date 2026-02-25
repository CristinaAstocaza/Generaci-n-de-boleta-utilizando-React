// features/boleta/components/BoletaTotals.tsx
import React from 'react';


// Definir la interfaz de props
interface BoletaTotalsProps {
  total: number;
  monedaVista: 'PEN' | 'USD';
  formatearPrecio: (precio: number) => string;
  onPrint: () => void;
  onClose: () => void;
}

export const BoletaTotals: React.FC<BoletaTotalsProps> = ({
  total,
  monedaVista,
  formatearPrecio,
  onPrint,
  onClose
}) => {
  return (
    <>
      <div className="row info-totales">
        <div className="col-6">
          <h6 className="fw-bold">Totales:</h6>
          <p className="mb-1">El monto total incluye impuestos (IGV 18%)</p>
          <p className="mb-1 text-muted small">
            <i className="fas fa-info-circle me-1"></i>
            Moneda: {monedaVista === 'PEN' ? 'Soles Peruanos' : 'Dólares Americanos'}
          </p>
        </div>
        <div className="col-6 text-end">
          <table className="table table-sm total-table">
            <tbody>
              <tr>
                <td className="text-end border-0 fw-bold">Subtotal:</td>
                <td className="text-end border-0">{formatearPrecio(total)}</td>
              </tr>
              <tr>
                <td className="text-end border-0 fw-bold">Total Pagado:</td>
                <td className="text-end border-0 fw-bold text-success fs-5">
                  {formatearPrecio(total)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12 text-center">
          <button className="btn btn-outline-primary me-2" onClick={onPrint}>
            <i className="fas fa-print me-2"></i> Imprimir
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            <i className="fas fa-times me-2"></i> Cerrar
          </button>
        </div>
      </div>
    </>
  );
};
