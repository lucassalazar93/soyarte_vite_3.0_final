const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const multer = require("multer");
const path = require("path");

// ✅ 1. Configuración de almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/imagenes-tienda");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// ✅ 2. Obtener todos los productos con sus categorías y grupos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.*, 
        c.nombre AS categoria_nombre, 
        c.slug AS categoria_slug,  -- 👈 NUEVO: lo que faltaba
        g.nombre AS grupo_nombre,
        g.slug AS grupo_slug
      FROM productos p
      LEFT JOIN categorias c ON p.categoria_id = c.categoria_id
      LEFT JOIN grupos g ON p.grupo_id = g.grupo_id
      ORDER BY g.nombre ASC, c.nombre ASC, p.nombre ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error.message);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// ✅ 3. Obtener categorías únicas
router.get("/categorias", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT DISTINCT c.nombre AS categoria
      FROM productos p
      LEFT JOIN categorias c ON p.categoria_id = c.categoria_id
      WHERE c.nombre IS NOT NULL
    `);
    res.json(rows);
  } catch (error) {
    console.error("❌ Error al obtener categorías:", error.message);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
});

// ✅ 4. Eliminar producto por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM productos WHERE product_id = ?", [id]);
    res.json({ success: true, mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error.message);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

// ✅ 5. Crear producto (con imagen y validación)
router.post("/", upload.single("imagen"), async (req, res) => {
  try {
    const {
      nombre,
      descripcion = "",
      precio,
      stock,
      categoria_id,
      grupo_id,
      oferta = 0,
      precio_oferta = 0,
    } = req.body;

    // Validación de campos requeridos
    if (!nombre || !precio || !stock || !categoria_id || !grupo_id) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const imagen = req.file ? `/uploads/imagenes-tienda/${req.file.filename}` : null;

    // Conversión de tipos (porque vienen como strings)
    await pool.query(
      `INSERT INTO productos 
        (nombre, descripcion, precio, stock, categoria_id, grupo_id, oferta, precio_oferta, imagen)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre,
        descripcion,
        parseFloat(precio),
        parseInt(stock),
        parseInt(categoria_id),
        parseInt(grupo_id),
        parseInt(oferta),
        parseFloat(precio_oferta),
        imagen,
      ]
    );

    res.json({ success: true, mensaje: "✅ Producto agregado correctamente" });
  } catch (error) {
    console.error("❌ Error al crear producto:", error.message);
    res.status(500).json({ error: "Error al crear producto" });
  }
});

// ✅ 6. Actualizar producto
router.put("/:id", upload.single("imagen"), async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    descripcion = "",
    precio,
    stock,
    categoria_id,
    grupo_id,
    oferta = 0,
    precio_oferta = 0,
  } = req.body;

  const imagen = req.file ? `/uploads/imagenes-tienda/${req.file.filename}` : null;

  try {
    const campos = [
      "nombre = ?",
      "descripcion = ?",
      "precio = ?",
      "stock = ?",
      "categoria_id = ?",
      "grupo_id = ?",
      "oferta = ?",
      "precio_oferta = ?",
    ];
    const valores = [
      nombre,
      descripcion,
      parseFloat(precio),
      parseInt(stock),
      parseInt(categoria_id),
      parseInt(grupo_id),
      parseInt(oferta),
      parseFloat(precio_oferta),
    ];

    if (imagen) {
      campos.push("imagen = ?");
      valores.push(imagen);
    }

    valores.push(id);

    await pool.query(
      `UPDATE productos SET ${campos.join(", ")} WHERE product_id = ?`,
      valores
    );

    res.json({ success: true, mensaje: "✅ Producto actualizado correctamente" });
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error.message);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
});

module.exports = router;
