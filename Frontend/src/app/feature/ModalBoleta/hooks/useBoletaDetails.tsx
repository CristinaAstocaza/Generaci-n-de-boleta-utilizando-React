// features/boleta/hooks/useBoletaDetails.ts
import { useState, useEffect } from 'react';
import { servicioBoleta } from '../../../core/servicios/ServicioBoleta';
import { servicioCambioMoneda } from '../../../core/servicios/CambioMoneda';
import type { BoletaDetailsResponse } from '../../../core/models/Boleta.models';

export const useBoletaDetails = (boletaId: number | null) => {
  const [boleta, setBoleta] = useState<BoletaDetailsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [monedaVista, setMonedaVista] = useState<'PEN' | 'USD'>('PEN');
  const [tipoCambio, setTipoCambio] = useState<number>(servicioCambioMoneda.obtenerTipoCambioFijo());

  useEffect(() => {
    if (boletaId !== null) {
      cargarDatos(boletaId);
    } else {
      limpiarDatos();
    }
  }, [boletaId]);

  const cargarDatos = async (id: number) => {
    setLoading(true);
    try {
      const [resBoleta, resCambio] = await Promise.all([
        servicioBoleta.obtenerBoletaPorId(id),
        servicioCambioMoneda.obtenerTipoCambio()
      ]);

      setBoleta(resBoleta);
      // Si la API devuelve null, usamos el tipo de cambio fijo
      const nuevoTipoCambio = resCambio?.data?.venta ?? servicioCambioMoneda.obtenerTipoCambioFijo();
      setTipoCambio(nuevoTipoCambio);
    } catch (error) {
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const limpiarDatos = () => {
    setBoleta(null);
    setError(null);
    setMonedaVista('PEN');
    setTipoCambio(servicioCambioMoneda.obtenerTipoCambioFijo());
  };

  const formatearPrecio = (precio: number) => {
    if (!tipoCambio) return precio.toString();
    const precioConvertido = servicioCambioMoneda.convertirMonto(precio, tipoCambio, 'PEN', monedaVista);
    return servicioCambioMoneda.formatearPrecio(precioConvertido, monedaVista);
  };

  return {
    boleta,
    loading,
    error,
    monedaVista,
    setMonedaVista,
    tipoCambio,
    formatearPrecio
  };
};
