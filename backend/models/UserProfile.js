import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema(
  {
    user_email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Debe ser un email válido"],
    },
    edad: {
      type: Number,
      min: [0, "La edad no puede ser negativa"],
      max: [120, "Edad no válida"],
    },
    genero: {
      type: String,
      enum: ["masculino", "femenino", "otro", "prefiero_no_decir"],
    },
    tiene_condicion: {
      type: Boolean,
      default: false,
    },
    condicion: {
      type: String,
      enum: [
        "anorexia_nerviosa",
        "bulimia",
        "trastorno_por_atracon",
        "celiaquia",
        "intolerancia_lactosa",
        "intolerancia_gluten",
        "diabetes",
        "hipertension",
        "hipercolesterolemia",
        "obesidad",
        "resistencia_insulina",
        "otro",
      ],
    },
    condicion_otro: {
      type: String,
      trim: true,
    },
    objetivo: {
      type: String,
      enum: [
        "informarme_alimentos",
        "mejorar_habitos",
        "bajar_peso",
        "subir_peso",
        "alimentacion_equilibrada",
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("UserProfile", UserProfileSchema);
