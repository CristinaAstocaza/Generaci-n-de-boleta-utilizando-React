import { useState, useMemo } from 'react';
import type { ProductoItem } from '../types/formulario.types';

export const useProductos = () => {
  // CAMBIO 1: Inicializar cantidad en 0
  const [productos, setProductos] = useState<ProductoItem[]>([
    { nombreProducto: '', precioUnitario: 0, cantidad: 0 } 
  ]);

  // Calcular totales 
  const { totalBoleta, subtotalBoleta } = useMemo(() => {
    const subtotal = productos.reduce(
      (sum, item) => sum + item.precioUnitario * item.cantidad,
      0
    );
    return {
      subtotalBoleta: subtotal,
      totalBoleta: subtotal
    };
  }, [productos]);

  const agregarProducto = () => {
    // CAMBIO 2: Al agregar nuevo, cantidad en 0
    setProductos([...productos, { nombreProducto: '', precioUnitario: 0, cantidad: 0 }]);
  };

  const eliminarProducto = (index: number) => {
    if (productos.length === 1) {
      limpiarProductos();
      return;
    }
    const nuevosProductos = productos.filter((_, i) => i !== index);
    setProductos(nuevosProductos);
  };

  const actualizarProductoCampo = (
    index: number,
    campo: keyof ProductoItem,
    valor: string | number
  ) => {
    const nuevosProductos = [...productos];
    
    const valorCorregido = campo === 'nombreProducto' ? valor : Number(valor);

    nuevosProductos[index] = {
      ...nuevosProductos[index],
      [campo]: valorCorregido
    };

    setProductos(nuevosProductos);
  };

  const limpiarProductos = () => {
    // CAMBIO 3: Al limpiar, resetear a cantidad 0
    setProductos([{ nombreProducto: '', precioUnitario: 0, cantidad: 0 }]);
  };

  // --- VALIDACIÓN ---
  const validarProductos = (): { esValido: boolean; mensaje?: string } => {
    if (productos.length === 0) {
      return { esValido: false, mensaje: 'Debe haber al menos un producto en la lista.' };
    }

    for (let i = 0; i < productos.length; i++) {
      const item = productos[i];
      const fila = i + 1;
      
      if (!item.nombreProducto || item.nombreProducto.trim() === '') {
        return { esValido: false, mensaje: `El producto en la fila ${fila} no tiene nombre.` };
      }
      
      if (item.precioUnitario <= 0) {
        return { esValido: false, mensaje: `El precio en la fila ${fila} debe ser mayor a 0.` };
      }
  
      // Esto ahora detectará el 0 por defecto y pedirá que se llene
      if (item.cantidad <= 0) {
        return { esValido: false, mensaje: `La cantidad en la fila ${fila} debe ser mayor a 0.` };
      }
    }

    return { esValido: true };
  };

  return {
    productos,
    totalBoleta,
    subtotalBoleta,
    agregarProducto,
    eliminarProducto,
    actualizarProductoCampo,
    limpiarProductos,
    validarProductos 
  };
};