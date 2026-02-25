import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../core/servicios/ServicioAuth';
import { reniecService } from '../../../core/servicios/ReniecService';
import { sunatService } from '../../../core/servicios/SunatService';
import type { RegistroRequest } from '../../../core/models/Autenticacion.models';


export interface RegistroRef {
  resetForm: () => void;
}
export interface RegistroFormData {
  documento: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  password: string;
}

export type TipoDocumento = 'DNI' | 'RUC';

export const useRegistro = (onSuccess: () => void) => {
  const navigate = useNavigate();
  const [tipoDocumento, setTipoDocumento] = useState<TipoDocumento>('DNI');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const form = useForm<RegistroFormData>({
    mode: 'onBlur',
    defaultValues: {
      documento: '', nombres: '', apellidoPaterno: '', 
      apellidoMaterno: '', correo: '', password: ''
    }
  });

  const { setValue, watch, reset } = form;
  const documentoValue = watch('documento');

  // --- Acciones ---

  const cambiarTipoDocumento = (tipo: TipoDocumento) => {
    setTipoDocumento(tipo);
    setValue('documento', '');
    setValue('nombres', '');
    setValue('apellidoPaterno', '');
    setValue('apellidoMaterno', '');
    setErrorMessage('');
    setSuccessMessage('');
  };

  const buscarDocumento = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    const longitudEsperada = tipoDocumento === 'DNI' ? 8 : 11;

    if (documentoValue.length !== longitudEsperada) {
      setErrorMessage(`Ingrese un ${tipoDocumento} válido de ${longitudEsperada} dígitos`);
      return;
    }

    setLoading(true);
    try {
      if (tipoDocumento === 'DNI') {
        const response = await reniecService.obtenerDatosPorDni(documentoValue);
        if (response?.data) {
          setValue('nombres', response.data.nombres || '');
          setValue('apellidoPaterno', response.data.apellido_paterno || '');
          setValue('apellidoMaterno', response.data.apellido_materno || '');
          setSuccessMessage('Datos encontrados en RENIEC');
        } else {
          setErrorMessage('No se encontraron datos para este DNI');
        }
      } else {
        const response = await sunatService.obtenerDatosPorRuc(documentoValue);
        if (response?.data) {
          setValue('nombres', response.data.nombre_o_razon_social || '');
          setValue('apellidoPaterno', '-'); // Backend requirement
          setValue('apellidoMaterno', '-');
          setSuccessMessage('Datos encontrados en SUNAT');
        } else {
          setErrorMessage('No se encontraron datos para este RUC');
        }
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : `Error al buscar ${tipoDocumento}`;
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: RegistroFormData) => {
    setErrorMessage('');
    setSuccessMessage('');

    const longitudEsperada = tipoDocumento === 'DNI' ? 8 : 11;
    if (data.documento.length === longitudEsperada && !data.nombres) {
      setErrorMessage(`Por favor busque primero los datos del ${tipoDocumento}`);
      return;
    }

    try {
      const registroData: RegistroRequest = {
        email: data.correo,
        password: data.password,
        nombres: data.nombres,
        apellidos: tipoDocumento === 'DNI' 
          ? `${data.apellidoPaterno} ${data.apellidoMaterno}`.trim()
          : `${data.apellidoPaterno} ${data.apellidoMaterno}`.trim(),
        numeroDocumento: data.documento
      };

      await authService.register(registroData);
      setSuccessMessage('Usuario registrado exitosamente');

      setTimeout(() => {
        navigate('/dashboard');
        onSuccess();
      }, 1500);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Error al registrar');
    }
  };

  const resetFullForm = () => {
    reset();
    setErrorMessage('');
    setSuccessMessage('');
    setPasswordVisible(false);
    setTipoDocumento('DNI');
  };

  return {
    form,
    tipoDocumento,
    loading,
    passwordVisible,
    setPasswordVisible,
    errorMessage,
    successMessage,
    cambiarTipoDocumento,
    buscarDocumento,
    onSubmit,
    resetFullForm,
    documentoValue
  };
};