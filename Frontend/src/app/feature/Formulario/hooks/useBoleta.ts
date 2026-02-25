import { useState } from 'react';
import { servicioBoleta } from '../../../core/servicios/ServicioBoleta';
import type { BoletaRequest, DetalleRequest } from '../../../core/models/Boleta.models';
import type { ClienteData, ProductoItem, TipoMoneda } from '../types/formulario.types';

interface UsBoletaProps {
  cliente: ClienteData;
  productos: ProductoItem[];
  totalBoleta: number;
  subtotalBoleta: number;
  moneda: TipoMoneda;
  tipoCambio: number | null;
}

export const useBoleta = () => {
  const [cargandoBoleta, setCargandoBoleta] = useState(false);

  const crearBoleta = async ({
    cliente,
    productos,
    totalBoleta,
    subtotalBoleta,
    moneda,
    tipoCambio
  }: UsBoletaProps): Promise<{ exito: boolean; mensaje: string }> => {
    
    if (!cliente.documento || productos.length === 0 || totalBoleta <= 0) {
      return {
        exito: false,
        mensaje: 'Debe completar el documento del cliente y añadir productos válidos.'
      };
    }

    setCargandoBoleta(true);

    try {
      // Convertir a soles si está en dólares (la BD guarda en soles)
      const totalEnSoles = moneda === 'USD' && tipoCambio
        ? totalBoleta * tipoCambio
        : totalBoleta;
      
      const subtotalEnSoles = moneda === 'USD' && tipoCambio
        ? subtotalBoleta * tipoCambio
        : subtotalBoleta;

      // Convertir productos a soles si están en dólares
      const cartItemsEnSoles: DetalleRequest[] = productos.map(p => ({
        nombreProducto: p.nombreProducto,
        precioUnitario: moneda === 'USD' && tipoCambio 
          ? p.precioUnitario * tipoCambio 
          : p.precioUnitario,
        cantidad: p.cantidad
      }));

      const request: BoletaRequest = {
        cartItems: cartItemsEnSoles,
        total: totalEnSoles,
        subtotal: subtotalEnSoles,
        nombreCliente: `${cliente.nombres} ${cliente.apellidos}`.trim(),
        documentoCliente: cliente.documento,
        emailCliente: cliente.email || 'example@gmail.com'
      };

      await servicioBoleta.crearBoleta(request);
      return { exito: true, mensaje: 'Boleta creada exitosamente.' };
    } catch (error) {
      const errorMsg = error instanceof Error 
        ? error.message 
        : 'Error desconocido al crear la boleta';
      return { exito: false, mensaje: errorMsg };
    } finally {
      setCargandoBoleta(false);
    }
  };

  return {
    cargandoBoleta,
    crearBoleta
  };
};