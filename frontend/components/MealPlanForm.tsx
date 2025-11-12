import React, { useState } from 'react';
import type { MealFormData } from '../types';

interface MealPlanFormProps {
  onGenerate: (formData: MealFormData) => void;
  isLoading: boolean;
}

const FormInput: React.FC<{ id: string; label: string; children: React.ReactNode }> = ({ id, label, children }) => (
    <div>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-300">{label}</label>
        {children}
    </div>
);

export const MealPlanForm: React.FC<MealPlanFormProps> = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = useState<MealFormData>({
    goal: 'Perder peso',
    activityLevel: 'Sedentario',
    restrictions: '',
    dislikes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const inputStyles = "bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 placeholder-gray-400";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput id="goal" label="¿Cuál es tu objetivo?">
          <select id="goal" name="goal" value={formData.goal} onChange={handleChange} className={inputStyles}>
            <option>Perder peso</option>
            <option>Mantener peso</option>
            <option>Ganar músculo</option>
          </select>
        </FormInput>

        <FormInput id="activityLevel" label="Nivel de actividad física">
          <select id="activityLevel" name="activityLevel" value={formData.activityLevel} onChange={handleChange} className={inputStyles}>
            <option value="Sedentario">Sedentario (poco o nada de ejercicio)</option>
            <option value="Ligero">Ligero (ejercicio 1-3 días/semana)</option>
            <option value="Moderado">Moderado (ejercicio 3-5 días/semana)</option>
            <option value="Activo">Activo (ejercicio 6-7 días/semana)</option>
            <option value="Muy activo">Muy activo (trabajo físico o ejercicio intenso)</option>
          </select>
        </FormInput>
      </div>

      <FormInput id="restrictions" label="Restricciones dietéticas (ej. sin gluten, vegetariano)">
        <input
          type="text"
          id="restrictions"
          name="restrictions"
          value={formData.restrictions}
          onChange={handleChange}
          className={inputStyles}
          placeholder="Separa por comas"
        />
      </FormInput>

      <FormInput id="dislikes" label="Ingredientes que no te gustan">
        <input
          type="text"
          id="dislikes"
          name="dislikes"
          value={formData.dislikes}
          onChange={handleChange}
          className={inputStyles}
          placeholder="Separa por comas"
        />
      </FormInput>
      
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-3.5 text-center transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generando Plan...
            </>
          ) : (
            'Generar Plan de Comidas'
          )}
        </button>
      </div>
    </form>
  );
};
