import React, { useState } from "react";
import type { User } from "../types";
import { Footer } from "../components/Footer";
import { authService } from "../services/authService";

interface RegisterPageProps {
  onRegister: (user: User) => void;
}

const inputStyles =
  "bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 placeholder-gray-400";
const labelStyles = "block mb-2 text-sm font-medium text-gray-300";

export const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    hasCondition: "",
    condition: "",
    otherCondition: "",
    objective: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Preparar datos para enviar al backend
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        age: formData.age ? parseInt(formData.age) : undefined,
        gender: formData.gender || undefined,
        condition:
          formData.condition === "Otro"
            ? formData.otherCondition
            : formData.condition || undefined,
        objective: formData.objective || undefined,
      };

      // Registrar usuario en el backend
      const response = await authService.register(userData);

      // Crear objeto User para el estado local
      const user: User = {
        name: response.user.name,
        email: response.user.email,
        age: response.user.age,
        gender: response.user.gender,
        condition: response.user.condition,
        objective: response.user.objective,
      };

      // Llamar a onRegister para actualizar el estado en App
      onRegister(user);
    } catch (err: any) {
      console.error("Error al registrar:", err);
      setError(
        err.message || "Error al crear la cuenta. Por favor, intenta de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const conditions = [
    "Celiaquía",
    "Intolerancia a la lactosa",
    "Diabetes",
    "Hipertensión",
    "Hipercolesterolemia",
    "Obesidad",
    "Anorexia nerviosa",
    "Bulimia",
    "Trastorno por atracón",
    "Otro",
  ];
  const objectives = [
    "Informarme mas acerca de los alimentos",
    "Mejorar mis hábitos alimenticios",
    "Bajar de peso",
    "Subir de peso",
    "Mantener una alimentación equilibrada",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl bg-gray-800/50 p-8 rounded-2xl shadow-2xl shadow-green-900/20 border border-gray-700">
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Crea tu Cuenta en EatFit
          </h1>

          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className={labelStyles}>
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputStyles}
                  required
                />
              </div>
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
                />
              </div>
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
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="age" className={labelStyles}>
                  Edad (Opcional)
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={inputStyles}
                />
              </div>
              <div>
                <label htmlFor="gender" className={labelStyles}>
                  Género (Opcional)
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={inputStyles}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>

            <hr className="border-gray-600" />

            <div>
              <label className={labelStyles}>
                ¿Tienes algún problema, trastorno o enfermedad relacionada con
                la alimentación?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasCondition"
                    value="yes"
                    checked={formData.hasCondition === "yes"}
                    onChange={handleChange}
                    className="mr-2"
                  />{" "}
                  Sí
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasCondition"
                    value="no"
                    checked={formData.hasCondition === "no"}
                    onChange={handleChange}
                    className="mr-2"
                  />{" "}
                  No
                </label>
              </div>
            </div>

            {formData.hasCondition === "yes" && (
              <div className="animate-fade-in">
                <label htmlFor="condition" className={labelStyles}>
                  Por favor, especifica cuál:
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className={inputStyles}
                >
                  <option value="">Seleccionar...</option>
                  {conditions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {formData.condition === "Otro" && (
                  <input
                    type="text"
                    name="otherCondition"
                    value={formData.otherCondition}
                    onChange={handleChange}
                    className={`${inputStyles} mt-2`}
                    placeholder="Especifica otro"
                  />
                )}
              </div>
            )}

            {formData.hasCondition === "no" && (
              <div className="animate-fade-in">
                <label htmlFor="objective" className={labelStyles}>
                  ¿Cuál es tu objetivo principal al usar EatFit?
                </label>
                <select
                  id="objective"
                  name="objective"
                  value={formData.objective}
                  onChange={handleChange}
                  className={inputStyles}
                >
                  <option value="">Seleccionar...</option>
                  {objectives.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-3 text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Registrando..." : "Registrarse"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};
