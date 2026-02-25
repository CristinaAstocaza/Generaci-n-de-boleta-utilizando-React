import React from 'react';
import type{ UseFormReturn } from 'react-hook-form';
import type { RegistroFormData, TipoDocumento } from '../hooks/useRegistro';

interface Props {
  form: UseFormReturn<RegistroFormData>;
  tipoDocumento: TipoDocumento;
  loading: boolean;
  onSearch: () => void;
  documentoValue: string;
}

export const SearchInput: React.FC<Props> = ({ form, tipoDocumento, loading, onSearch, documentoValue }) => {
  const { register, formState: { errors, isSubmitting } } = form;
  const longitud = tipoDocumento === 'DNI' ? 8 : 11;

  return (
    <div className="mb-3 w-100">
      <div className="input-group">
        <input
          type="text"
          placeholder={tipoDocumento === 'DNI' ? 'DNI (8 dígitos)' : 'RUC (11 dígitos)'}
          maxLength={longitud}
          className={`form-control ${errors.documento ? 'is-invalid' : ''}`}
          disabled={loading || isSubmitting}
          {...register('documento', {
            required: `El ${tipoDocumento} es requerido`,
            minLength: { value: longitud, message: `${longitud} dígitos requeridos` },
            maxLength: { value: longitud, message: `${longitud} dígitos requeridos` },
            pattern: { value: /^[0-9]+$/, message: 'Solo números' }
          })}
        />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onSearch}
          disabled={loading || isSubmitting || documentoValue.length !== longitud}
        >
          {loading ? (
            <><span className="spinner-border spinner-border-sm me-2" />Buscando...</>
          ) : (
            <><i className="fas fa-search me-2"></i>Buscar</>
          )}
        </button>
      </div>
      {errors.documento && <div className="text-danger small mt-1">{errors.documento.message}</div>}
    </div>
  );
};