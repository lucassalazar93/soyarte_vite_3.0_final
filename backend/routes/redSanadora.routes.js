const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// ✅ Guardar contacto
router.post("/", async (req, res) => {
  const { nombre, correo, telefono } = req.body;
  if (!nombre) return res.status(400).json({ error: "El nombre es obligatorio." });

  try {
    await pool.query(
      "INSERT INTO red_sanadora (nombre, correo, telefono) VALUES (?, ?, ?)",
      [nombre, correo, telefono]
    );
    res.status(201).json({ success: true, mensaje: "Contacto guardado con éxito" });
  } catch (error) {
    console.error("❌ Error al guardar contacto:", error.message);
    res.status(500).json({ error: "Error al guardar contacto" });
  }
});

// ✅ Obtener todos los contactos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM red_sanadora ORDER BY fecha DESC");
    res.json(rows);
  } catch (error) {
    console.error("❌ Error al obtener contactos:", error.message);
    res.status(500).json({ error: "Error al obtener contactos" });
  }
});

// ✅ Actualizar estado del contacto
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  if (!estado) return res.status(400).json({ error: "El estado es obligatorio." });

  try {
    const [result] = await pool.query(
      "UPDATE red_sanadora SET estado = ? WHERE id = ?",
      [estado, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Contacto no encontrado." });
    }
    res.json({ success: true, mensaje: "Estado actualizado con éxito" });
  } catch (error) {
    console.error("❌ Error al actualizar estado:", error.message);
    res.status(500).json({ error: "Error al actualizar estado" });
  }
});

module.exports = router;
