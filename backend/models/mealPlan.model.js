import mongoose from "mongoose";

const MealPlanSchema = new mongoose.Schema(
  {
    user_email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      ref: "User",
    },
    plan_name: {
      type: String,
      default: "Plan Semanal",
      trim: true,
    },
    goal: {
      type: String,
      required: true,
    },
    activity_level: {
      type: String,
      required: true,
    },
    restrictions: {
      type: String,
      default: "",
    },
    dislikes: {
      type: String,
      default: "",
    },
    plan_data: {
      type: Object,
      required: true,
      // Structure: { Lunes: { desayuno: [], almuerzo: [], cena: [], snacks: [], calorias: 2000 }, ... }
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Index for faster queries by user
MealPlanSchema.index({ user_email: 1, createdAt: -1 });

export default mongoose.model("MealPlan", MealPlanSchema);
