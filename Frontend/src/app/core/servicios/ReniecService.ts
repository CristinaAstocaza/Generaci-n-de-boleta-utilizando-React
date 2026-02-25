import axios from 'axios';

export interface ReniecResponse {
  success: boolean;
  data: {
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
  };
}

class ReniecService {
  private apiUrl = 'https://apiperu.dev/api/dni';
  private token = '732fb308c0370658a2db5b5ae05b8d1b8a4c42bcade0466b7d1db5a2bdf3fa8a';
  
  async obtenerDatosPorDni(dni: string): Promise<ReniecResponse> {
    try {
      const response = await axios.post<ReniecResponse>(
        this.apiUrl,
        { dni },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          }
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

