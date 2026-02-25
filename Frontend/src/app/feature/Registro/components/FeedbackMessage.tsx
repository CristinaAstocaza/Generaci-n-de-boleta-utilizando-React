import React from 'react';

interface Props {
  errorMessage?: string;
  successMessage?: string;
}

export const FeedbackMessage: React.FC<Props> = ({ errorMessage, successMessage }) => {
  // Si no hay mensajes, no renderizamos nada para no ocupar espacio
  if (!errorMessage && !successMessage) return null;

  return (
    <div className="w-100 mb-3">
      {errorMessage && (
        <div className="alert alert-danger small py-2 mb-2 d-flex align-items-center" role="alert">
          <i className="fas fa-exclamation-circle me-2"></i>
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success small py-2 mb-2 d-flex align-items-center" role="alert">
          <i className="fas fa-check-circle me-2"></i>
          <span>{successMessage}</span>
        </div>
      )}
    </div>
  );
};