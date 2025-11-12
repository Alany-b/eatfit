
import React from 'react';
import type { WeeklyPlan, DayPlan } from '../types';

const MealCategory: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div>
    <h4 className="font-semibold text-green-300 mb-1">{title}</h4>
    <ul className="list-disc list-inside text-gray-400 space-y-1">
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </div>
);

const DayCard: React.FC<{ day: string; plan: DayPlan }> = ({ day, plan }) => (
  <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 h-full flex flex-col">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-2xl font-bold text-white">{day}</h3>
      <span className="bg-green-900 text-green-300 text-sm font-medium px-3 py-1 rounded-full">{plan.calorias} Kcal</span>
    </div>
    <div className="space-y-4 flex-grow">
      <MealCategory title="Desayuno" items={plan.desayuno} />
      <MealCategory title="Almuerzo" items={plan.almuerzo} />
      <MealCategory title="Cena" items={plan.cena} />
      <MealCategory title="Snacks" items={plan.snacks} />
    </div>
  </div>
);

export const MealPlanDisplay: React.FC<{ plan: WeeklyPlan }> = ({ plan }) => {
    const daysOrder: (keyof WeeklyPlan)[] = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

  return (
    <div className="space-y-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-white">
        Tu Plan de Comidas Semanal
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {daysOrder.map(day => (
          plan[day] && <DayCard key={day} day={day} plan={plan[day]} />
        ))}
      </div>
    </div>
  );
};
