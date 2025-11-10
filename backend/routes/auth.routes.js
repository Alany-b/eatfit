import { Router } from "express";
import { login, register, profile, logout } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

 const authRoutes = Router();

// Login
authRoutes.post("/login", login);

// Register
authRoutes.post("/register", register);

// Perfil del usuario autenticado
authRoutes.get("/profile", authMiddleware, profile);

// Logout
authRoutes.post("/logout", authMiddleware, logout);
 
export default authRoutes;