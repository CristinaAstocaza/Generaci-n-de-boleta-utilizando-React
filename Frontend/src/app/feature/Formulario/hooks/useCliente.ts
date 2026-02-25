import { useState } from 'react';
import { reniecService } from '../../../core/servicios/ReniecService';
import { sunatService } from '../../../core/servicios/SunatService';
import type { ClienteData, TipoDocumento } from '../types/formulario.types';

export const useCliente = () => {
  const [cliente, setCliente] = useState<ClienteData>({
    tipoDocumento: 'DNI',
    documento: '',
    nombres: '',
    apellidos: '',
    email: ''
  });

  const [cargandoDocumento, setCargandoDocumento] = useState(false);

  const cambiarTipoDocumento = (tipo: TipoDocumento) => {
    setCliente({
      tipoDocumento: tipo,
      documento: '',
      nombres: '',
      apellidos: '',
      email: ''
    });
  };

  const actualizarDocumento = (documento: string) => {
    setCliente(prev => ({ ...prev, documento }));
  };

  const actualizarEmail = (email: string) => {
    setCliente(prev => ({ ...prev, email }));
  };

  const buscarDocumento = async (): Promise<{ exito: boolean; mensaje: string }> => {
    const longitudEsperada = cliente.tipoDocumento === 'DNI' ? 8 : 11;

    if (cliente.documento.length !== longitudEsperada) {
      return {
        exito: false,
        mensaje: `Ingrese un ${cliente.tipoDocumento} válido de ${longitudEsperada} dígitos.`
      };
    }

    setCargandoDocumento(true);

    try {
      if (cliente.tipoDocumento === 'DNI') {
        const response = await reniecService.obtenerDatosPorDni(cliente.documento);

        if (response && response.data) {
          const nombres = response.data.nombres || '';
          const apellidoPaterno = response.data.apellido_paterno || '';
          const apellidoMaterno = response.data.apellido_materno || '';

          setCliente(prev => ({
            ...prev,
            nombres,
            apellidos: `${apellidoPaterno} ${apellidoMaterno}`.trim()
          }));
          return { exito: true, mensaje: 'Datos encontrados en RENIEC.' };
        } else {
          return { exito: false, mensaje: 'No se encontraron datos para este DNI.' };
        }
      } else {
        const response = await sunatService.obtenerDatosPorRuc(cliente.documento);

        if (response && response.data) {
          setCliente(prev => ({
            ...prev,
            nombres: response.data.nombre_o_razon_social || '',
            apellidos: '-'
          }));
          return { exito: true, mensaje: 'Datos encontrados en SUNAT.' };
        } else {
          return { exito: false, mensaje: 'No se encontraron datos para este RUC.' };
        }
      }
    } catch (error) {
      const errorMsg = error instanceof Error 
        ? error.message 
        : `Error al conectar con el servicio ${cliente.tipoDocumento}`;
      return { exito: false, mensaje: errorMsg };
    } finally {
      setCargandoDocumento(false);
    }
  };

  const limpiarCliente = () => {
    setCliente({
      tipoDocumento: 'DNI',
      documento: '',
      nombres: '',
      apellidos: '',
      email: ''
    });
  };

  return {
    cliente,
    cargandoDocumento,
    cambiarTipoDocumento,
    actualizarDocumento,
    actualizarEmail,
    buscarDocumento,
    limpiarCliente
  };
};