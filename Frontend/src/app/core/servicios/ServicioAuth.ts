import axios from '../interceptors/axiosInterceptor';
import  { AxiosError } from 'axios';
import type{
  AuthResponse,
  UserData,
  RegistroRequest,
  LoginCredentials
} from '../models/Autenticacion.models';

const API_URL = 'http://68.220.169.108:8080/api/usuarios';

class AuthService {
  private currentUser: UserData | null = null;
  private redirectUrl: string | null = null;

  constructor() {
    this.currentUser = this.getUserFromStorage();
    this.verifyTokenOnInit();
  }

  /* Verificar token al iniciar la aplicación */
  private async verifyTokenOnInit(): Promise<void> {
    const token = this.getToken();
    if (token) {
      try {
        await this.verificarToken();
        console.log('  Token válido');
      } catch (error: unknown) { 
        console.warn(' Token inválido, limpiando sesión');
  
        this.cerrarSession();
      }
    }
  }

  /* Obtener usuario y token desde localStorageb*/
  private getUserFromStorage(): UserData | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  } 
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }


  isAuthenticated(): boolean {
    return !!this.getToken();
  }


  getCurrentUser(): UserData | null {
    return this.currentUser;
  }

  /* REGISTRO */
  async register(registerData: RegistroRequest): Promise<AuthResponse> {
    console.log(' Registrando usuario...');

    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/registro`, registerData);
      console.log('✅ Usuario registrado:', response.data);
      this.saveAuthData(response.data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /*LOGINn*/
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log(' Iniciando sesión...');

    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/login`, credentials);
      console.log(' Login exitoso:', response.data);
      this.saveAuthData(response.data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /* SALIR */
  logout(): void {
    console.log('🚪 Cerrando sesión...');
    this.cerrarSession();
  }

  /*VERIFICAR TOKENN*/
  async verificarToken(): Promise<AuthResponse> {
    const token = this.getToken();

    if (!token) {
      throw new Error('No hay token');
    }

    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/verificar-token`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log('✅ Token válido');
      this.updateUserData(response.data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /* REFRESCAR TOKEN */
  async refrescarToken(): Promise<AuthResponse> {
    const token = this.getToken();

    if (!token) {
      throw new Error('No hay token');
    }

    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/refrescar-token`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log('🔄 Token refrescado');
      this.saveAuthData(response.data); //aqui se guarda el nuevo token
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /* VERIFICAR EMAIL DISPONIBLE */
  async verificarEmailDisponible(email: string): Promise<boolean> {
    try {
      const response = await axios.get<{ disponible: boolean }>(
        `${API_URL}/verificar-email/${email}`
      );
      return response.data.disponible;
    } catch (error) {
      console.warn(' Email no disponible:', error);
      throw new Error('El email ya se encuentra registrado');
    }
  }

  /* Guardar datos de autenticación */
  private saveAuthData(response: AuthResponse): void {
    localStorage.setItem('authToken', response.token);

    const userData: UserData = {
      idUsuario: response.idUsuario,
      email: response.email,
      nombreCompleto: response.nombreCompleto,
      documento: response.documento
    };

    localStorage.setItem('currentUser', JSON.stringify(userData));
    this.currentUser = userData;

    console.log(' Datos guardados en localStorage');
  }

  /* Actualizar datos del usuario */
  private updateUserData(response: AuthResponse): void {
    const userData: UserData = {
      idUsuario: response.idUsuario,
      email: response.email,
      nombreCompleto: response.nombreCompleto,
      documento: response.documento
    };

    localStorage.setItem('currentUser', JSON.stringify(userData));
    this.currentUser = userData;
  }

  /* Limpiar sesión*/
  private cerrarSession(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    console.log(' Sesión limpiada');
  }

  /* Manejo de errores */
  private handleError(error: unknown): Error { 
    console.error('❌ Error en AuthService:', error);

    let errorMessage = 'Ocurrió un error';

    
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const responseData = axiosError.response?.data as { mensaje?: string, message?: string };

        if (responseData.mensaje) {
            errorMessage = responseData.mensaje;
        } else if (responseData.message) {
            errorMessage = responseData.message;
        } else if (axiosError.message) {
           
            errorMessage = axiosError.message;
        }
    } 
  
    else if (error instanceof Error) {
        errorMessage = error.message;
    }

    else {
        errorMessage = String(error);
    }


    return new Error(errorMessage);
  }


  /* Establecer URL de redirección*/
  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  /* Obtener y limpiar URL de redirección*/
  getAndClearRedirectUrl(): string | null {
    const url = this.redirectUrl;
    this.redirectUrl = null;
    return url;
  }
}

export const authService = new AuthService();

