export interface DetalleRequest {
  nombreProducto: string;
  precioUnitario: number;
  cantidad: number;
}

/**
 * Request para crear boleta (checkout)
 */
export interface BoletaRequest {
  idUsuario?: number;
  cartItems: DetalleRequest[];
  total: number;
  subtotal: number;
  nombreCliente: string;
  documentoCliente: string;
  emailCliente: string;
}

/**
 * Respuesta genérica al crear boleta
 */
export interface BoletaResponse {
  success: boolean;
  mensaje: string;
  boletaId: number;
}

/**
 * Sub-DTO para los datos del usuario (vendedor)
 */
export interface UsuarioDTO {
  id: number;
  nombres: string;
  apellidos: string;
  numero_documento: string;
  email: string;
}

/**
 * Sub-DTO para DetalleBoleta (Respuesta)
 */
export interface DetalleBoletaDTO {
  idDetalle: number;
  producto: string;
  precio_unitario: number;
  cantidad: number;
  subtotal: number;
}

/**
 * Boleta completa con detalles (la estructura del backend)
 */
export interface BoletaDetailsResponse {
  idBoleta: number;
  idUsuario: number;
  fecha_creacion: string;
  total: number;
  detalles: DetalleBoletaDTO[];
  nombreCliente: string;
  documentoCliente: string;
  emailCliente: string;
  usuarioVendedor?: UsuarioDTO;
}

// Alias para la lista de boletas en la tabla
export type Boleta = BoletaDetailsResponse;