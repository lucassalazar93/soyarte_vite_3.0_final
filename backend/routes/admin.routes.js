const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../config/db");

const router = express.Router();

/**
 * 📌 REGISTRO de usuarias y administradoras
 */
router.post("/register", async (req, res) => {
  try {
    const {
      full_name,
      id_number,
      email,
      password,
      gender,
      fecha_nacimiento,
      role = "usuario",
      admin_code,
    } = req.body;

    if (!full_name || !email || !password || !gender || !fecha_nacimiento) {
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    if (role === "admin" && admin_code !== "ARTE2025") {
      return res.status(403).json({ error: "Código secreto incorrecto para administradoras." });
    }

    const [adminExists] = await pool.query(
      "SELECT Admin_id FROM administradores WHERE email = ?",
      [email]
    );

    const [userExists] = await pool.query(
      "SELECT User_id FROM usuarios WHERE email = ?",
      [email]
    );

    if (adminExists.length > 0 || userExists.length > 0) {
      return res.status(400).json({ error: "Este correo ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "admin") {
      await pool.query(
        `INSERT INTO administradores 
          (nombre_completo, email, password, fecha_nacimiento, genero, role) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [full_name, email, hashedPassword, fecha_nacimiento, gender, "admin"]
      );
    } else {
      await pool.query(
        `INSERT INTO usuarios 
          (nombre_completo, cedula, email, fecha_nacimiento, genero, password, role) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [full_name, id_number, email, fecha_nacimiento, gender, hashedPassword, role]
      );
    }

    return res.status(201).json({ message: "🎉 Registro exitoso" });
  } catch (error) {
    console.error("❌ Error en el registro:", error);
    return res.status(500).json({ error: error.message || "Error interno del servidor." });
  }
});

/**
 * ✅ Obtener todas las usuarias
 */
router.get("/usuarios", async (req, res) => {
  try {
    const [usuarios] = await pool.query(
      `SELECT User_id, nombre_completo, email, fecha_nacimiento, genero, role 
       FROM usuarios ORDER BY fecha_creacion DESC`
    );
    res.json({ usuarios });
  } catch (error) {
    console.error("❌ Error al obtener usuarias:", error.message);
    res.status(500).json({ error: "Error al obtener usuarias." });
  }
});

/**
 * ✅ Obtener todas las administradoras
 */
router.get("/administradores", async (req, res) => {
  try {
    const [admins] = await pool.query(
      `SELECT Admin_id, nombre_completo, email, fecha_nacimiento, genero, role, fecha_creacion 
       FROM administradores ORDER BY fecha_creacion DESC`
    );
    res.json({ admins });
  } catch (error) {
    console.error("❌ Error al obtener administradoras:", error.message);
    res.status(500).json({ error: "Error al obtener administradoras." });
  }
});

module.exports = router;
