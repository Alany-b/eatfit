import UserProfile from "../models/UserProfile.js";

// Obtener perfil por email
export const getUserProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const profile = await UserProfile.findOne({ user_email: email });
    if (!profile) {
      return res.status(404).json({ message: "Perfil no encontrado" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfil", error: error.message });
  }
};

// Crear perfil
export const createUserProfile = async (req, res) => {
  try {
    const profile = new UserProfile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ message: "Error al crear perfil", error: error.message });
  }
};

// Actualizar perfil
export const updateUserProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { user_email: email },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Perfil no encontrado" });
    }

    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar perfil", error: error.message });
  }
};
