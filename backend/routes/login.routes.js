// routes/login.routes.js
const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcryptjs");

// 🔐 Login para usuarias y administradoras
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Correo y contraseña son obligatorios." });
  }

  try {
    const [usuarios] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?", [email.trim()]
    );

    const [admin] = await pool.query(
      "SELECT * FROM administradores WHERE email = ?", [email.trim()]
    );

    const user = usuarios[0] || admin[0];
    const source = usuarios[0] ? "usuarios" : admin[0] ? "administradores" : null;

    if (!user || !source) {
      return res.status(404).json({ error: "El correo no está registrado." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta." });
    }

    res.status(200).json({
      message: "Login exitoso",
      user: {
        id: user.User_id || user.Admin_id,
        name: user.nombre_completo,
        role: user.role || (source === "administradores" ? "admin" : "usuario"),
        email: user.email,
        genero: user.genero || null,
        fecha_nacimiento: user.fecha_nacimiento || null,
        source,
      },
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

module.exports = router;
