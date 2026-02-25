import React from 'react';

interface Props {
  idBoleta: number;
}

export const BoletaHeader: React.FC<Props> = ({ idBoleta }) => {
  return (
    <div className="row mb-3">
      <div className="col-6 d-flex align-items-center">
        <img
          src="https://i.ibb.co/L8B8Y2M/ikaza-logo.png"
          alt="Logo"
          className="logo-empresa"
        />
        <span className="logo-text">MiFactura</span>
      </div>
      <div className="col-6 text-end header-box">
        <h5 className="mb-1">RUC 10715528407</h5>
        <h6 className="mb-0">Boleta de Venta</h6>
        <h5 className="fw-bold text-success">BOLETA #{idBoleta}</h5>
      </div>
    </div>
  );
};