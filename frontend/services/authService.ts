const API_URL =
  (import.meta as any).env?.VITE_API_URL || "http://localhost:3000/api";

export const authService = {
  // Registrar nuevo usuario
  async register(userData: {
    name: string;
    email: string;
    password: string;
    age?: number;
    gender?: string;
    condition?: string;
    objective?: string;
  }) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al registrar usuario");
    }

    const data = await response.json();

    // Guardar token y usuario en localStorage
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  },

  // Iniciar sesión
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al iniciar sesión");
    }

    const data = await response.json();

    // Guardar token y usuario en localStorage
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  },

  // Cerrar sesión
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Obtener usuario actual desde localStorage
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  // Verificar si hay token
  isAuthenticated() {
    return !!localStorage.getItem("token");
  },

  // Obtener token
  getToken() {
    return localStorage.getItem("token");
  },
};
