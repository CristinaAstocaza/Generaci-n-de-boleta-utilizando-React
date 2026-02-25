import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../../core/servicios/ServicioAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/* Es para guardas las rutas que necesitan ser validadas*/
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();

  if (authService.isAuthenticated()) {
    console.log('Usuario autenticado, acceso permitido');
    return <>{children}</>;
  }

  console.warn(' Usuario no autenticado, redirigiendo a login..');
  //Por si acaso se guarda a la url donde se intentaba dirigir
  authService.setRedirectUrl(location.pathname);
  return <Navigate to="/autenticacion" replace />;
};


/* Estas URL son publicas osea no necesita registrarse para ingresar*/
export const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!authService.isAuthenticated()) {
    return <>{children}</>;
  }

  console.log('Usuario ya autenticado, redirigiendo a dashboard');
  return <Navigate to="/dashboard" replace />;
};