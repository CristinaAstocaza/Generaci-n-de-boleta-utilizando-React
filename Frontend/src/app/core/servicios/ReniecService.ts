import axios from 'axios';
import { API_PERU_BASE_URL, getApiPeruHeaders } from './ApiPeruConfig';

export interface ReniecResponse {
  success: boolean;
  data: {
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
  };
}

class ReniecService {
  private apiUrl = `${API_PERU_BASE_URL}/dni`;
  
  async obtenerDatosPorDni(dni: string): Promise<ReniecResponse> {
    try {
      const response = await axios.post<ReniecResponse>(
        this.apiUrl,
        { dni },
        {
          headers: getApiPeruHeaders()
        }
      );
      return response.data;
    } catch (error) {
      console.error(' Error en RENIEC:', error);
      throw new Error('No se encontró información del DNI');
    }
  }
}

export const reniecService = new ReniecService();

