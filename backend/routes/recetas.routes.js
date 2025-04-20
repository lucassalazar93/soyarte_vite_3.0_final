const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
const path = require("path");

// ✅ Configuración de almacenamiento para imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads/imagenes-recetas"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });
const pasosUpload = upload.any();

// ✅ Obtener todas las recetas
router.get("/", async (req, res) => {
  try {
    const [recetas] = await db.query(`
      SELECT 
        r.*, 
        g.nombre AS grupo_nombre, 
        g.slug AS grupo_slug,
        c.nombre AS categoria_nombre,
        c.slug AS categoria_slug
      FROM recetas r
      LEFT JOIN grupos_recetas g ON r.grupo_id = g.grupo_id
      LEFT JOIN categorias_recetas c ON r.categoria_id = c.categoria_id
      ORDER BY r.titulo ASC
    `);
    res.json(recetas);
  } catch (err) {
    console.error("❌ Error al obtener recetas:", err);
    res.status(500).json({ error: "Error al cargar recetas" });
  }
});

// ✅ Obtener receta individual con sus utensilios
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [recetas] = await db.query(`
      SELECT 
        r.*, 
        g.nombre AS grupo_nombre, 
        g.slug AS grupo_slug,
        c.nombre AS categoria_nombre,
        c.slug AS categoria_slug
      FROM recetas r
      LEFT JOIN grupos_recetas g ON r.grupo_id = g.grupo_id
      LEFT JOIN categorias_recetas c ON r.categoria_id = c.categoria_id
      WHERE r.id = ?
    `, [id]);

    if (recetas.length === 0) {
      return res.status(404).json({ error: "Receta no encontrada" });
    }

    const receta = recetas[0];

    // ✅ Obtener utensilios
    const [utensilios] = await db.query(`
      SELECT u.id, u.nombre, u.icono
      FROM receta_utensilios ru
      JOIN utensilios u ON ru.utensilio_id = u.id
      WHERE ru.receta_id = ?
    `, [id]);

    receta.utensilios = utensilios;

    res.json(receta);
  } catch (err) {
    console.error("❌ Error al obtener receta:", err);
    res.status(500).json({ error: "Error al cargar la receta" });
  }
});

// ✅ Obtener pasos de una receta
router.get("/:id/pasos", async (req, res) => {
  const { id } = req.params;
  try {
    const [pasos] = await db.query(
      "SELECT * FROM pasos_receta WHERE receta_id = ? ORDER BY numero_paso ASC",
      [id]
    );
    res.json(pasos);
  } catch (err) {
    console.error("❌ Error al obtener pasos:", err);
    res.status(500).json({ error: "Error al cargar los pasos" });
  }
});

// ✅ Crear nueva receta con pasos e imágenes
router.post("/", pasosUpload, async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const {
      titulo, descripcion, descripcion_larga, tiempo_preparacion,
      nivel_dificultad, autor = "Anónimo", calificacion = 5,
      video, audio, youtube_link, grupo_id, categoria_id,
      ingredientes, preparacion, es_paga = 0, bloqueada = 0
    } = req.body;

    // ✅ Mapear imágenes cargadas
    const imagenesMap = {};
    if (req.files && req.files.length) {
      req.files.forEach(file => {
        imagenesMap[file.fieldname] = file.filename;
      });
    }

    const imagenPrincipal = imagenesMap["imagen"] || null;
    const imagenPath = imagenPrincipal ? `/uploads/imagenes-recetas/${imagenPrincipal}` : null;

    // ✅ Insertar receta principal
    const [resultado] = await conn.query(`
      INSERT INTO recetas (
        titulo, descripcion, descripcion_larga, imagen,
        tiempo_preparacion, nivel_dificultad, autor, calificacion,
        video, audio, youtube_link, grupo_id, categoria_id,
        ingredientes, preparacion, es_paga, bloqueada
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      titulo, descripcion, descripcion_larga, imagenPath,
      tiempo_preparacion, nivel_dificultad, autor, calificacion,
      video, audio, youtube_link, grupo_id, categoria_id,
      ingredientes, preparacion, es_paga, bloqueada
    ]);

    const recetaId = resultado.insertId;

    // ✅ Insertar pasos
    let index = 0;
    while (req.body[`pasos[${index}][descripcion]`] !== undefined) {
      const descripcionPaso = req.body[`pasos[${index}][descripcion]`];
      const tiempo = req.body[`pasos[${index}][tiempo]`];
      const imagenCampo = `imagen_paso_${index}`;
      const imagenArchivo = imagenesMap[imagenCampo] || null;
      const rutaImagen = imagenArchivo ? `/uploads/imagenes-recetas/${imagenArchivo}` : null;

      await conn.query(`
        INSERT INTO pasos_receta (receta_id, numero_paso, descripcion, tiempo, imagen)
        VALUES (?, ?, ?, ?, ?)
      `, [recetaId, index + 1, descripcionPaso, tiempo, rutaImagen]);

      index++;
    }

    // ✅ Insertar utensilios
    if (req.body["utensilios[]"]) {
      const utensilios = Array.isArray(req.body["utensilios[]"])
        ? req.body["utensilios[]"]
        : [req.body["utensilios[]"]];

      for (const utensilioId of utensilios) {
        await conn.query(`
          INSERT INTO receta_utensilios (receta_id, utensilio_id)
          VALUES (?, ?)
        `, [recetaId, utensilioId]);
      }
    }

    await conn.commit();
    conn.release();
    res.status(201).json({ message: "✅ Receta y pasos guardados correctamente", id: recetaId });
  } catch (err) {
    await conn.rollback();
    conn.release();
    console.error("❌ Error al guardar receta con pasos:", err);
    res.status(500).json({ error: "Error al guardar receta" });
  }
});

// ✅ Obtener 3 recetas aleatorias reales
router.get("/aleatorias", async (req, res) => {
  try {
    const [recetas] = await db.query(`
      SELECT 
        r.*, 
        g.nombre AS grupo_nombre, 
        g.slug AS grupo_slug,
        c.nombre AS categoria_nombre,
        c.slug AS categoria_slug
      FROM recetas r
      LEFT JOIN grupos_recetas g ON r.grupo_id = g.grupo_id
      LEFT JOIN categorias_recetas c ON r.categoria_id = c.categoria_id
      WHERE r.grupo_id IS NOT NULL AND r.categoria_id IS NOT NULL
      ORDER BY RAND()
      LIMIT 3
    `);

    res.status(200).json(recetas || []);
  } catch (err) {
    console.error("❌ Error al obtener recetas aleatorias:", err);
    res.status(500).json({ error: "Error al cargar recetas aleatorias" });
  }
});

module.exports = router;
