const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");

// 📌 Obtener todos los usuarios y administradores (ordenados por fecha más reciente)
router.get("/", async (req, res) => {
  try {
    const [usuarios] = await db.query(`
      SELECT 
        user_id AS id,
        nombre_completo,
        email,
        password,
        cedula,
        genero,
        fecha_nacimiento,
        fecha_creacion,
        fecha_actualizacion,
        role
      FROM usuarios
      UNION ALL
      SELECT 
        admin_id AS id,
        nombre_completo,
        email,
        password,
        NULL AS cedula,
        genero,
        fecha_nacimiento,
        fecha_creacion,
        NULL AS fecha_actualizacion,
        role
      FROM administradores
      ORDER BY fecha_creacion DESC
    `);
    res.json(usuarios);
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error.message);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// 📌 Crear nuevo usuario (solo usuarios, no administradores)
router.post("/", async (req, res) => {
  try {
    const {
      nombre_completo,
      email,
      password,
      cedula,
      genero,
      fecha_nacimiento,
      role = "usuario",
    } = req.body;

    if (!nombre_completo || !email || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Verificar si el email ya existe
    const [existe] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (existe.length > 0) {
      return res.status(400).json({ error: "Este correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      `INSERT INTO usuarios (nombre_completo, email, password, cedula, genero, fecha_nacimiento, role) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre_completo, email, hashedPassword, cedula, genero, fecha_nacimiento, role]
    );

    res.json({ mensaje: "Usuario creado correctamente" });
  } catch (error) {
    console.error("❌ Error al crear usuario:", error.message);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

// 📌 Editar usuario (solo usuarios, no administradores)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre_completo,
      email,
      password,
      cedula,
      genero,
      fecha_nacimiento,
      role,
    } = req.body;

    let updateFields = [];
    let updateValues = [];

    if (nombre_completo) {
      updateFields.push("nombre_completo = ?");
      updateValues.push(nombre_completo);
    }

    if (email) {
      updateFields.push("email = ?");
      updateValues.push(email);
    }

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updateFields.push("password = ?");
      updateValues.push(hashed);
    }

    if (cedula) {
      updateFields.push("cedula = ?");
      updateValues.push(cedula);
    }

    if (genero) {
      updateFields.push("genero = ?");
      updateValues.push(genero);
    }

    if (fecha_nacimiento) {
      updateFields.push("fecha_nacimiento = ?");
      updateValues.push(fecha_nacimiento);
    }

    if (role) {
      updateFields.push("role = ?");
      updateValues.push(role);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: "No hay campos para actualizar" });
    }

    updateValues.push(id);

    const sql = `UPDATE usuarios SET ${updateFields.join(", ")} WHERE user_id = ?`;
    await db.query(sql, updateValues);

    res.json({ mensaje: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("❌ Error al actualizar usuario:", error.message);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
});

// 📌 Eliminar usuario (solo usuarios)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM usuarios WHERE user_id = ?", [id]);
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error.message);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

module.exports = router;
