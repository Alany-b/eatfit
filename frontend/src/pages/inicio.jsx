// src/pages/Inicio.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiClient } from "../api/apiClient";
import { Button } from "../components/ui/Button.jsx";
import {
  Apple,
  Zap,
  Heart,
  Target,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  {
    id: "alimentacion",
    title: "Alimentación",
    icon: Apple,
    description:
      "Descubre cómo una buena alimentación puede transformar tu vida",
    gradient: "from-emerald-500 to-teal-500",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
  },
  {
    id: "energia",
    title: "Energía",
    icon: Zap,
    description:
      "Entiende cómo los alimentos afectan tu nivel de energía diario",
    gradient: "from-yellow-500 to-orange-500",
    image:
      "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=800&q=80",
  },
  {
    id: "salud",
    title: "Salud",
    icon: Heart,
    description: "Personaliza tu nutrición según tus necesidades específicas",
    gradient: "from-pink-500 to-rose-500",
    image:
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80",
  },
  {
    id: "habitos",
    title: "Hábitos",
    icon: TrendingUp,
    description: "Construye rutinas saludables que perduren en el tiempo",
    gradient: "from-blue-500 to-indigo-500",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
  },
  {
    id: "objetivos",
    title: "Objetivos",
    icon: Target,
    description: "Alcanza tus metas con un enfoque personalizado",
    gradient: "from-purple-500 to-violet-500",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
  },
];

export default function Inicio() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await base44.auth.isAuthenticated();
      setIsAuthenticated(authenticated);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sections.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % sections.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + sections.length) % sections.length);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-emerald-600 via-emerald-500 to-teal-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Bienvenido a
              <br />
              <span className="bg-linear-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                EatFit
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-emerald-50 mb-8 max-w-3xl mx-auto">
              Tu compañero inteligente para entender cómo los alimentos afectan
              tu cuerpo y alcanzar tus objetivos de salud
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-6 text-lg"
                  >
                    Ir al Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Button
                    size="lg"
                    className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-6 text-lg"
                    onClick={() => base44.auth.redirectToLogin()}
                  >
                    Comenzar Ahora
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                    onClick={() => base44.auth.redirectToLogin()}
                  >
                    Iniciar Sesión
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
          >
            Explora Nuestras Secciones
          </motion.h2>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-96 md:h-[500px]"
                >
                  <img
                    src={sections[currentSlide].image}
                    alt={sections[currentSlide].title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-linear-to-r ${sections[currentSlide].gradient} opacity-80`}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center px-4">
                      {React.createElement(sections[currentSlide].icon, {
                        className: "w-20 h-20 mx-auto mb-6",
                      })}
                      <h3 className="text-4xl md:text-5xl font-bold mb-4">
                        {sections[currentSlide].title}
                      </h3>
                      <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                        {sections[currentSlide].description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-emerald-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
            >
              <ChevronRight className="w-6 h-6 text-emerald-600" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-emerald-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Details Grid */}
      <section className="py-20 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                >
                  <div
                    className={`w-16 h-16 bg-linear-to-br ${section.gradient} rounded-xl flex items-center justify-center mb-6`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {section.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 bg-linear-to-r from-emerald-600 to-teal-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para Empezar?
            </h2>
            <p className="text-xl text-emerald-50 mb-8">
              Únete a EatFit hoy y descubre cómo los alimentos afectan tu cuerpo
            </p>
            <Link to="/register">
              <Button
                size="lg"
                className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-6 text-lg"
              >
                Registrarse Gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
