// ✅ backend/routes/categorias.routes.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// 📌 Obtener todas las categorías con su grupo
router.get("/", async (req, res) => {
  try {
    const [categorias] = await pool.query(`
      SELECT 
        c.categoria_id, 
        c.nombre, 
        c.descripcion, 
        g.nombre AS grupo_nombre,
        c.grupo_id
      FROM categorias c
      LEFT JOIN grupos g ON c.grupo_id = g.grupo_id
      ORDER BY c.nombre
    `);
    res.json(categorias);
  } catch (error) {
    console.error("❌ Error al obtener categorías:", error.message);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
});

// 📌 Crear nueva categoría
router.post("/", async (req, res) => {
  try {
    const { nombre, descripcion, grupo_id } = req.body;

    if (!nombre || !grupo_id) {
      return res.status(400).json({ error: "Nombre y grupo_id son obligatorios" });
    }

    await pool.query(
      "INSERT INTO categorias (nombre, descripcion, grupo_id) VALUES (?, ?, ?)",
      [nombre, descripcion, grupo_id]
    );

    res.json({ mensaje: "✅ Categoría creada correctamente" });
  } catch (error) {
    console.error("❌ Error al crear categoría:", error.message);
    res.status(500).json({ error: "Error al crear categoría" });
  }
});

// 📌 Actualizar categoría existente
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, grupo_id } = req.body;

    if (!nombre || !grupo_id) {
      return res.status(400).json({ error: "Nombre y grupo_id son obligatorios" });
    }

    await pool.query(
      "UPDATE categorias SET nombre = ?, descripcion = ?, grupo_id = ? WHERE categoria_id = ?",
      [nombre, descripcion, grupo_id, id]
    );

    res.json({ mensaje: "✏️ Categoría actualizada correctamente" });
  } catch (error) {
    console.error("❌ Error al actualizar categoría:", error.message);
    res.status(500).json({ error: "Error al actualizar categoría" });
  }
});

// 📌 Eliminar categoría
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM categorias WHERE categoria_id = ?", [id]);
    res.json({ mensaje: "🗑️ Categoría eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar categoría:", error.message);
    res.status(500).json({ error: "Error al eliminar categoría" });
  }
});

module.exports = router;
