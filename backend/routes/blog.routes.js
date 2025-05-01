const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 🔤 Generar slug SEO-friendly
const slugify = (texto) =>
  texto.toLowerCase().trim().replace(/[\s\W-]+/g, "-").replace(/^-+|-+$/g, "");

// 📁 Configurar almacenamiento en /uploads/imagenes-blog
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ruta = path.join(__dirname, "..", "uploads", "imagenes-blog");
    if (!fs.existsSync(ruta)) fs.mkdirSync(ruta, { recursive: true });
    cb(null, ruta);
  },
  filename: (req, file, cb) => {
    const nombreUnico = Date.now() + "-" + file.originalname.replace(/\s/g, "_");
    cb(null, nombreUnico);
  },
});

const upload = multer({ storage }).fields([
  { name: "imagen", maxCount: 1 },
  { name: "audio_url", maxCount: 1 },
  { name: "musica_url", maxCount: 1 },
]);

// ✅ Obtener artículos aleatorios
router.get("/aleatorios", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT post_id, titulo, slug, resumen, imagen 
      FROM entradas_blog 
      WHERE imagen IS NOT NULL 
      ORDER BY RAND() 
      LIMIT 3
    `);
    res.json(rows);
  } catch (error) {
    console.error("❌ Error al obtener aleatorios:", error.message);
    res.status(500).json({ error: "Error al obtener artículos aleatorios" });
  }
});

// ✅ Obtener todos los artículos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM entradas_blog ORDER BY fecha_creacion DESC");
    res.json(rows);
  } catch (error) {
    console.error("❌ Error al obtener entradas:", error.message);
    res.status(500).json({ error: "Error al obtener entradas" });
  }
});

// ✅ Obtener uno por slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const [rows] = await pool.query("SELECT * FROM entradas_blog WHERE slug = ?", [slug]);
    if (rows.length === 0) return res.status(404).json({ error: "No encontrada" });
    res.json(rows[0]);
  } catch (error) {
    console.error("❌ Error al obtener entrada:", error.message);
    res.status(500).json({ error: "Error al obtener entrada" });
  }
});

// ✅ Crear artículo
router.post("/", upload, async (req, res) => {
  try {
    const { titulo, resumen, pregunta, contenido, youtube_embed } = req.body;

    // ✅ Convertir strings a JSON si es necesario
    let mini_historia = req.body.mini_historia;
    let reflexion = req.body.reflexion;

    try {
      mini_historia = JSON.stringify(JSON.parse(mini_historia));
      reflexion = JSON.stringify(JSON.parse(reflexion));
    } catch (err) {
      console.warn("⚠️ mini_historia o reflexion no son JSON válidos, usando strings vacíos.");
      mini_historia = "[]";
      reflexion = "[]";
    }

    if (!titulo || !resumen || !contenido) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const slug = slugify(titulo);
    const imagen = req.files?.imagen ? `/uploads/imagenes-blog/${req.files.imagen[0].filename}` : null;
    const audio_url = req.files?.audio_url ? `/uploads/imagenes-blog/${req.files.audio_url[0].filename}` : null;
    const musica_url = req.files?.musica_url ? `/uploads/imagenes-blog/${req.files.musica_url[0].filename}` : null;

    await pool.query(
      `INSERT INTO entradas_blog 
      (titulo, slug, resumen, pregunta, contenido, mini_historia, reflexion, imagen, audio_url, musica_url, youtube_embed)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        titulo,
        slug,
        resumen,
        pregunta,
        contenido,
        mini_historia,
        reflexion,
        imagen,
        audio_url,
        musica_url,
        youtube_embed || null,
      ]
    );

    res.json({ success: true, mensaje: "✅ Entrada guardada correctamente" });
  } catch (error) {
    console.error("❌ Error al crear entrada:", error);
    res.status(500).json({ error: "Error al guardar entrada" });
  }
});

// ✅ Actualizar entrada
router.put("/:id", upload, async (req, res) => {
  const { id } = req.params;
  const { titulo, resumen, pregunta, contenido, youtube_embed } = req.body;
  const slug = slugify(titulo);

  let mini_historia = req.body.mini_historia;
  let reflexion = req.body.reflexion;

  try {
    mini_historia = JSON.stringify(JSON.parse(mini_historia));
    reflexion = JSON.stringify(JSON.parse(reflexion));
  } catch (err) {
    mini_historia = "[]";
    reflexion = "[]";
  }

  try {
    const campos = [
      "titulo = ?", "slug = ?", "resumen = ?", "pregunta = ?", "contenido = ?",
      "mini_historia = ?", "reflexion = ?", "youtube_embed = ?"
    ];
    const valores = [
      titulo, slug, resumen, pregunta, contenido,
      mini_historia, reflexion, youtube_embed
    ];

    if (req.files?.imagen) {
      campos.push("imagen = ?");
      valores.push(`/uploads/imagenes-blog/${req.files.imagen[0].filename}`);
    }
    if (req.files?.audio_url) {
      campos.push("audio_url = ?");
      valores.push(`/uploads/imagenes-blog/${req.files.audio_url[0].filename}`);
    }
    if (req.files?.musica_url) {
      campos.push("musica_url = ?");
      valores.push(`/uploads/imagenes-blog/${req.files.musica_url[0].filename}`);
    }

    valores.push(id);

    await pool.query(
      `UPDATE entradas_blog SET ${campos.join(", ")} WHERE post_id = ?`,
      valores
    );

    res.json({ success: true, mensaje: "✅ Entrada actualizada correctamente" });
  } catch (error) {
    console.error("❌ Error al actualizar entrada:", error);
    res.status(500).json({ error: "Error al actualizar entrada" });
  }
});

// ✅ Eliminar entrada
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM entradas_blog WHERE post_id = ?", [id]);
    res.json({ success: true, mensaje: "✅ Entrada eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar entrada:", error.message);
    res.status(500).json({ error: "Error al eliminar entrada" });
  }
});

module.exports = router;
