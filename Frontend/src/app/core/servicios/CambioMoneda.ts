import axios from 'axios';

export interface TipoCambioResponse {
  success: boolean;
  data: {
    moneda: string;
    fecha_busqueda: string;
    fecha_sunat: string;
    venta: number;
    compra: number;
  };
}

class ServicioCambioMoneda {
  private apiUrl = "https://apiperu.dev/api/tipo_de_cambio";
  private token =
    "732fb308c0370658a2db5b5ae05b8d1b8a4c42bcade0466b7d1db5a2bdf3fa8a";

  // Fecha y tipo de cambio fijos para usar en expo
  private fechaFija = "2025-11-21";
  private tipoCambioFijo = 3.385;

  /** Obtener tipo de cambio desde la API (solo si quieres usarlo en vivo) */
  async obtenerTipoCambio(): Promise<TipoCambioResponse | null> {
    try {
      const response = await axios.get<TipoCambioResponse>(
        `${this.apiUrl}?fecha=${this.fechaFija}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error al obtener tipo de cambio:", error);
      return null;
    }
  }

  /** Obtener tipo de cambio fijo (sincrónico, para usar en React sin efectos) */
  obtenerTipoCambioFijo(): number {
    return this.tipoCambioFijo;
  }

  /** Convertir Soles → Dólares usando API */
  async convertirSolesADolares(montoSoles: number): Promise<number> {
    const tipoCambio = await this.obtenerTipoCambio();
    if (!tipoCambio) throw new Error("No se pudo obtener tipo de cambio");

    return montoSoles / tipoCambio.data.venta;
  }

  /** Convertir Dólares → Soles usando API */
  async convertirDolaresASoles(montoDolares: number): Promise<number> {
    const tipoCambio = await this.obtenerTipoCambio();
    if (!tipoCambio) throw new Error("No se pudo obtener tipo de cambio");

    return montoDolares * tipoCambio.data.compra;
  }

  /** Conversión manual (sin usar API) */
  convertirMonto(
    monto: number,
    tipoCambio: number,
    monedaOrigen: "PEN" | "USD",
    monedaDestino: "PEN" | "USD"
  ): number {
    if (monedaOrigen === monedaDestino) return monto;

    return monedaOrigen === "PEN"
      ? monto / tipoCambio // Soles → Dólares
      : monto * tipoCambio; // Dólares → Soles
  }

  /** Formatear precio en Soles */
  formatearSoles(monto: number): string {
    return `S/ ${monto.toFixed(2)}`;
  }

  /** Formatear precio en Dólares */
  formatearDolares(monto: number): string {
    return `$ ${monto.toFixed(2)}`;
  }

  /** Formatear precio según moneda */
  formatearPrecio(monto: number, moneda: "PEN" | "USD"): string {
    return moneda === "PEN"
      ? this.formatearSoles(monto)
      : this.formatearDolares(monto);
  }
}

export const servicioCambioMoneda = new ServicioCambioMoneda();
