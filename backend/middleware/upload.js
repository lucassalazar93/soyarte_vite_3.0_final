// ✅ Librerías necesarias
const multer = require("multer");
const path = require("path");

// ✅ Configurar dónde se guardarán las imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/imagenes-tienda"); // 🟢 Directorio personalizado
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // .jpg, .png, etc.
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "-").toLowerCase();
    const uniqueName = `${Date.now()}-${baseName}${ext}`; // 17012345678-blusa-floral.png
    cb(null, uniqueName);
  },
});

// ✅ Filtrar solo imágenes permitidas
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("❌ Solo se permiten imágenes JPG, PNG o WebP."), false);
  }
};

// ✅ Inicializar Multer con las opciones definidas
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Máximo 5MB
});

module.exports = upload;
