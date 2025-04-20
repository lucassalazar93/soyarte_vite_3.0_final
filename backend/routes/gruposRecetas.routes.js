// ✅ backend/routes/gruposRecetas.routes.js

const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// ✅ Obtener todos los grupos de recetas
router.get("/", async (req, res) => {
  try {
    const [grupos] = await pool.query(`
      SELECT grupo_id, nombre, slug, descripcion, banner_url, emoji
      FROM grupos_recetas
      ORDER BY nombre
    `);
    res.status(200).json(grupos);
  } catch (error) {
    console.error("❌ Error al obtener grupos de recetas:", error.message);
    res.status(500).json({ error: "Error al obtener los grupos de recetas" });
  }
});

// ✅ Crear un nuevo grupo de recetas
router.post("/", async (req, res) => {
  try {
    const { nombre, slug, descripcion, banner_url, emoji } = req.body;

    if (!nombre || !slug) {
      return res.status(400).json({ error: "Nombre y slug son obligatorios" });
    }

    await pool.query(
      `
      INSERT INTO grupos_recetas (nombre, slug, descripcion, banner_url, emoji)
      VALUES (?, ?, ?, ?, ?)
      `,
      [nombre, slug, descripcion, banner_url, emoji]
    );

    res.status(201).json({ mensaje: "✅ Grupo de recetas creado correctamente" });
  } catch (error) {
    console.error("❌ Error al crear grupo de recetas:", error.message);
    res.status(500).json({ error: "Error al crear grupo de recetas" });
  }
});

module.exports = router;
