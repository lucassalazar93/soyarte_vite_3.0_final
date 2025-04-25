const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
const path = require("path");

// ✅ Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads/imagenes-recetas"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });
const pasosUpload = upload.any();

// ✅ Obtener recetas aleatorias
router.get("/aleatorias", async (req, res) => {
  try {
    const [recetas] = await db.query(`
      SELECT r.*, g.nombre AS grupo_nombre, g.slug AS grupo_slug,
             c.nombre AS categoria_nombre, c.slug AS categoria_slug
      FROM recetas r
      LEFT JOIN grupos_recetas g ON r.grupo_id = g.grupo_id
      LEFT JOIN categorias_recetas c ON r.categoria_id = c.categoria_id
      WHERE r.grupo_id IS NOT NULL AND r.categoria_id IS NOT NULL
      ORDER BY RAND() LIMIT 3
    `);
    res.status(200).json(recetas || []);
  } catch (err) {
    console.error("❌ Error al obtener recetas aleatorias:", err);
    res.status(500).json({ error: "Error al cargar recetas aleatorias" });
  }
});

// ✅ Obtener todas las recetas
router.get("/", async (req, res) => {
  try {
    const [recetas] = await db.query(`
      SELECT r.*, g.nombre AS grupo_nombre, g.slug AS grupo_slug,
             c.nombre AS categoria_nombre, c.slug AS categoria_slug
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

// ✅ Crear receta
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

    const imagenesMap = {};
    if (req.files) {
      req.files.forEach(file => {
        imagenesMap[file.fieldname] = file.filename;
      });
    }

    const imagenPath = imagenesMap["imagen"] ? `/uploads/imagenes-recetas/${imagenesMap["imagen"]}` : null;

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

    let index = 0;
    while (req.body[`pasos[${index}][descripcion]`] !== undefined) {
      const desc = req.body[`pasos[${index}][descripcion]`];
      const tiempo = req.body[`pasos[${index}][tiempo]`];
      const imgKey = `imagen_paso_${index}`;
      const imgRuta = imagenesMap[imgKey] ? `/uploads/imagenes-recetas/${imagenesMap[imgKey]}` : null;

      await conn.query(`
        INSERT INTO pasos_receta (receta_id, numero_paso, descripcion, tiempo, imagen)
        VALUES (?, ?, ?, ?, ?)
      `, [recetaId, index + 1, desc, tiempo, imgRuta]);

      index++;
    }

    if (req.body["utensilios[]"]) {
      const utensilios = Array.isArray(req.body["utensilios[]"]) ? req.body["utensilios[]"] : [req.body["utensilios[]"]];
      for (const uId of utensilios) {
        await conn.query("INSERT INTO receta_utensilios (receta_id, utensilio_id) VALUES (?, ?)", [recetaId, uId]);
      }
    }

    await conn.commit();
    conn.release();
    res.status(201).json({ message: "✅ Receta guardada", id: recetaId });
  } catch (err) {
    await conn.rollback();
    conn.release();
    console.error("❌ Error al guardar receta:", err);
    res.status(500).json({ error: "Error al guardar receta" });
  }
});

// ✅ Editar receta
router.put("/:id", pasosUpload, async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const { id } = req.params;
    const {
      titulo, descripcion, descripcion_larga, tiempo_preparacion,
      nivel_dificultad, autor = "Anónimo", calificacion = 5,
      video, audio, youtube_link, grupo_id, categoria_id,
      ingredientes, preparacion, es_paga = 0, bloqueada = 0
    } = req.body;

    const imagenesMap = {};
    if (req.files) {
      req.files.forEach(file => {
        imagenesMap[file.fieldname] = file.filename;
      });
    }

    const [prev] = await conn.query("SELECT imagen FROM recetas WHERE id = ?", [id]);
    const imagenPath = imagenesMap["imagen"] ? `/uploads/imagenes-recetas/${imagenesMap["imagen"]}` : prev[0]?.imagen || null;

    await conn.query(`
      UPDATE recetas SET 
        titulo=?, descripcion=?, descripcion_larga=?, imagen=?,
        tiempo_preparacion=?, nivel_dificultad=?, autor=?, calificacion=?,
        video=?, audio=?, youtube_link=?, grupo_id=?, categoria_id=?,
        ingredientes=?, preparacion=?, es_paga=?, bloqueada=?
      WHERE id=?
    `, [
      titulo, descripcion, descripcion_larga, imagenPath,
      tiempo_preparacion, nivel_dificultad, autor, calificacion,
      video, audio, youtube_link, grupo_id, categoria_id,
      ingredientes, preparacion, es_paga, bloqueada, id
    ]);

    await conn.query("DELETE FROM pasos_receta WHERE receta_id = ?", [id]);

    let index = 0;
    while (req.body[`pasos[${index}][descripcion]`] !== undefined) {
      const desc = req.body[`pasos[${index}][descripcion]`];
      const tiempo = req.body[`pasos[${index}][tiempo]`];
      const imgKey = `imagen_paso_${index}`;
      const imgRuta = imagenesMap[imgKey] ? `/uploads/imagenes-recetas/${imagenesMap[imgKey]}` : null;

      await conn.query(`
        INSERT INTO pasos_receta (receta_id, numero_paso, descripcion, tiempo, imagen)
        VALUES (?, ?, ?, ?, ?)
      `, [id, index + 1, desc, tiempo, imgRuta]);

      index++;
    }

    await conn.query("DELETE FROM receta_utensilios WHERE receta_id = ?", [id]);

    if (req.body["utensilios[]"]) {
      const utensilios = Array.isArray(req.body["utensilios[]"]) ? req.body["utensilios[]"] : [req.body["utensilios[]"]];
      for (const uId of utensilios) {
        await conn.query("INSERT INTO receta_utensilios (receta_id, utensilio_id) VALUES (?, ?)", [id, uId]);
      }
    }

    await conn.commit();
    conn.release();
    res.status(200).json({ message: "✅ Receta actualizada" });
  } catch (err) {
    await conn.rollback();
    conn.release();
    console.error("❌ Error al actualizar receta:", err);
    res.status(500).json({ error: "Error al actualizar receta" });
  }
});

// ✅ Eliminar receta
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query("DELETE FROM pasos_receta WHERE receta_id = ?", [id]);
    await conn.query("DELETE FROM receta_utensilios WHERE receta_id = ?", [id]);
    await conn.query("DELETE FROM recetas WHERE id = ?", [id]);

    await conn.commit();
    conn.release();
    res.status(200).json({ message: "🗑️ Receta eliminada correctamente" });
  } catch (err) {
    await conn.rollback();
    conn.release();
    console.error("❌ Error al eliminar receta:", err);
    res.status(500).json({ error: "Error al eliminar receta" });
  }
});

// ✅ Obtener receta individual
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [recetas] = await db.query(`
      SELECT r.*, g.nombre AS grupo_nombre, g.slug AS grupo_slug,
             c.nombre AS categoria_nombre, c.slug AS categoria_slug
      FROM recetas r
      LEFT JOIN grupos_recetas g ON r.grupo_id = g.grupo_id
      LEFT JOIN categorias_recetas c ON r.categoria_id = c.categoria_id
      WHERE r.id = ?
    `, [id]);

    if (recetas.length === 0) return res.status(404).json({ error: "Receta no encontrada" });

    const receta = recetas[0];
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

module.exports = router;
