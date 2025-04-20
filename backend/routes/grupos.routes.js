const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// 📌 Obtener todos los grupos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM grupos ORDER BY nombre");
    res.json(rows);
  } catch (error) {
    console.error("❌ Error al obtener grupos:", error.message);
    res.status(500).json({ error: "Error al obtener grupos" });
  }
});

// 📌 Obtener grupo por slug (para uso dinámico en /coleccion/:slug)
router.get("/slug/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM grupos WHERE slug = ?", [slug]);
    if (rows.length === 0) {
      return res.status(404).json({ mensaje: "Grupo no encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("❌ Error al buscar grupo por slug:", error.message);
    res.status(500).json({ error: "Error al buscar grupo" });
  }
});

// 📌 Crear nuevo grupo
router.post("/", async (req, res) => {
  try {
    const { nombre, descripcion, slug, banner_url, emoji } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: "El nombre del grupo es obligatorio" });
    }

    await pool.query(
      "INSERT INTO grupos (nombre, descripcion, slug, banner_url, emoji) VALUES (?, ?, ?, ?, ?)",
      [nombre, descripcion || null, slug || null, banner_url || null, emoji || null]
    );

    res.json({ mensaje: "✅ Grupo creado correctamente" });
  } catch (error) {
    console.error("❌ Error al crear grupo:", error.message);
    res.status(500).json({ error: "Error al crear grupo" });
  }
});

// 📌 Editar grupo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, slug, banner_url, emoji } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: "El nombre del grupo es obligatorio" });
    }

    await pool.query(
      `UPDATE grupos 
       SET nombre = ?, descripcion = ?, slug = ?, banner_url = ?, emoji = ?
       WHERE grupo_id = ?`,
      [nombre, descripcion || null, slug || null, banner_url || null, emoji || null, id]
    );

    res.json({ mensaje: "✏️ Grupo actualizado correctamente" });
  } catch (error) {
    console.error("❌ Error al actualizar grupo:", error.message);
    res.status(500).json({ error: "Error al actualizar grupo" });
  }
});

// 📌 Eliminar grupo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM grupos WHERE grupo_id = ?", [id]);
    res.json({ mensaje: "🗑️ Grupo eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar grupo:", error.message);
    res.status(500).json({ error: "Error al eliminar grupo" });
  }
});

module.exports = router;
