import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { routes } from "./backend/routes/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT;

// Middlewares

app.use(cors({
    origin: 'http://localhost:5173' // o el puerto de tu frontend
}));


app.use(express.json());
app.use(express.static(path.join(__dirname, "./frontend/public")));

// Rutas API
app.use("/api", routes);



// Conexión DB y servidor

{
  app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
  });
};

