const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
const path = require("path");

// 📂 Configuración de Multer para almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Carpeta de destino
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName); // Nombre único del archivo
  },
});

const upload = multer({ storage });

/* =============================================================
   📝 POST: Crear nueva entrada en el diario emocional
   Ruta: POST /api/diario
   Params (form-data): imagen (file), user_id, titulo, emocion, receta, reflexion
   ============================================================= */
router.post("/diario", upload.single("imagen"), (req, res) => {
  const { user_id, titulo, emocion, receta, reflexion } = req.body;
  const imagen = req.file ? req.file.filename : null;

  if (!user_id || !titulo || !emocion) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const sql = `
    INSERT INTO diario_emocional (
      user_id, titulo, emocion, receta, reflexion, imagen
    ) VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [user_id, titulo, emocion, receta, reflexion, imagen],
    (err, result) => {
      if (err) {
        console.error("❌ Error al guardar entrada del diario:", err);
        return res.status(500).json({ error: "Error al guardar la entrada" });
      }
      res.status(201).json({
        message: "✅ Entrada guardada correctamente",
        id: result.insertId,
      });
    }
  );
});

/* =============================================================
   📖 GET: Obtener entradas del diario por usuario
   Ruta: GET /api/diario/:userId
   ============================================================= */
router.get("/diario/:userId", (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT id, titulo, emocion, receta, reflexion, imagen, fecha
    FROM diario_emocional
    WHERE user_id = ?
    ORDER BY fecha DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("❌ Error al obtener entradas del diario:", err);
      return res.status(500).json({ error: "Error al cargar entradas del diario" });
    }

    res.json(results);
  });
});

module.exports = router;
