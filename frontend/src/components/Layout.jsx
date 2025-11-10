import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiClient } from "../api/apiClient.js";
import {
  Apple,
  Home,
  User,
  LogOut,
  PlusCircle,
  BarChart3,
  Heart,
  TrendingUp,
} from "lucide-react";

export default function Layout({ children }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await apiClient.auth.isAuthenticated();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        try {
          const currentUser = await apiClient.auth.me();
          setUser(currentUser);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
    checkAuth();
  }, [location]);

  const handleLogout = () => {
    apiClient.auth.logout();
  };

  const navigation = [
    { name: "Inicio", path: "/", icon: Home },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: BarChart3,
      authRequired: true,
    },
    {
      name: "Registrar",
      path: "/register",
      icon: PlusCircle,
      authRequired: true,
    },
    {
      name: "Patrones",
      path: "/patrones",
      icon: TrendingUp,
      authRequired: true,
    },
    {
      name: "Información",
      path: "/informacion",
      icon: Heart,
      authRequired: true,
    },
  ];

  const filteredNav = navigation.filter(
    (item) => !item.authRequired || isAuthenticated
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-blue-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <Apple className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                EatFit
              </span>
            </Link>

            {/* Nav items */}
            <div className="hidden md:flex items-center space-x-1">
              {filteredNav.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* User menu */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/perfil"
                    className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600"
                  >
                    <User className="w-4 h-4" />
                    <span>{user?.full_name || user?.email}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 border border-gray-200 px-3 py-1.5 rounded-md hover:bg-emerald-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Salir</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-gray-700 hover:text-emerald-600"
                    onClick={() => apiClient.auth.redirectToLogin()}
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    className="bg-linear-to-rrom-emerald-500 to-emerald-600 text-white px-3 py-1.5 rounded-md hover:from-emerald-600 hover:to-emerald-700"
                    onClick={() => apiClient.auth.redirectToLogin()}
                  >
                    Registrarse
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
