const API_URL = "http://localhost:3000/api";

export const apiClient = {
  profile: {
    async getUserProfile(userId) {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al obtener perfil");
      return res.json();
    },

    async createUserProfile(data) {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al crear perfil");
      return res.json();
    },

    async updateUserProfile(profileId, data) {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/profile/${profileId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al actualizar perfil");
      return res.json();
    },
  },
  auth: {
    async isAuthenticated() {
      const token = localStorage.getItem("token");
      if (!token) return false;
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return res.ok;
      } catch {
        return false;
      }
    },

    async me() {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al obtener usuario");
      return res.json();
    },

    logout() {
      localStorage.removeItem("token");
      window.location.href = "/";
    },

    redirectToLogin() {
      window.location.href = "/login";
    },
  },
};
