import React from 'react';
import type { DynamicInfo } from '../types';

interface DynamicInfoDisplayProps {
    info: DynamicInfo | null;
    condition: string;
    isLoading: boolean;
}

const InfoSection: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div>
        <h5 className="font-semibold text-green-300 mb-1">{title}</h5>
        {children}
    </div>
);

const List: React.FC<{items: string[]}> = ({items}) => (
    <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
        {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
);

export const DynamicInfoDisplay: React.FC<DynamicInfoDisplayProps> = ({ info, condition, isLoading }) => {
    return (
        <section className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-3">Información sobre {condition}</h3>
            {isLoading ? (
                 <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4 mt-4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
            ) : info ? (
                <div className="space-y-4 animate-fade-in">
                    <p className="text-sm text-gray-300">{info.descripcion}</p>
                    <InfoSection title="Alimentos Recomendados">
                        <List items={info.consejos.alimentosRecomendados} />
                    </InfoSection>
                     <InfoSection title="Alimentos a Evitar">
                        <List items={info.consejos.alimentosAEvitar} />
                    </InfoSection>
                    <InfoSection title="Riesgos">
                        <p className="text-sm text-gray-400">{info.riesgos}</p>
                    </InfoSection>
                     <InfoSection title="Autocuidado">
                        <List items={info.autocuidado} />
                    </InfoSection>
                </div>
            ) : (
                <p className="text-gray-400 text-sm">No se pudo cargar la información sobre esta condición.</p>
            )}
        </section>
    );
};
