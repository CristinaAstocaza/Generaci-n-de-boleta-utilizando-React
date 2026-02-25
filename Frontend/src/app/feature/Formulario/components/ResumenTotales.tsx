import React, { useState } from "react";
import { servicioCambioMoneda } from "../../../core/servicios/CambioMoneda";
import type { TipoMoneda } from "../types/formulario.types";

interface ResumenTotalesProps {
  totalBoleta: number;
  moneda: TipoMoneda;
}

export const ResumenTotales: React.FC<ResumenTotalesProps> = ({
  totalBoleta,
  moneda,
}) => {
  // Inicializamos el tipo de cambio con el valor fijo
  const [tipoCambio] = useState<number>(servicioCambioMoneda.obtenerTipoCambioFijo());

  // Convertir monto
  const obtenerTotalEnMoneda = (monto: number, monedaDestino: TipoMoneda): string => {
    const montoConvertido = servicioCambioMoneda.convertirMonto(
      monto,
      tipoCambio,
      moneda,
      monedaDestino
    );

    return servicioCambioMoneda.formatearPrecio(montoConvertido, monedaDestino);
  };

  return (
    <div className="row text-center mb-4">
      <div className="col-6">
        <strong className="d-block mb-1">Total en Soles:</strong>
        <div
          className={`fs-5 fw-bold ${
            moneda === "PEN" ? "text-primary" : "text-muted"
          }`}
        >
          {obtenerTotalEnMoneda(totalBoleta, "PEN")}
        </div>
      </div>

      <div className="col-6">
        <strong className="d-block mb-1">Total en Dólares:</strong>
        <div
          className={`fs-5 fw-bold ${
            moneda === "USD" ? "text-primary" : "text-muted"
          }`}
        >
          {obtenerTotalEnMoneda(totalBoleta, "USD")}
        </div>
      </div>
    </div>
  );
};
