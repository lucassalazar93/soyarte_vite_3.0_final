// backend/middleware/auth.js

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization"); // 📌 Leer token del header

  if (!token) {
    return res.status(401).json({ error: "Acceso denegado, token requerido" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // 📌 Verifica el token con la clave secreta
    req.admin = verified; // 📌 Adjunta el admin decodificado al request
    next(); // ✅ Continúa con la siguiente función
  } catch (error) {
    res.status(400).json({ error: "Token inválido" });
  }
};
