import React from 'react';

interface DashboardHeaderProps {
  userName: string;
  onLogout: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, onLogout }) => {
  return (
    <header className="py-4 px-4 sm:px-6 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-800">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
            <h1 className="text-xl font-bold text-white tracking-wider">
                Bienvenido, <span className="text-green-400">{userName}</span>
            </h1>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center text-sm font-medium text-gray-300 hover:text-white bg-gray-700/50 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
};
