import { forwardRef, useImperativeHandle } from 'react';
import { useRegistro, type RegistroRef } from './hooks/useRegistro';
import { TypeSelector } from './components/TypeSelector';
import { SearchInput } from './components/SearchInput';
import { PersonalDataInputs } from './components/PersonalDataInputs';
import { AccountInputs } from './components/AccountInputs';
import './registro.scss';

interface RegistroProps {
  onSuccess: () => void;
}

// Exportamos la interfaz Ref para que el padre sepa qué puede llamar
export type { RegistroRef };

export const Registro = forwardRef<RegistroRef, RegistroProps>(({ onSuccess }, ref) => {
  
  // 1. Invocamos el Hook
  const {
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
  } = useRegistro(onSuccess);

  const { handleSubmit, formState: { isSubmitting } } = form;

  // 2. Conectamos la ref del padre con la función de reset del hook
  useImperativeHandle(ref, () => ({
    resetForm: resetFullForm
  }));

  return (
    <div className="registro-form-wrapper">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="registro-form">
        <h2 className="fw-bold text-primary mb-4">Crear cuenta</h2>

        {/* Mensajes Globales */}
        {errorMessage && <div className="alert alert-danger small py-2 mb-3">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success small py-2 mb-3">{successMessage}</div>}

        {/* Composición de componentes pequeños */}
        <TypeSelector 
          tipoDocumento={tipoDocumento} 
          onChange={cambiarTipoDocumento} 
          disabled={loading || isSubmitting} 
        />

        <SearchInput 
          form={form}
          tipoDocumento={tipoDocumento}
          loading={loading}
          onSearch={buscarDocumento}
          documentoValue={documentoValue}
        />

        <PersonalDataInputs 
          form={form} 
          tipoDocumento={tipoDocumento} 
        />

        <AccountInputs 
          form={form}
          passwordVisible={passwordVisible}
          togglePassword={() => setPasswordVisible(!passwordVisible)}
          disabled={isSubmitting}
        />

        {/* Botón */}
        <button
          className="btn btn-primary mt-3 w-100"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Registrando...
            </>
          ) : (
            'Registrarse'
          )}
        </button>
      </form>
    </div>
  );
});

Registro.displayName = 'Registro';