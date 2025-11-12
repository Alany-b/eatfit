import React from 'react';

interface DailyTipProps {
    tip: string | null;
    isLoading: boolean;
}

const TipIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

export const DailyTip: React.FC<DailyTipProps> = ({ tip, isLoading }) => {
    return (
        <section className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <div className="flex items-center mb-3">
                <TipIcon />
                <h3 className="text-lg font-bold text-white ml-3">Tip Diario Personalizado</h3>
            </div>
            {isLoading ? (
                 <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
            ) : (
                <p className="text-gray-300 italic">"{tip || 'No se pudo cargar el tip de hoy. ¡Pero mantén tus hábitos saludables!'}"</p>
            )}
        </section>
    );
};
