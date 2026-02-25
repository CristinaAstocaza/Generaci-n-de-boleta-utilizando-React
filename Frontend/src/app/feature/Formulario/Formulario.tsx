import React, { useState } from 'react';
import { servicioCambioMoneda } from '../../core/servicios/CambioMoneda';
import { useCliente } from './hooks/useCliente';
import { useProductos } from './hooks/useProductos';
import { useBoleta } from './hooks/useBoleta';
import { SeccionCliente } from './components/SeccionCliente';
import { SeccionMoneda } from './components/SeccionMoneda';
import { TablaProductos } from './components/TablaProductos';
import { ResumenTotales } from './components/ResumenTotales';
import type { TipoMoneda } from './types/formulario.types';
import './Formulario.scss';

export const Formulario: React.FC = () => {
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [moneda, setMoneda] = useState<TipoMoneda>('PEN');

  // Usamos tipo de cambio fijo del servicio
  const tipoCambio = servicioCambioMoneda.obtenerTipoCambioFijo();

  // Custom hooks
  const {
    cliente,
    cargandoDocumento,
    cambiarTipoDocumento,
    actualizarDocumento,
    actualizarEmail,
    buscarDocumento,
    limpiarCliente
  } = useCliente();

  const {
    productos,
    totalBoleta,
    subtotalBoleta,
    agregarProducto,
    eliminarProducto,
    actualizarProductoCampo,
    limpiarProductos
  } = useProductos();

  const { cargandoBoleta, crearBoleta } = useBoleta();

  const limpiarMensajes = () => {
    setMensajeError('');
    setMensajeExito('');
  };

  const handleBuscarDocumento = async () => {
    limpiarMensajes();
    const resultado = await buscarDocumento();
    
    if (resultado.exito) {
      setMensajeExito(resultado.mensaje);
    } else {
      setMensajeError(resultado.mensaje);
    }
  };

  const handleCambiarTipoDocumento = (tipo: 'DNI' | 'RUC') => {
    cambiarTipoDocumento(tipo);
    limpiarMensajes();
  };

  const handleCrearBoleta = async () => {
    limpiarMensajes();

    const resultado = await crearBoleta({
      cliente,
      productos,
      totalBoleta,
      subtotalBoleta,
      moneda,
      tipoCambio
    });

    if (resultado.exito) {
      setMensajeExito(resultado.mensaje);
      limpiarFormulario();
    } else {
      setMensajeError(resultado.mensaje);
    }
  };

  const limpiarFormulario = () => {
    limpiarCliente();
    limpiarProductos();
  };

  return (
    <div className="container mt-5">
      <h2>Crear Nueva Boleta de Venta</h2>
      <hr />

      {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}
      {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}

      {/* Datos del Cliente */}
      <SeccionCliente
        cliente={cliente}
        cargandoDocumento={cargandoDocumento}
        onCambiarTipoDocumento={handleCambiarTipoDocumento}
        onActualizarDocumento={actualizarDocumento}
        onActualizarEmail={actualizarEmail}
        onBuscarDocumento={handleBuscarDocumento}
      />

      {/* Selector de Moneda */}
      <SeccionMoneda
        moneda={moneda}
        tipoCambio={tipoCambio}
        onCambiarMoneda={setMoneda}
      />

      {/* Productos */}
      <TablaProductos
        productos={productos}
        moneda={moneda}
        onAgregarProducto={agregarProducto}
        onEliminarProducto={eliminarProducto}
        onActualizarCampo={actualizarProductoCampo}
      />

      {/* Resumen de Totales */}
      <ResumenTotales
        totalBoleta={totalBoleta}
        moneda={moneda}
      />

      {/* Botón Crear Boleta */}
      <button
        className="btn btn-primary w-100 btn-lg"
        onClick={handleCrearBoleta}
        disabled={cargandoBoleta || totalBoleta <= 0 || !cliente.documento}
      >
        {cargandoBoleta ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" />
            Procesando...
          </>
        ) : (
          <>
            <i className="fas fa-file-invoice me-2"></i>
            Crear Boleta
          </>
        )}
      </button>
    </div>
  );
};
