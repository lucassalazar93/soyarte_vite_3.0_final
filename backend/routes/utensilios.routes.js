// ✅ backend/routes/utensilios.routes.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Ruta para obtener todos los utensilios
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM utensilios");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error al obtener utensilios:", err);
    res.status(500).json({ error: "Error al obtener utensilios" });
  }
});

module.exports = router;
