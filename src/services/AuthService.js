// src/services/AuthService.js
import axios from 'axios';

class AuthService {
  constructor() {
    this.apiUrl = 'http://localhost:8080/api/v1';  // URL del backend
  }

  // Método para hacer login
  async login(username, password) {  // Cambiado 'email' a 'username'
    const credentials = btoa(`${username}:${password}`); // Codifica en Base64
    try {
      const response = await axios.post(
        `${this.apiUrl}/login`,
        {}, // No se necesita enviar cuerpo, solo encabezados
        {
          headers: {
            'Authorization': `Basic ${credentials}`,  // Autenticación básica
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Para enviar cookies si es necesario
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  // Método para registro
  async register(user) {
    try {
      const response = await axios.post(
        `${this.apiUrl}/register`,
        user, // Envía los datos del registro
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }
}

export default new AuthService();