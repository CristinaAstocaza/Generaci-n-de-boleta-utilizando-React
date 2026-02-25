import axios from '../interceptors/axiosInterceptor';
import  { AxiosError } from 'axios';
import type{
  BoletaRequest,
  BoletaResponse,
  Boleta,
  DetalleBoletaDTO,
  BoletaDetailsResponse
} from '../models/Boleta.models';

const API_URL = 'http://68.220.169.108:8080/api/boletas';

class ServicioBoleta {
  /* Crear boletab*/
  async crearBoleta(request: BoletaRequest): Promise<BoletaResponse> {
    console.log(' Creando boleta con', request.cartItems.length, 'items');

    try {
      const response = await axios.post<BoletaResponse>(API_URL, request);
      console.log(' Boleta creada:', response.data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /* Obtener mis boletas */
  async obtenerMisBoletas(): Promise<Boleta[]> {
    console.log(' Obteniendo mis boletas...');

    try {
      const response = await axios.get<Boleta[]>(API_URL);
      console.log(` ${response.data.length} boletas obtenidas`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /* Obtener boletas ordenadas */
  async obtenerMisBoletasOrdenadas(): Promise<Boleta[]> {
    console.log(' Obteniendo boletas ordenadas...');

    try {
      const response = await axios.get<Boleta[]>(`${API_URL}/ordenadas`);
      console.log(` ${response.data.length} boletas obtenidas`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /*  Obtener boleta por ID */
  async obtenerBoletaPorId(idBoleta: number): Promise<BoletaDetailsResponse> {
    console.log(' Obteniendo boleta ID:', idBoleta);

    try {
      const response = await axios.get<BoletaDetailsResponse>(`${API_URL}/${idBoleta}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /* Obtener detalles de boleta */
  async obtenerDetallesBoleta(idBoleta: number): Promise<DetalleBoletaDTO[]> {
    console.log('🔍 Obteniendo detalles de boleta ID:', idBoleta);

    try {
      const response = await axios.get<DetalleBoletaDTO[]>(`${API_URL}/${idBoleta}/detalles`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /* Formatear precio */
  formatearPrecio(precio: number): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(precio);
  }

  /*Formatear fecha */
  formatearFecha(fecha: string): string {
    const dateString = fecha.replace(' ', 'T').substring(0, 19);
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      console.warn(' Fecha inválida:', fecha);
      return 'Fecha inválida';
    }

    const fechaParte = date.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    const horaParte = date.toLocaleTimeString('es-PE', {
      hour: '2-digit',
      hour12: true
    });

    const match = horaParte.match(/(\d+)\s*([ap]\.\s*m\.)/i);

    if (match) {
      const horaSinMinutos = `${match[1]} ${match[2]}`.toUpperCase().replace(/\./g, '');
      return `${fechaParte} ${horaSinMinutos}`;
    }

    return `${fechaParte} ${horaParte.split(':')[0]} ${horaParte.split(' ')[1]}`;
  }

  /*Manejo de errores*/
private handleError(error: unknown): Error {
    console.error(' Error en BoletaService:', error);

    let errorMessage = 'Ocurrió un error al procesar la solicitud';

    // CON EL AXIOS NOS PERMITE INDENTIFICAR LOS ERRORES
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const status = axiosError.response?.status;
        const responseData = axiosError.response?.data as { mensaje?: string, message?: string };

        
        if (responseData.mensaje) {
            errorMessage = responseData.mensaje;
        } else if (responseData.message) {
            errorMessage = responseData.message;
        } else if (axiosError.message) {
            errorMessage = axiosError.message;
        }

        // Errores específicos
        if (status === 401) {
            errorMessage = 'No tienes autorización. Por favor, inicia sesión nuevamente';
        } else if (status === 404) {
            errorMessage = 'Recurso no encontrado';
        } else if (status === 500) {
            errorMessage = 'Error del servidor. Intenta nuevamente más tarde';
        }
    } 
    // Si no es un AxiosError, manejamos como Error estándar 
    else if (error instanceof Error) {
        errorMessage = error.message;
    } else {
        errorMessage = String(error);
    }

    return new Error(errorMessage);
}
}

export const servicioBoleta = new ServicioBoleta();
