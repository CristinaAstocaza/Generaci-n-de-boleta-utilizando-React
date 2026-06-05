import axios from "axios";
import { API_PERU_BASE_URL, getApiPeruHeaders } from './ApiPeruConfig';

export interface SunatResponse {
  success: boolean;
  data: {
    ruc: string;
    nombre_o_razon_social: string;
    direccion: string;
    estado: string;
    condicion: string;
  };
}

class SunatService {
  private apiUrl = `${API_PERU_BASE_URL}/ruc`;

  async obtenerDatosPorRuc(ruc: string): Promise<SunatResponse> {
    try {
      const response = await axios.post<SunatResponse>(
        this.apiUrl,
        { ruc },
        {
          headers: getApiPeruHeaders()
        }
      );
      return response.data;
    } catch (error) {
      console.error('❌ Error en SUNAT:', error);
      throw new Error('No se encontró información del RUC');
    }
  }
}

export const sunatService = new SunatService();
