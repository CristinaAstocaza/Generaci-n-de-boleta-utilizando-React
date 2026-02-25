import React from 'react';
import type{ UseFormReturn } from 'react-hook-form';
import type { RegistroFormData, TipoDocumento } from '../hooks/useRegistro';

interface Props {
  form: UseFormReturn<RegistroFormData>;
  tipoDocumento: TipoDocumento;
}

export const PersonalDataInputs: React.FC<Props> = ({ form, tipoDocumento }) => {
  const { register } = form;

  return (
    <>
      <input
        type="text"
        placeholder={tipoDocumento === 'DNI' ? 'Nombres' : 'Razón Social'}
        className="form-control mb-2"
        readOnly
        {...register('nombres')}
      />

      {tipoDocumento === 'DNI' ? (
        <>
          <input
            type="text"
            placeholder="Apellido Paterno"
            className="form-control mb-2"
            readOnly
            {...register('apellidoPaterno')}
          />
          <input
            type="text"
            placeholder="Apellido Materno"
            className="form-control mb-2"
            readOnly
            {...register('apellidoMaterno')}
          />
        </>
      ) : (
        /* Campos ocultos requeridos por el backend para RUC */
        <>
          <input type="hidden" {...register('apellidoPaterno')} />
          <input type="hidden" {...register('apellidoMaterno')} />
        </>
      )}
    </>
  );
};