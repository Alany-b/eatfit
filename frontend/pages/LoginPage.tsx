import React, { useState } from "react";
import type { User } from "../types";
import { Footer } from "../components/Footer";
import { authService } from "../services/authService";

interface LoginPageProps {
  onLogin: (user: User) => void;
  onNavigateToRegister: () => void;
}

const inputStyles =
  "bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 placeholder-gray-400";
const labelStyles = "block mb-2 text-sm font-medium text-gray-300";

export const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  onNavigateToRegister,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await authService.login(
        formData.email,
        formData.password
      );

      const user: User = {
        name: response.user.name,
        email: response.user.email,
        age: response.user.age,
        gender: response.user.gender,
        condition: response.user.condition,
        objective: response.user.objective,
      };

      onLogin(user);
    } catch (err: any) {
      console.error("Error al iniciar sesión:", err);
      setError(
        err.message ||
          "Error al iniciar sesión. Verifica tus credenciales e intenta de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-gray-800/50 p-8 rounded-2xl shadow-2xl shadow-green-900/20 border border-gray-700">
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Inicia Sesión en EatFit
          </h1>

          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className={labelStyles}>
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputStyles}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className={labelStyles}>
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={inputStyles}
                required
                autoComplete="current-password"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-3 text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
            </div>

            <div className="text-center pt-4">
              <p className="text-gray-400 text-sm">
                ¿No tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={onNavigateToRegister}
                  className="text-green-400 hover:text-green-300 font-medium"
                >
                  Regístrate aquí
                </button>
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};
