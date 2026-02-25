import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from '../login/Login';
import { Registro } from '../Registro/Registro';
import './AuthPage.scss';

// Definir tipo para los refs de los componentes hijos
export interface FormRef {
  resetForm: () => void;
}

export const AuthPage: React.FC = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const navigate = useNavigate();
  
  // Refs para acceder a los métodos de los componentes hijos
  const loginRef = useRef<FormRef>(null);
  const registroRef = useRef<FormRef>(null);

  const showSignUp = () => {
    setIsRightPanelActive(true);
    // Limpiar formulario de login al cambiar
    loginRef.current?.resetForm();
  };

  const showSignIn = () => {
    setIsRightPanelActive(false);
    // Limpiar formulario 
    registroRef.current?.resetForm();
  };

  const handleSuccess = () => {
    navigate('/panel');
  };

  return (
    <div className="auth-wrapper">
      <div className={`auth-container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
        
        {/* Contenedor de Registro */}
        <div className="form-container sign-up-container">
          <Registro ref={registroRef} onSuccess={handleSuccess} />
        </div>

        {/* Contenedor de Login */}
        <div className="form-container sign-in-container">
          <Login ref={loginRef} onSuccess={handleSuccess} />
        </div>

        {/* Overlay deslizante */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h2>¡Bienvenido de nuevo!</h2>
              <p>¿Ya tienes cuenta?</p>
              <button className="btn btn-outline-light mt-3" onClick={showSignIn}>
                Iniciar sesión
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h2>¡Hola!</h2>
              <p>¿Aún no tienes cuenta?</p>
              <button className="btn btn-outline-light mt-3" onClick={showSignUp}>
                Registrarse
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
