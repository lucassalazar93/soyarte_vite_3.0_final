// ✅ backend/seedRecetaBrownie.js
const db = require("./config/db");

async function insertarRecetaBrownie() {
  try {
    console.log("🍫 Insertando receta de Brownie reconfortante...");

    // ID válidos existentes (ajusta si necesitas)
    const grupo_id = 1;         // por ejemplo: "Cultura Gastronómica"
    const categoria_id = 9;     // por ejemplo: "Postres"

    const [resultado] = await db.query(`
      INSERT INTO recetas (
        titulo, descripcion, descripcion_larga, imagen,
        tiempo_preparacion, nivel_dificultad, autor, calificacion,
        video, audio, youtube_link, grupo_id, categoria_id,
        ingredientes, preparacion, es_paga, bloqueada
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      "Brownie reconfortante",
      "Brownie húmedo con chips y aroma a hogar",
      "<p>Un postre perfecto para levantar el ánimo y reconectar con el alma. Cada bocado es una caricia dulce.</p>",
      "/uploads/imagenes-recetas/brownie.jpg", // asegúrate de que exista si deseas usar imagen
      40,
      "Fácil",
      "Lukas Salazar",
      4.8,
      null, null, null,
      grupo_id,
      categoria_id,
      "<ul><li>2 huevos</li><li>1 taza de azúcar</li><li>1/2 taza de cacao</li><li>1/2 taza de harina</li></ul>",
      "<p>Mezcla todo con amor y hornea a 180°C durante 20-25 minutos.</p>",
      0,
      0
    ]);

    const recetaId = resultado.insertId;

    // Insertar pasos (sin imágenes por simplicidad)
    const pasos = [
      { numero: 1, descripcion: "Precalienta el horno a 180°C", tiempo: "5 min" },
      { numero: 2, descripcion: "Mezcla todos los ingredientes secos", tiempo: "4 min" },
      { numero: 3, descripcion: "Agrega los huevos y mezcla hasta integrar", tiempo: "5 min" },
      { numero: 4, descripcion: "Vierte en un molde y hornea", tiempo: "25 min" }
    ];

    for (const paso of pasos) {
      await db.query(`
        INSERT INTO pasos_receta (receta_id, numero_paso, descripcion, tiempo, imagen)
        VALUES (?, ?, ?, ?, ?)
      `, [recetaId, paso.numero, paso.descripcion, paso.tiempo, null]);
    }

    // Insertar utensilios relacionados (usa los ID existentes de tu tabla `utensilios`)
    const utensiliosIds = [1, 2, 3]; // Cucharón, Cuchara, Tenedor (ajusta según tus datos reales)

    for (const id of utensiliosIds) {
      await db.query(`
        INSERT INTO receta_utensilios (receta_id, utensilio_id)
        VALUES (?, ?)
      `, [recetaId, id]);
    }

    console.log("✅ Receta de brownie insertada con éxito (ID:", recetaId, ")");
    process.exit();
  } catch (error) {
    console.error("❌ Error al insertar receta:", error);
    process.exit(1);
  }
}

insertarRecetaBrownie();
