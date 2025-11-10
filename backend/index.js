import express from "express";
import cors from "cors";
import "dotenv/config";
import { startDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userProfileRoutes from "./routes/userProfileRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/profile", userProfileRoutes);

// Conectar a MongoDB
startDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});