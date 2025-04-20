// ✅ backend/routes/categoriasRecetas.routes.js

const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// ✅ Obtener todas las categorías de recetas con su grupo
router.get("/", async (req, res) => {
  try {
    const [categorias] = await pool.query(`
      SELECT 
        c.categoria_id, 
        c.nombre, 
        c.slug, 
        c.descripcion, 
        g.nombre AS grupo_nombre, 
        g.slug AS grupo_slug
      FROM categorias_recetas c
      LEFT JOIN grupos_recetas g ON c.grupo_id = g.grupo_id
      ORDER BY c.nombre
    `);
    res.status(200).json(categorias);
  } catch (error) {
    console.error("❌ Error al obtener categorías de recetas:", error.message);
    res.status(500).json({ error: "Error al obtener las categorías de recetas" });
  }
});

// ✅ Crear una nueva categoría de receta
router.post("/", async (req, res) => {
  try {
    const { nombre, slug, descripcion, grupo_id } = req.body;

    if (!nombre || !slug || !grupo_id) {
      return res.status(400).json({ error: "Nombre, slug y grupo_id son obligatorios" });
    }

    await pool.query(
      `
      INSERT INTO categorias_recetas (grupo_id, nombre, slug, descripcion)
      VALUES (?, ?, ?, ?)
      `,
      [grupo_id, nombre, slug, descripcion]
    );

    res.status(201).json({ mensaje: "✅ Categoría de receta creada correctamente" });
  } catch (error) {
    console.error("❌ Error al crear categoría de receta:", error.message);
    res.status(500).json({ error: "Error al crear categoría de receta" });
  }
});

module.exports = router;
