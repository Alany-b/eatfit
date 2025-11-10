// backend/routes/index.js
import express from "express";
import  authRoutes  from "./auth.routes.js";
import userProfileRoutes from "./userProfileRoutes.js";

export const routes = express.Router();

// Montar todas las rutas de autenticación bajo /

routes.use(authRoutes);
routes.use(userProfileRoutes);

