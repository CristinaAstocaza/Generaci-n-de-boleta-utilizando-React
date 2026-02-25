export type TipoDocumento = 'DNI' | 'RUC';
export type TipoMoneda = 'PEN' | 'USD';

export interface ClienteData {
  tipoDocumento: TipoDocumento;
  documento: string;
  nombres: string;
  apellidos: string;
  email: string;
}

export interface ProductoItem {
  nombreProducto: string;
  precioUnitario: number;
  cantidad: number;
}

export interface MensajesState {
  error: string;
  exito: string;
}