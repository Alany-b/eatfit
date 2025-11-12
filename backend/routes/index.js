// backend/routes/index.js
import express from "express";
import authRoutes from "./auth.routes.js";
import userProfileRoutes from "./userProfileRoutes.js";
import mealPlanRoutes from "./mealPlan.routes.js";

export const routes = express.Router();

// Prefijos de rutas
// Resultado final con app.use("/api", routes):
//  - /api/auth/*
//  - /api/profile/*
//  - /api/meal-plans/*
routes.use("/auth", authRoutes);
routes.use("/profile", userProfileRoutes);
routes.use("/meal-plans", mealPlanRoutes);
