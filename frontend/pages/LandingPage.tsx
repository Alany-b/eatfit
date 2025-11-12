import React from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

interface LandingPageProps {
  onNavigate: (view: "register" | "landing" | "login") => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navigation onNavigate={onNavigate} />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Bienvenido a <span className="text-green-400">EatFit</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Tu compañero inteligente para una vida más saludable. Descubre
            planes de alimentación, obtén consejos personalizados y entiende
            mejor tu cuerpo.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => onNavigate("register")}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105"
            >
              Únete Ahora
            </button>
            <button
              onClick={() => onNavigate("login")}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
