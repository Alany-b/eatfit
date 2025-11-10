import { body } from "express-validator";

export const userProfileValidation = [
  body("user_email").isEmail().withMessage("Debe ser un email válido"),
  body("edad").optional().isInt({ min: 0, max: 120 }).withMessage("Edad no válida"),
  body("genero")
    .optional()
    .isIn(["masculino", "femenino", "otro", "prefiero_no_decir"])
    .withMessage("Género no válido"),
  body("objetivo")
    .optional()
    .isIn([
      "informarme_alimentos",
      "mejorar_habitos",
      "bajar_peso",
      "subir_peso",
      "alimentacion_equilibrada",
    ])
    .withMessage("Objetivo no válido"),
];
