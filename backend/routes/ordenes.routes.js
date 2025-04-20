// backend/routes/ordenes.routes.js

const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Crear una nueva orden
router.post("/", (req, res) => {
  const { user_id, precio_total, estado = "pendiente" } = req.body;

  const sql = `
    INSERT INTO órdenes (user_id, precio_total, estado)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [user_id, precio_total, estado], (err, result) => {
    if (err) {
      console.error("❌ Error al crear la orden:", err);
      return res.status(500).json({ error: "Error al crear la orden" });
    }

    res.status(201).json({
      message: "✅ Orden creada exitosamente",
      order_id: result.insertId,
    });
  });
});

// ✅ Obtener todas las órdenes (vista administradora)
router.get("/", (req, res) => {
  const sql = `SELECT * FROM órdenes ORDER BY fecha_creación DESC`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener órdenes:", err);
      return res.status(500).json({ error: "Error al cargar órdenes" });
    }

    res.json(results);
  });
});

// ✅ Obtener órdenes por usuario
router.get("/usuario/:user_id", (req, res) => {
  const { user_id } = req.params;

  const sql = `SELECT * FROM órdenes WHERE user_id = ? ORDER BY fecha_creación DESC`;

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error("❌ Error al obtener órdenes del usuario:", err);
      return res.status(500).json({ error: "Error al cargar órdenes del usuario" });
    }

    res.json(results);
  });
});

// ✅ Actualizar el estado de una orden
router.put("/:order_id", (req, res) => {
  const { order_id } = req.params;
  const { estado } = req.body;

  const sql = `
    UPDATE órdenes
    SET estado = ?, fecha_actualización = CURRENT_TIMESTAMP
    WHERE order_id = ?
  `;

  db.query(sql, [estado, order_id], (err, result) => {
    if (err) {
      console.error("❌ Error al actualizar estado de la orden:", err);
      return res.status(500).json({ error: "Error al actualizar la orden" });
    }

    res.json({ message: "✅ Estado de orden actualizado correctamente" });
  });
});

// ✅ Eliminar una orden (opcional, se recomienda con validación previa)
router.delete("/:order_id", (req, res) => {
  const { order_id } = req.params;

  const sql = `DELETE FROM órdenes WHERE order_id = ?`;

  db.query(sql, [order_id], (err, result) => {
    if (err) {
      console.error("❌ Error al eliminar orden:", err);
      return res.status(500).json({ error: "Error al eliminar la orden" });
    }

    res.json({ message: "✅ Orden eliminada correctamente" });
  });
});

module.exports = router;
