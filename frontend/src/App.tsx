import React, { useState, useCallback, useEffect } from "react";
import { LandingPage } from "../pages/LandingPage";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { Dashboard } from "../pages/DashBoard";
import type { User } from "../types";
import { authService } from "../services/authService";

type View = "landing" | "register" | "login" | "dashboard";

const App: React.FC = () => {
  const [view, setView] = useState<View>("landing");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const restoreSession = () => {
      try {
        if (authService.isAuthenticated()) {
          const savedUser = authService.getCurrentUser();
          if (savedUser) {
            setUser(savedUser);
            setView("dashboard");
          }
        }
      } catch (err) {
        console.error("Error restoring session:", err);
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  const handleRegister = useCallback((userData: User) => {
    setUser(userData);
    setView("dashboard");
  }, []);

  const handleLogin = useCallback((userData: User) => {
    setUser(userData);
    setView("dashboard");
  }, []);

  const handleLogout = useCallback(() => {
    authService.logout();
    setUser(null);
    setView("landing");
  }, []);

  const handleNavigate = useCallback(
    (targetView: "register" | "landing" | "login") => {
      setView(targetView);
    },
    []
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-green-400 text-xl">Cargando...</div>
      </div>
    );
  }

  const renderView = () => {
    switch (view) {
      case "register":
        return <RegisterPage onRegister={handleRegister} />;
      case "login":
        return (
          <LoginPage
            onLogin={handleLogin}
            onNavigateToRegister={() => handleNavigate("register")}
          />
        );
      case "dashboard":
        return user ? (
          <Dashboard user={user} onLogout={handleLogout} />
        ) : (
          <LandingPage onNavigate={handleNavigate} />
        );
      case "landing":
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      {renderView()}
    </div>
  );
};

export default App;
