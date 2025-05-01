const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Obtener todos los comentarios (admin)
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM comentarios_blog ORDER BY fecha DESC");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener comentarios:", error);
    res.status(500).json({ error: "Error al obtener comentarios" });
  }
});

// ✅ Obtener solo comentarios visibles (admin o frontend)
router.get("/visibles", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM comentarios_blog WHERE visible = 1 ORDER BY fecha DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener comentarios visibles:", error);
    res.status(500).json({ error: "Error al obtener comentarios visibles" });
  }
});

// ✅ Obtener comentarios por slug del post (para usuarios)
router.get("/slug/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const [postRows] = await db.query(
      "SELECT post_id FROM entradas_blog WHERE slug = ? LIMIT 1",
      [slug]
    );

    if (postRows.length === 0) {
      return res.status(404).json({ error: "Entrada no encontrada" });
    }

    const postId = postRows[0].post_id;

    const [comentarios] = await db.query(
      "SELECT * FROM comentarios_blog WHERE post_id = ? AND visible = 1 ORDER BY fecha DESC",
      [postId]
    );

    res.json(comentarios);
  } catch (error) {
    console.error("Error al obtener comentarios por slug:", error);
    res.status(500).json({ error: "Error al obtener comentarios por slug" });
  }
});

// ✅ Crear nuevo comentario desde frontend (recibe slug)
router.post("/", async (req, res) => {
  const { texto, calificacion, slug } = req.body;

  if (!texto || !calificacion || !slug) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  try {
    const [postRows] = await db.query(
      "SELECT post_id FROM entradas_blog WHERE slug = ? LIMIT 1",
      [slug]
    );

    if (postRows.length === 0) {
      return res.status(404).json({ error: "Entrada no encontrada" });
    }

    const postId = postRows[0].post_id;

    const [result] = await db.query(
      "INSERT INTO comentarios_blog (post_id, texto, calificacion, visible, fecha) VALUES (?, ?, ?, 1, NOW())",
      [postId, texto, calificacion]
    );

    res.status(201).json({ message: "Comentario agregado", id: result.insertId });
  } catch (error) {
    console.error("Error al agregar comentario:", error);
    res.status(500).json({ error: "Error al agregar comentario" });
  }
});

// ✅ Cambiar visibilidad (mostrar/ocultar) desde admin
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { visible } = req.body;
  try {
    await db.query("UPDATE comentarios_blog SET visible = ? WHERE id = ?", [visible, id]);
    res.json({ message: "Visibilidad actualizada" });
  } catch (error) {
    console.error("Error al actualizar visibilidad:", error);
    res.status(500).json({ error: "Error al actualizar visibilidad" });
  }
});

module.exports = router;
