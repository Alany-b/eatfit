import { UserModel } from "../models/user.model.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";

/**
 * LOGIN
 * Autentica un usuario y devuelve un token JWT
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y contraseña son requeridos" });
    }

    // Buscar usuario por email
    const user = await UserModel.findOne({ email: email.toLowerCase() });

    // Validar existencia y contraseña (hashed)
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Generar token JWT
    const token = generateToken({
      id: user._id,
      name: user.name,
      email: user.email,
    });

    // Responder al frontend
    return res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        condition: user.condition,
        objective: user.objective,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

/**
 * REGISTER
 * Registra un nuevo usuario en la base de datos
 */
export const register = async (req, res) => {
  try {
    const { name, email, password, age, gender, condition, objective } =
      req.body;

    // Validar campos requeridos
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Nombre, email y contraseña son obligatorios" });
    }

    // Verificar si el usuario ya existe
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El usuario ya existe con ese email" });
    }

    // Hashear la contraseña y crear nuevo usuario
    const hashed = await hashPassword(password);
    const newUser = new UserModel({
      name,
      email,
      password: hashed,
      age: age ? parseInt(age) : undefined,
      gender,
      condition,
      objective,
    });

    await newUser.save();

    // Generar token para login automático
    const token = generateToken({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });

    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        age: newUser.age,
        gender: newUser.gender,
        condition: newUser.condition,
        objective: newUser.objective,
      },
    });
  } catch (error) {
    console.error("Error en register:", error);
    return res.status(500).json({ message: "Error al registrar usuario" });
  }
};

/**
 * PROFILE
 * Devuelve los datos del usuario autenticado
 */
export const profile = (req, res) => {
  try {
    const user = req.user; // viene del middleware de autenticación JWT
    if (!user) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error en profile:", error);
    return res.status(500).json({ message: "Error al obtener perfil" });
  }
};

/**
 * LOGOUT
 * Limpia el token (solo si lo guardás en cookies)
 */
export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Logout exitoso" });
  } catch (error) {
    console.error("Error en logout:", error);
    return res.status(500).json({ message: "Error al cerrar sesión" });
  }
};
