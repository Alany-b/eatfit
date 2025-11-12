import React from 'react';

const NavIcon: React.FC<{ d: string, label: string }> = ({ d, label }) => (
    <a href="#" className="flex flex-col items-center text-gray-400 hover:text-green-400 transition-colors group">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
        </svg>
        <span className="text-xs tracking-wide">{label}</span>
    </a>
);

const UserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export const Navigation: React.FC<{ onNavigate: (view: 'register' | 'landing') => void }> = ({ onNavigate }) => {
    return (
        <header className="py-4 px-4 sm:px-6 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-800">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 01-9-9 1 .5 1 0 012 0 7 7 0 1011.8-4.95A1 1 0 0116 8a9 9 0 01-4 13z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 01-9-9 1 .5 1 0 012 0 7 7 0 1011.8-4.95A1 1 0 0116 8a9 9 0 01-4 13z" clipRule="evenodd" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" />
                    </svg>
                    <h1 className="ml-3 text-2xl font-bold text-white tracking-wider">
                        Eat<span className="text-green-400">Fit</span>
                    </h1>
                </div>

                {/* Nav Icons */}
                <nav className="hidden md:flex items-center space-x-8">
                    <NavIcon d="M19.4 7.6c.1.2.2.3.2.5 0 .2-.1.3-.2.5L16 12l3.4 3.4c.1.2.2.3.2.5 0 .2-.1.3-.2.5l-2.6 2.6c-.2.1-.3.2-.5.2-.2 0-.3-.1-.5-.2L12 16l-3.4 3.4c-.2.1-.3.2-.5.2-.2 0-.3-.1-.5-.2l-2.6-2.6c-.1-.2-.2-.3-.2-.5 0-.2.1-.3.2-.5L8 12 4.6 8.6c-.1-.2-.2-.3-.2-.5 0-.2.1-.3.2-.5l2.6-2.6c.2-.1.3-.2.5-.2.2 0 .3.1.5.2L12 8l3.4-3.4c.2-.1.3-.2.5-.2s.3.1.5.2l2.6 2.6z" label="Alimentación" />
                    <NavIcon d="M13 10V3L4 14h7v7l9-11h-7z" label="Energía" />
                    <NavIcon d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" label="Salud" />
                    <NavIcon d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" label="Hábitos" />
                    <NavIcon d="M11 5.882V19.118a1.5 1.5 0 01-3 0V5.882a1.5 1.5 0 013 0zM12 2a1 1 0 011 1v2a1 1 0 01-2 0V3a1 1 0 011-1zm5 4.5a1 1 0 011.414 0l1.414 1.414a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414-1.414L17.586 8.5H16a1 1 0 01-1-1 1.5 1.5 0 011.5-1.5h1.5zm-10 0h-1.5A1.5 1.5 0 004 7.5a1 1 0 01-1 1H1.414a.5.5 0 01-.353-.854L2.5 6.207a1 1 0 011.414 0l1.414 1.414a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414-1.414l.793-.793a1 1 0 011-1h1.5a1.5 1.5 0 001.5-1.5 1 1 0 01-1-1zm-1 10.5a1 1 0 011.414 0L8.5 18.586l.793-.793a1 1 0 011.414 1.414L9.293 20.707a1 1 0 01-1.414 0L6.464 19.293a1 1 0 010-1.414l1.414-1.414a1 1 0 011.414 0L10.5 17.586H12a1 1 0 011 1 1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.06-.44L7 17.12V19.5a1.5 1.5 0 01-3 0V17.12l-1.94 1.94a1.5 1.5 0 01-2.12-2.122L2 15V8.5A1.5 1.5 0 013.5 7H5V5.5A1.5 1.5 0 016.5 4h1a1.5 1.5 0 011.5 1.5V7h1.5a1.5 1.5 0 011.5 1.5V11a1 1 0 11-2 0V9.5a.5.5 0 00-.5-.5h-1.5a.5.5 0 00-.5.5V12a1 1 0 01-1 1 .5.5 0 00-.5.5V15a1 1 0 11-2 0v-2.5a.5.5 0 00-.5-.5h-1.5a.5.5 0 00-.5.5V15a1 1 0 01-1 1 .5.5 0 00-.5.5v2.5a.5.5 0 00.5.5H7a.5.5 0 00.5-.5V19a1 1 0 112 0v.5a.5.5 0 00.5.5h1.5a.5.5 0 00.5-.5V19a1 1 0 112 0v.5a.5.5 0 00.5.5H15a.5.5 0 00.5-.5V18a1 1 0 112 0v1.5a.5.5 0 00.5.5h1.5a.5.5 0 00.5-.5V19a1 1 0 112 0v.5a.5.5 0 00.5.5h1a1.5 1.5 0 001.5-1.5V8.882a1.5 1.5 0 00-3 0v8.236a1.5 1.5 0 01-3 0V8.882a1.5 1.5 0 00-3 0z" label="Objetivos" />
                </nav>

                {/* Auth Buttons */}
                <div className="flex items-center space-x-2">
                    <button onClick={() => {}} className="hidden sm:flex items-center text-sm font-medium text-gray-300 hover:text-white bg-gray-700/50 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">
                        Inicia Sesión
                    </button>
                    <button onClick={() => onNavigate('register')} className="flex items-center text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors">
                        <UserIcon /> Regístrate
                    </button>
                </div>
            </div>
        </header>
    );
};
