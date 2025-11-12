export interface MealFormData {
  goal: string;
  activityLevel: string;
  restrictions: string;
  dislikes: string;
}

export interface DayPlan {
  desayuno: string[];
  almuerzo: string[];
  cena: string[];
  snacks: string[];
  calorias: number;
}

export interface WeeklyPlan {
  Lunes: DayPlan;
  Martes: DayPlan;
  Miercoles: DayPlan;
  Jueves: DayPlan;
  Viernes: DayPlan;
  Sabado: DayPlan;
  Domingo: DayPlan;
}

export interface MealPlanResponse {
  planSemanal: WeeklyPlan;
}

export interface User {
  name: string;
  email: string;
  age?: number;
  gender?: string;
  condition?: string;
  otherCondition?: string;
  objective?: string;
}

export interface DynamicInfo {
  descripcion: string;
  consejos: {
    alimentosRecomendados: string[];
    alimentosAEvitar: string[];
  };
  riesgos: string;
  autocuidado: string[];
}

export interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}
