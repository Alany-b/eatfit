import { check } from "express-validator";

export const userProfileValidation = [
  check("user_email")
    .exists({ checkFalsy: true })
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ser un email válido"),

  check("edad")
    .optional()
    .isInt({ min: 0, max: 120 })
    .withMessage("Edad debe ser un número entero entre 0 y 120"),

  check("genero")
    .optional()
    .isIn(["masculino", "femenino", "otro", "prefiero_no_decir"])
    .withMessage("Género no válido"),

  check("tiene_condicion").optional().isBoolean().withMessage("tiene_condicion debe ser booleano"),

  check("condicion")
    .optional()
    .isIn([
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
    ])
    .withMessage("Condición no válida"),

  check("condicion_otro").optional().isString().trim(),

  check("objetivo")
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
