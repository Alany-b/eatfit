import React, { useState, useEffect, useCallback } from "react";
import { MealPlanForm } from "../components/MealPlanForm";
import { MealPlanDisplay } from "../components/MealPlanDisplay";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Footer } from "../components/Footer";
import {
  generateMealPlan,
  getDailyTip,
  getDynamicInfo,
} from "../services/GeminiService";
import type {
  User,
  MealFormData,
  MealPlanResponse,
  DynamicInfo,
} from "../types";
import { DashboardHeader } from "../components/DashboardHeader";
import { DailyTip } from "../components/DailyTip";
import { DynamicInfoDisplay } from "../components/DynamicInfoDisplay";
import { Chatbot } from "../components/Chatbot";

export const Dashboard: React.FC<{ user: User; onLogout: () => void }> = ({
  user,
  onLogout,
}) => {
  const [mealPlan, setMealPlan] = useState<MealPlanResponse | null>(null);
  const [isMealPlanLoading, setIsMealPlanLoading] = useState<boolean>(false);
  const [mealPlanError, setMealPlanError] = useState<string | null>(null);

  const [dailyTip, setDailyTip] = useState<string | null>(null);
  const [isTipLoading, setIsTipLoading] = useState<boolean>(true);

  const [dynamicInfo, setDynamicInfo] = useState<DynamicInfo | null>(null);
  const [isInfoLoading, setIsInfoLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Fetch Daily Tip
      if (user.objective) {
        try {
          setIsTipLoading(true);
          const tip = await getDailyTip(user.objective);
          setDailyTip(tip);
        } catch (err: any) {
          console.error("Error fetching daily tip:", err);
          // Set a fallback tip if API fails
          setDailyTip(
            "¡Mantén una actitud positiva! Recuerda beber agua y comer saludable hoy."
          );
        } finally {
          setIsTipLoading(false);
        }
      } else {
        setIsTipLoading(false);
      }

      // Fetch Dynamic Info
      if (user.condition) {
        try {
          setIsInfoLoading(true);
          const info = await getDynamicInfo(user.condition);
          setDynamicInfo(info);
        } catch (err: any) {
          console.error("Error fetching dynamic info:", err);
          // Set fallback info if API fails
          const errorMessage =
            err?.message || "Servicio temporalmente no disponible";
          setDynamicInfo({
            descripcion: `Información sobre ${user.condition} temporalmente no disponible. Por favor, intenta más tarde.`,
            consejos: {
              alimentosRecomendados: [
                "Consulta con un nutricionista profesional",
              ],
              alimentosAEvitar: [
                "El servicio de IA está sobrecargado. Intenta más tarde.",
              ],
            },
            riesgos: errorMessage.includes("overloaded")
              ? "El servicio de IA está temporalmente sobrecargado. Por favor, intenta de nuevo en unos minutos."
              : "Información no disponible en este momento.",
            autocuidado: [
              "Consulta fuentes médicas confiables",
              "Habla con un profesional de la salud",
            ],
          });
        } finally {
          setIsInfoLoading(false);
        }
      } else {
        setIsInfoLoading(false);
      }
    };
    fetchDashboardData();
  }, [user]);

  const handleGeneratePlan = useCallback(async (formData: MealFormData) => {
    setIsMealPlanLoading(true);
    setMealPlanError(null);
    setMealPlan(null);
    try {
      const plan = await generateMealPlan(formData);
      setMealPlan(plan);
    } catch (err) {
      console.error(err);
      const errorMessage = (err as any)?.message || "Error desconocido";
      if (
        errorMessage.includes("overloaded") ||
        (err as any)?.error?.code === 503
      ) {
        setMealPlanError(
          "El servicio de IA está temporalmente sobrecargado. Por favor, intenta de nuevo en unos minutos."
        );
      } else {
        setMealPlanError(
          "Hubo un error al generar el plan. Por favor, intenta de nuevo."
        );
      }
    } finally {
      setIsMealPlanLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader userName={user.name} onLogout={onLogout} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Meal Planner */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-gray-800/50 p-6 sm:p-8 rounded-2xl border border-gray-700">
              <h2 className="text-2xl font-bold mb-4">
                Generador de Plan de Comidas
              </h2>
              <MealPlanForm
                onGenerate={handleGeneratePlan}
                isLoading={isMealPlanLoading}
              />
            </section>

            <div className="min-h-[200px]">
              {isMealPlanLoading && <LoadingSpinner />}
              {mealPlanError && (
                <div className="text-center text-red-400 bg-red-900/30 p-4 rounded-lg">
                  {mealPlanError}
                </div>
              )}
              {mealPlan && (
                <div className="animate-fade-in">
                  <MealPlanDisplay plan={mealPlan.planSemanal} />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Tips and Info */}
          <aside className="space-y-8">
            {user.objective && (
              <DailyTip tip={dailyTip} isLoading={isTipLoading} />
            )}
            {user.condition && (
              <DynamicInfoDisplay
                info={dynamicInfo}
                condition={user.condition}
                isLoading={isInfoLoading}
              />
            )}
          </aside>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};
