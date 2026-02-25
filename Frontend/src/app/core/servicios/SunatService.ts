import axios from "axios";

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
  private apiUrl = 'https://apiperu.dev/api/ruc';
  private token = '732fb308c0370658a2db5b5ae05b8d1b8a4c42bcade0466b7d1db5a2bdf3fa8a';

  async obtenerDatosPorRuc(ruc: string): Promise<SunatResponse> {
    try {
      const response = await axios.post<SunatResponse>(
        this.apiUrl,
        { ruc },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          }
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