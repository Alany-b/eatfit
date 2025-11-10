import { UserModel } from "../models/user.model.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";

/**
 * LOGIN
 * Autentica un usuario y devuelve un token JWT
 */
export const login = async (req, res) => {
  try {
    // Accept either username or email as identifier in the request body
    const { username, email, password } = req.body;
    const identifier = username || email;

    if (!identifier || !password) {
      return res.status(400).json({ message: "Se requiere identificador y contraseña" });
    }

    // Buscar usuario por username o email
    const user = await UserModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

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
      username: user.username,
      name: user.name,
      lastname: user.lastname,
    });

    // Responder al frontend
    return res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        name: user.name,
        // lastname: user.lastname,
        username: user.username,
        email: user.email,
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
    const { name, username, email, password } = req.body;

    // Validar campos requeridos
    if (!name  || !username || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si el usuario ya existe
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Hashear la contraseña y crear nuevo usuario
    const hashed = await hashPassword(password);
    const newUser = new UserModel({
      name,
      username,
      email,
      password: hashed,
    });

    await newUser.save();

    return res.status(201).json({ message: "Usuario registrado exitosamente" });
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
