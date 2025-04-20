const express = require("express");
const router = express.Router();
const db = require("../config/db");

// 📦 Registrar una nueva venta
router.post("/", (req, res) => {
  const { user_id, total, metodo_pago, productos } = req.body;

  const ventaQuery = `
    INSERT INTO ventas (user_id, total, metodo_pago)
    VALUES (?, ?, ?)
  `;

  db.query(ventaQuery, [user_id, total, metodo_pago], (err, result) => {
    if (err) {
      console.error("❌ Error al registrar venta:", err);
      return res.status(500).json({ error: "Error al registrar la venta" });
    }

    const ventaId = result.insertId;

    // ⚠️ Si también guardas productos por venta en otra tabla (ej. ordenes), aquí lo haces.

    res.status(201).json({ message: "✅ Venta registrada con éxito", ventaId });
  });
});

// 🧾 Obtener todas las ventas
router.get("/", (req, res) => {
  db.query("SELECT * FROM ventas ORDER BY fecha DESC", (err, results) => {
    if (err) {
      console.error("❌ Error al obtener ventas:", err);
      return res.status(500).json({ error: "Error del servidor" });
    }

    res.json(results);
  });
});

// 👤 Obtener ventas por usuario
router.get("/usuario/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT * FROM ventas 
    WHERE user_id = ? 
    ORDER BY fecha DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("❌ Error al obtener ventas del usuario:", err);
      return res.status(500).json({ error: "Error del servidor" });
    }

    res.json(results);
  });
});

module.exports = router;
