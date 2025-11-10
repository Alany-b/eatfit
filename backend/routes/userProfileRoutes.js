import { Router } from "express";
import {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
} from "../controllers/ProfileController.js";
import { validateRequest } from "../middlewares/validationResult.js";
import { userProfileValidation } from "../validations/userProfileValidation.js";

const userProfileRoutes = Router();

// GET perfil por email
userProfileRoutes.get("/:email", getUserProfile);

// POST crear perfil
userProfileRoutes.post("/", userProfileValidation, validateRequest, createUserProfile);

// PUT actualizar perfil
userProfileRoutes.put("/:email", userProfileValidation, validateRequest, updateUserProfile);

export default userProfileRoutes;
