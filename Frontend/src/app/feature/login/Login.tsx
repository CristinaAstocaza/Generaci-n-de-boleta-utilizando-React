import  { useState, forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../core/servicios/ServicioAuth';
import    type {LoginCredentials } from '../../core/models/Autenticacion.models';
import './Login.scss';

interface LoginProps {
  onSuccess: () => void;
}

interface LoginFormData {
  usuarioLogin: string;
  passwordLogin: string;
}

export interface LoginRef {
  resetForm: () => void;
}

export const Login = forwardRef<LoginRef, LoginProps>(({ onSuccess }, ref) => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    mode: 'onBlur',
    defaultValues: {
      usuarioLogin: '',
      passwordLogin: ''
    }
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      reset();
      setErrorMessage('');
      setSuccessMessage('');
    }
  }));

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const credentials: LoginCredentials = {
        email: data.usuarioLogin,
        password: data.passwordLogin
      };

      await authService.login(credentials);
      setSuccessMessage('Login exitoso');
      
      setTimeout(() => {
        // Obtener URL guardada o ir a dashboard por defecto
        const redirectUrl = authService.getAndClearRedirectUrl();
        navigate(redirectUrl || '/dashboard');
        onSuccess();
      }, 1000);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Credenciales inválidas';
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div className="login-form-wrapper">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="login-form">
        <h2 className="fw-bold text-success mb-4">Iniciar sesión</h2>

        {errorMessage && (
          <div className="alert alert-danger small py-2 mb-3">
            {errorMessage}
          </div>
        )}
        
        {successMessage && (
          <div className="alert alert-success small py-2 mb-3">
            {successMessage}
          </div>
        )}

        <div className="mb-3">
          <input
            type="email"
            placeholder="Correo electrónico"
            className={`form-control ${errors.usuarioLogin ? 'is-invalid' : ''}`}
            disabled={isSubmitting}
            {...register('usuarioLogin', {
              required: 'El correo es requerido',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Debe ingresar un correo válido'
              }
            })}
          />
          {errors.usuarioLogin && (
            <div className="text-danger small mt-1">
              {errors.usuarioLogin.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="Contraseña"
            className={`form-control ${errors.passwordLogin ? 'is-invalid' : ''}`}
            disabled={isSubmitting}
            {...register('passwordLogin', {
              required: 'La contraseña es requerida',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener mínimo 6 caracteres'
              }
            })}
          />
          {errors.passwordLogin && (
            <div className="text-danger small mt-1">
              {errors.passwordLogin.message}
            </div>
          )}
        </div>

        <button 
          className="btn btn-success mt-3 w-100" 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
});

Login.displayName = 'Login';