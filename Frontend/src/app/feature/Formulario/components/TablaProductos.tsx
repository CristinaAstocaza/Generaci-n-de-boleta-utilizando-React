import React from 'react';
import { servicioCambioMoneda } from '../../../core/servicios/CambioMoneda';
import type { ProductoItem, TipoMoneda } from '../types/formulario.types';

interface TablaProductosProps {
  productos: ProductoItem[];
  moneda: TipoMoneda;
  onAgregarProducto: () => void;
  onEliminarProducto: (index: number) => void;
  onActualizarCampo: (index: number, campo: keyof ProductoItem, valor: string | number) => void;
}

export const TablaProductos: React.FC<TablaProductosProps> = ({
  productos,
  moneda,
  onAgregarProducto,
  onEliminarProducto,
  onActualizarCampo
}) => {
  return (
    <div className="card mb-4">
      <div className="card-header bg-success text-white">
        Productos (Precios en {moneda === 'PEN' ? 'Soles' : 'Dólares'})
      </div>
      <div className="card-body p-0">
        <table className="table table-striped table-sm mb-0">
          <thead>
            <tr>
              <th className="producto">Producto</th>
              <th className="precio">P. Unitario</th>
              <th className="cantidad">Cantidad</th>
              <th className="subtotal">Subtotal</th>
              <th className="accion">Acción</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((item, i) => (
              <tr key={i}>
                <td>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={item.nombreProducto}
                    onChange={(e) => onActualizarCampo(i, 'nombreProducto', e.target.value)}
                    placeholder="Nombre del producto"
                    required
                  />
                </td>

                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    // UX: Si es 0, mostramos vacío para que sea más fácil escribir
                    value={item.precioUnitario === 0 ? '' : item.precioUnitario}
                    onChange={(e) => onActualizarCampo(i, 'precioUnitario', e.target.value)}
                    min="0.01"
                    step="0.01"
                    placeholder="0.00"
                    required
                  />
                </td>

                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    // UX: Si es 0, mostramos vacío
                    value={item.cantidad === 0 ? '' : item.cantidad}
                    onChange={(e) => onActualizarCampo(i, 'cantidad', e.target.value)}
                    min="1"
                    placeholder="0"
                    required
                  />
                </td>

                <td>
                  {servicioCambioMoneda.formatearPrecio(
                    item.precioUnitario * item.cantidad, 
                    moneda
                  )}
                </td>

                <td>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => onEliminarProducto(i)}
                    disabled={productos.length === 1}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card-footer">
        <button
          className="btn btn-outline-success btn-sm"
          onClick={() => {
            // CAMBIO IMPORTANTE: Ahora validamos también la cantidad
            const productoIncompleto = productos.find(
              p => !p.nombreProducto || p.precioUnitario <= 0 || p.cantidad <= 0
            );

            if (productoIncompleto) {
              alert("Completa el nombre, precio y cantidad de todos los productos antes de añadir uno nuevo.");
              return;
            }

            onAgregarProducto();
          }}
        >
          <i className="fas fa-plus me-2"></i>
          Añadir Producto
        </button>
      </div>

    </div>
  );
};