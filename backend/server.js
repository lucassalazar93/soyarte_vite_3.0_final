require("dotenv").config(); // ✅ 1. Variables de entorno

// ✅ 2. Librerías
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const db = require("./config/db");

// ✅ 3. Inicializar servidor
const app = express();

// ✅ 4. Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ 5. Crear carpetas necesarias si no existen
const carpetas = ["imagenes-tienda", "imagenes-blog"]; // CORREGIDO
carpetas.forEach((folder) => {
  const fullPath = path.join(__dirname, "uploads", folder);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`📁 Carpeta creada: uploads/${folder}`);
  }
});

// ✅ 6. Archivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ 7. Importar rutas
const adminRoutes             = require("./routes/admin.routes");
const productosRoutes         = require("./routes/productos.routes");
const recetasRoutes           = require("./routes/recetas.routes");
const diarioRoutes            = require("./routes/diario.routes");
const loginRoutes             = require("./routes/login.routes");
const ventasRoutes            = require("./routes/ventas.routes");
const resenasRoutes           = require("./routes/resenas.routes");
const ordenesRoutes           = require("./routes/ordenes.routes");
const usuariosRoutes          = require("./routes/usuarios.routes");
const gruposTiendaRoutes      = require("./routes/grupos.routes");
const categoriasTiendaRoutes  = require("./routes/categorias.routes");
const gruposRecetasRoutes     = require("./routes/gruposRecetas.routes");
const categoriasRecetasRoutes = require("./routes/categoriasRecetas.routes");
const utensiliosRoutes        = require("./routes/utensilios.routes");
const blogRoutes              = require("./routes/blog.routes");
const comentariosRoutes       = require("./routes/comentarios.routes");
const redSanadoraRoutes       = require("./routes/redSanadora.routes");

// ✅ 8. Registrar rutas
app.use("/api/admin",              adminRoutes);
app.use("/api/productos",          productosRoutes);
app.use("/api/recetas",            recetasRoutes);
app.use("/api/diario",             diarioRoutes);
app.use("/api",                    loginRoutes);
app.use("/api/ventas",             ventasRoutes);
app.use("/api/resenas",            resenasRoutes);
app.use("/api/ordenes",            ordenesRoutes);
app.use("/api/usuarios",           usuariosRoutes);
app.use("/api/grupos",             gruposTiendaRoutes);
app.use("/api/categorias",         categoriasTiendaRoutes);
app.use("/api/grupos/recetas",     gruposRecetasRoutes);
app.use("/api/categorias/recetas", categoriasRecetasRoutes);
app.use("/api/utensilios",         utensiliosRoutes);
app.use("/api/blog",               blogRoutes);
app.use("/api/comentarios-blog",   comentariosRoutes);
app.use("/api/red-sanadora",       redSanadoraRoutes);

// ✅ 9. Verificar conexión a base de datos
async function verificarConexion() {
  try {
    await db.query("SELECT 1");
    console.log("✅ Conexión a la base de datos establecida correctamente.");
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error.message);
    process.exit(1);
  }
}
verificarConexion();

// ✅ 10. Ruta de prueba raíz
app.get("/", (req, res) => {
  res.send("🚀 ¡Servidor funcionando correctamente!");
});

// ✅ 11. Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
});
