import MealPlan from "../models/mealPlan.model.js";

/**
 * GET all meal plans for a user
 */
export const getUserMealPlans = async (req, res) => {
  try {
    const { email } = req.params;

    const plans = await MealPlan.find({ user_email: email })
      .sort({ createdAt: -1 })
      .limit(10);

    return res.json({
      success: true,
      count: plans.length,
      data: plans,
    });
  } catch (error) {
    console.error("Error fetching meal plans:", error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener planes de comidas",
    });
  }
};

/**
 * GET a specific meal plan by ID
 */
export const getMealPlanById = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await MealPlan.findById(id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan de comidas no encontrado",
      });
    }

    return res.json({
      success: true,
      data: plan,
    });
  } catch (error) {
    console.error("Error fetching meal plan:", error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener el plan de comidas",
    });
  }
};

/**
 * POST create a new meal plan
 */
export const createMealPlan = async (req, res) => {
  try {
    const {
      user_email,
      plan_name,
      goal,
      activity_level,
      restrictions,
      dislikes,
      plan_data,
    } = req.body;

    if (!user_email || !goal || !activity_level || !plan_data) {
      return res.status(400).json({
        success: false,
        message:
          "Faltan campos requeridos: user_email, goal, activity_level, plan_data",
      });
    }

    const newPlan = new MealPlan({
      user_email,
      plan_name,
      goal,
      activity_level,
      restrictions,
      dislikes,
      plan_data,
    });

    await newPlan.save();

    return res.status(201).json({
      success: true,
      message: "Plan de comidas creado exitosamente",
      data: newPlan,
    });
  } catch (error) {
    console.error("Error creating meal plan:", error);
    return res.status(500).json({
      success: false,
      message: "Error al crear el plan de comidas",
    });
  }
};

/**
 * PUT update a meal plan
 */
export const updateMealPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const plan = await MealPlan.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan de comidas no encontrado",
      });
    }

    return res.json({
      success: true,
      message: "Plan de comidas actualizado exitosamente",
      data: plan,
    });
  } catch (error) {
    console.error("Error updating meal plan:", error);
    return res.status(500).json({
      success: false,
      message: "Error al actualizar el plan de comidas",
    });
  }
};

/**
 * DELETE a meal plan
 */
export const deleteMealPlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await MealPlan.findByIdAndDelete(id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan de comidas no encontrado",
      });
    }

    return res.json({
      success: true,
      message: "Plan de comidas eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error deleting meal plan:", error);
    return res.status(500).json({
      success: false,
      message: "Error al eliminar el plan de comidas",
    });
  }
};
