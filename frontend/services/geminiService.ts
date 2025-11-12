import type {
  MealFormData,
  MealPlanResponse,
  DynamicInfo,
  ChatMessage,
} from "../types";
import { SYSTEM_INSTRUCTIONS, DOCUMENTATION_CONTEXT } from "./chatbotConstants";

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as string;
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Free models available on OpenRouter (no rate limits for basic use)
const MODEL_CANDIDATES = [
  "google/gemini-2.0-flash-exp:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "microsoft/phi-3-mini-128k-instruct:free",
];

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function callOpenRouter(
  messages: Array<{ role: string; content: string }>,
  jsonMode = false,
  attempts = 3
): Promise<string> {
  let lastErr: any;

  for (const model of MODEL_CANDIDATES) {
    for (let i = 0; i < attempts; i++) {
      try {
        const response = await fetch(OPENROUTER_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "HTTP-Referer": window.location.origin,
            "X-Title": "EatFit",
          },
          body: JSON.stringify({
            model,
            messages,
            ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const error: any = new Error(
            errorData?.error?.message || `HTTP ${response.status}`
          );
          error.status = response.status;
          error.code = response.status;
          throw error;
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;
        if (!text) throw new Error("No response text from AI model");
        return text.trim();
      } catch (err: any) {
        lastErr = err;
        const code = err?.status || err?.code;
        const isRetryable =
          code === 503 ||
          code === 429 ||
          code === 500 ||
          err?.message?.includes?.("overloaded");

        // Try next model on quota/overload
        if (code === 429 || code === 402) {
          if (import.meta.env.DEV)
            console.warn(`Model ${model} quota exceeded. Trying next model...`);
          break; // Try next model
        }

        // Retry same model on transient errors
        if (isRetryable && i < attempts - 1) {
          const delay = 600 * Math.pow(2, i) + Math.random() * 200;
          if (import.meta.env.DEV)
            console.warn(
              `AI call failed (code ${code}). Retrying in ${Math.round(
                delay
              )}ms...`
            );
          await sleep(delay);
          continue;
        }

        break; // Try next model
      }
    }
  }

  throw lastErr;
}

export const generateMealPlan = async (
  formData: MealFormData
): Promise<MealPlanResponse> => {
  const { goal, activityLevel, restrictions, dislikes } = formData;
  const prompt = `
    Eres un experto nutricionista y chef. Basado en los siguientes datos de usuario, crea un plan de comidas detallado y saludable para 7 días en español.
    - Objetivo: ${goal}
    - Nivel de Actividad: ${activityLevel}
    - Restricciones Dietéticas: ${restrictions || "Ninguna"}
    - Ingredientes a evitar: ${dislikes || "Ninguno"}
    
    IMPORTANTE: Responde SOLO con un objeto JSON válido con esta estructura exacta:
    {
      "planSemanal": {
        "Lunes": { "desayuno": ["item1", "item2"], "almuerzo": ["item1"], "cena": ["item1"], "snacks": ["item1"], "calorias": 2000 },
        "Martes": { "desayuno": ["item1"], "almuerzo": ["item1"], "cena": ["item1"], "snacks": ["item1"], "calorias": 2000 },
        "Miercoles": { "desayuno": ["item1"], "almuerzo": ["item1"], "cena": ["item1"], "snacks": ["item1"], "calorias": 2000 },
        "Jueves": { "desayuno": ["item1"], "almuerzo": ["item1"], "cena": ["item1"], "snacks": ["item1"], "calorias": 2000 },
        "Viernes": { "desayuno": ["item1"], "almuerzo": ["item1"], "cena": ["item1"], "snacks": ["item1"], "calorias": 2000 },
        "Sabado": { "desayuno": ["item1"], "almuerzo": ["item1"], "cena": ["item1"], "snacks": ["item1"], "calorias": 2000 },
        "Domingo": { "desayuno": ["item1"], "almuerzo": ["item1"], "cena": ["item1"], "snacks": ["item1"], "calorias": 2000 }
      }
    }
    
    No incluyas explicaciones adicionales, solo el JSON.
  `;

  const text = await callOpenRouter(
    [{ role: "user", content: prompt }],
    true // JSON mode
  );
  return JSON.parse(text) as MealPlanResponse;
};

export const getDailyTip = async (objective: string): Promise<string> => {
  const prompt = `
    Eres un coach de salud y bienestar. Genera un "Tip Diario" corto, motivador y práctico en español para un usuario cuyo objetivo principal es "${objective}".
    El tip debe ser de una o dos frases. Sé directo y positivo.
    Ejemplo: "Recuerda beber un vaso de agua antes de cada comida. ¡Te ayudará a sentirte más lleno y a mantenerte hidratado!"
    No incluyas el prefijo "Tip Diario:".
    `;
  const text = await callOpenRouter([{ role: "user", content: prompt }]);
  return text;
};

export const getDynamicInfo = async (
  condition: string
): Promise<DynamicInfo> => {
  const prompt = `
    Eres un educador de salud y nutricionista. Proporciona información educativa y preventiva en español sobre la siguiente condición: "${condition}".
    
    IMPORTANTE: Responde SOLO con un objeto JSON válido con esta estructura exacta:
    {
      "descripcion": "Una descripción general de la enfermedad o trastorno",
      "consejos": {
        "alimentosRecomendados": ["alimento1", "alimento2"],
        "alimentosAEvitar": ["alimento1", "alimento2"]
      },
      "riesgos": "Consecuencias o riesgos de no seguir una dieta adecuada",
      "autocuidado": ["tip1", "tip2", "tip3"]
    }
    
    No agregues ninguna explicación fuera del JSON.
    `;
  const text = await callOpenRouter(
    [{ role: "user", content: prompt }],
    true // JSON mode
  );
  return JSON.parse(text) as DynamicInfo;
};

export const getFittyResponse = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  const messages = [
    {
      role: "system",
      content: `${SYSTEM_INSTRUCTIONS}\n\n${DOCUMENTATION_CONTEXT}`,
    },
    ...history.map((msg) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.parts[0]?.text || "",
    })),
    { role: "user", content: newMessage },
  ];

  return await callOpenRouter(messages);
};
