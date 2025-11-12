export const SYSTEM_INSTRUCTIONS = `
Eres Fitty, un asistente de nutrición amigable y servicial con la personalidad de una manzana crujiente y sabelotodo. 
Tu propósito es ayudar a los usuarios con sus preguntas sobre salud, nutrición y la aplicación EatFit. 

**Reglas de Personalidad y Respuesta:**
1.  **Eres Fitty:** Preséntate y actúa siempre como Fitty. Eres positivo, alentador y siempre das consejos claros y fáciles de entender.
2.  **Confidencialidad de Fuentes:** Nunca reveles que eres un modelo de lenguaje o una IA. Nunca menciones la "documentación" ni expliques de dónde obtienes tu información. Simplemente responde a la pregunta del usuario de la mejor manera posible, como si el conocimiento fuera tuyo.
3.  **No Cites Fragmentos:** No utilices el formato "[Fragmento: ...]" en tus respuestas. La información debe fluir de manera natural.
4.  **Enfócate en Ayudar:** Tu objetivo es proporcionar respuestas útiles y directas.
5.  **Idioma:** Responde siempre en español.

**Estructura de Respuesta de Dos Partes:**
1.  **Respuesta Completa:** Primero, responde la pregunta del usuario de manera exhaustiva y clara, utilizando tu conocimiento general sobre salud y nutrición.
2.  **Conexión con EatFit:** Después de haber respondido por completo, añade un párrafo final que conecte la información con la aplicación EatFit. Explica brevemente cómo las funcionalidades de EatFit pueden ayudar al usuario con respecto a su consulta. Puedes usar frases como "Para ayudarte con esto, en EatFit te ofrecemos..." o "La aplicación EatFit tiene herramientas que pueden serte útiles para...".
`;

export const DOCUMENTATION_CONTEXT = `
// --- Fragmentos de la documentación de EatFit ---

**[Fragmento: Flujo de Usuario]**
1- El usuario ingresa a la aplicación y se encuentra con una interfaz moderna, llamativa y agradable. Posteriormente investiga la barra de navegación principal y se encuentra con las distintas secciones y apartados: alimentacion, energia, salud, habitos, objetivos. La página también tendrá botones de registro e inicio de sesión en la esquina superior derecha. Debajo de la barra de navegación, el usuario se encontrará con una serie de imágenes representativas a cada sección planteada, las cuales se irán moviendo en modo de carrusel.

**[Fragmento: Registro e Inicio de Sesión]**
El formulario de registro pedirá los datos de su nombre, su correo y contraseña al usuario, también tendrá la opción de registrarse con su cuenta de google si así lo desea. Para iniciar sesión, el usuario colocará su correo o nombre de usuario y su contraseña, también podría iniciar sesión con su cuenta de google.

**[Fragmento: Secciones - Alimentación]**
Sección la cual estará orientada a mostrar al usuario el objetivo de eafit y lo que le puede ofrecer con respecto a la alimentación, destacando la importancia del mismo con imágenes que muestran lo que una mala alimentación puede derivar.

**[Fragmento: Secciones - Energía]**
Sección orientada a mostrar al usuario que importancia tiene entender que la comida puede afectar directamente al nivel de energía que posee una persona.

**[Fragmento: Secciones - Salud y Necesidades Especiales]**
Sección orientada a mostrar al usuario que se encuentre con necesidades nutricionales especiales lo que la aplicación le brindara y el entendimiento de que detectar los alimentos que uno puede o no consumir a veces es dificil. Las necesidades nutricionales a tratar serán: La resistencia a la insulina, La celiaquía, La intolerancia a la lactosa, La intolerancia al gluten, La intolerancia a ciertos azúcares (JMAF, Aspartamo/aspartame, acesulfame, fructosa, azúcar de mesa).

**[Fragmento: Secciones - Objetivos]**
Sección orientada al entendimiento al usuario de que a veces uno no es capaz de cumplir con sus objetivos y muchas veces se frustra por el hecho de sentirse bajo de energía, con malestares fisicos, incomodidad con su cuerpo, o por una necesidad especial en su alimentación.

**[Fragmento: Funcionalidad - Orientación Personalizada]**
El usuario tendrá la posibilidad de elegir su orientación dentro de la aplicación. Si es una persona con alguna necesidad nutricional especial (como Celiaquía, Intolerancia a la lactosa, Intolerancia al gluten, Intolerancia a algún endulzante/azúcar, Hipertensión o Resistencia a la insulina), se encontrará con información dinámica acerca de su caso, se le presentarán consejos, alimentos con alto riesgo de afectar a la salud si son consumidos, platos o alimentos recomendados.

**[Fragmento: Funcionalidad - Identificar Patrones]**
Esta función se utiliza en busca de identificar patrones de alimentación para descubrir posibles alergias o malestares en usuarios que desconocen su origen. Opera recopilando información sobre alimentos consumidos y los síntomas posteriores (dolor de estómago, fatiga, etc.). La aplicación analiza estos datos para encontrar coincidencias. Aunque no diagnostica médicamente, orienta al usuario sobre qué alimentos evitar o moderar.

**[Fragmento: Funcionalidad - Tip Diario Personalizado]**
El sistema debe generar un tip diario automático según el rol del usuario, que se muestra en el dashboard principal y puede ser notificado vía app o correo. Los tips se gestionan desde una tabla o servicio en la base de datos y están asociados a un rol. El sistema elige uno aleatoriamente o según el progreso del usuario.

**[Fragmento: Pantalla de Registro - Trastornos/Enfermedades]**
Se incluye una pregunta opcional: "¿Tienes algún problema, trastorno o enfermedad relacionada con la alimentación?". Si selecciona "Sí", se despliega un subformulario con un campo desplegable que incluye: Anorexia nerviosa, Bulimia, Trastorno por atracón, Celiaquía, Intolerancia a la lactosa, Diabetes, Hipertensión, Hipercolesterolemia, Obesidad, y "Otro" (con campo de texto para especificar).

**[Fragmento: Pantalla de Registro - Objetivos]**
Si el usuario selecciona "No" a la pregunta de trastorno/enfermedad, se debe mostrar una pregunta alternativa: "¿Cuál es tu objetivo principal al usar EatFit?". Opciones sugeridas: 1. Informarme mas acerca de los alimentos, 2. Mejorar mis hábitos alimenticios, 3. Bajar de peso, 4. Subir de peso, 5. Mantener una alimentación equilibrada.

**[Fragmento: Sistema de Información Dinámica]**
Si el usuario indica una enfermedad o trastorno, el sistema debe mostrar información educativa y preventiva, incluyendo: Descripción general del trastorno, Consejos nutricionales personalizados (alimentos recomendados y a evitar), Consecuencias/riesgos de no seguir una dieta adecuada, y Tips de autocuidado/recursos profesionales (nutricionistas o guías oficiales). Si el usuario no posee ninguna condición, se deben mostrar tips personalizados según su objetivo declarado.
`;
