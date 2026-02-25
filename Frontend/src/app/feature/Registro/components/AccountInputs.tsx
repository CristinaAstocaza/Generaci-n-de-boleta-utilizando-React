import React from 'react';
import type{ UseFormReturn } from 'react-hook-form';
import type { RegistroFormData } from '../hooks/useRegistro';

interface Props {
  form: UseFormReturn<RegistroFormData>;
  passwordVisible: boolean;
  togglePassword: () => void;
  disabled: boolean;
}

export const AccountInputs: React.FC<Props> = ({ form, passwordVisible, togglePassword, disabled }) => {
  const { register, formState: { errors } } = form;

  return (
    <>
      {/* Correo */}
      <div className="mb-3 w-100">
        <input
          type="email"
          placeholder="Correo electrónico"
          className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
          disabled={disabled}
          {...register('correo', {
            required: 'El correo es requerido',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Correo inválido'
            }
          })}
        />
        {errors.correo && <div className="text-danger small mt-1">{errors.correo.message}</div>}
      </div>

      {/* Contraseña */}
      <div className="mb-3 w-100">
        <div className="input-group">
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Contraseña"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            disabled={disabled}
            {...register('password', {
              required: 'Requerida',
              minLength: { value: 6, message: 'Mínimo 6 caracteres' }
            })}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={togglePassword}
          >
            <i className={`fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>
        {errors.password && <div className="text-danger small mt-1">{errors.password.message}</div>}
      </div>
    </>
  );
};