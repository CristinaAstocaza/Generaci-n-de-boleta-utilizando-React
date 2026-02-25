// ModalBoleta.tsx
import React from 'react';
import { useBoletaDetails } from './hooks/useBoletaDetails';
import { CurrencySelector } from './components/CurrencySelector';
import { BoletaHeader } from './components/BoletaHeader';
import { BoletaInfo } from './components/BoletaInfo';
import { BoletaTable } from './components/BoletaTable';
import { BoletaTotals } from './components/BoletaTotals';
import './ModalBoleta.scss'; 

interface ModalBoletaProps {
  boletaId: number | null;
  onClose: () => void;
}

export const ModalBoleta: React.FC<ModalBoletaProps> = ({ boletaId, onClose }) => {
  const { 
    boleta, 
    loading, 
    error, 
    monedaVista, 
    setMonedaVista, 
    tipoCambio, 
    formatearPrecio 
  } = useBoletaDetails(boletaId);

  if (!boletaId) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3">Cargando detalles...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger m-3">
            <i className="fas fa-exclamation-circle me-2"></i> {error}
            <button className="btn btn-danger mt-3 w-100" onClick={onClose}>Cerrar</button>
          </div>
        )}

        {boleta && !loading && (
          <div className="container invoice-box">
            <button className="close-button" onClick={onClose}>×</button>

            <CurrencySelector 
              monedaVista={monedaVista}
              setMonedaVista={setMonedaVista}
              tipoCambio={tipoCambio}
              disabled={loading}
            />

            <BoletaHeader idBoleta={boleta.idBoleta} />

            <BoletaInfo boleta={boleta} />

            <BoletaTable 
              detalles={boleta.detalles} 
              formatearPrecio={formatearPrecio}
            />

            <BoletaTotals 
              total={boleta.total}
              monedaVista={monedaVista}
              formatearPrecio={formatearPrecio}
              onPrint={() => window.print()}
              onClose={onClose}
            />
          </div>
        )}
      </div>
    </div>
  );
};
