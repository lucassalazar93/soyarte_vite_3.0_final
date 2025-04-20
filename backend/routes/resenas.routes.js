const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ GET: Obtener todas las reseñas
router.get("/", (req, res) => {
  const sql = `
    SELECT id, nombre_usuario, calificacion, comentario, fecha
    FROM reseñas_generales
    ORDER BY fecha DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener reseñas:", err);
      return res.status(500).json({ error: "Error al cargar reseñas" });
    }

    res.json(results);
  });
});

// ✅ POST: Crear nueva reseña
router.post("/", (req, res) => {
  const { nombre_usuario, calificacion, comentario } = req.body;

  if (!nombre_usuario || !calificacion || !comentario) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const sql = `
    INSERT INTO reseñas_generales (nombre_usuario, calificacion, comentario)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [nombre_usuario, calificacion, comentario], (err, result) => {
    if (err) {
      console.error("❌ Error al guardar reseña:", err);
      return res.status(500).json({ error: "Error al guardar reseña" });
    }

    res.status(201).json({ message: "✅ Reseña guardada exitosamente", id: result.insertId });
  });
});

module.exports = router;
