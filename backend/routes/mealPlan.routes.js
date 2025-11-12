import { Router } from "express";
import {
  getUserMealPlans,
  getMealPlanById,
  createMealPlan,
  updateMealPlan,
  deleteMealPlan,
} from "../controllers/mealPlan.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const mealPlanRoutes = Router();

// All routes require authentication
mealPlanRoutes.use(authMiddleware);

// GET all meal plans for a user by email
mealPlanRoutes.get("/user/:email", getUserMealPlans);

// GET a specific meal plan by ID
mealPlanRoutes.get("/:id", getMealPlanById);

// POST create a new meal plan
mealPlanRoutes.post("/", createMealPlan);

// PUT update a meal plan
mealPlanRoutes.put("/:id", updateMealPlan);

// DELETE a meal plan
mealPlanRoutes.delete("/:id", deleteMealPlan);

export default mealPlanRoutes;
