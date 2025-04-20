
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

// ✅ 5. Crear carpeta para imágenes si no existe
const imagenesPath = path.join(__dirname, "uploads", "imagenes-tienda");
if (!fs.existsSync(imagenesPath)) {
  fs.mkdirSync(imagenesPath, { recursive: true });
  console.log("📁 Carpeta creada: uploads/imagenes-tienda");
}

// ✅ 6. Archivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ 7. Rutas de API
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
const utensiliosRoutes        = require("./routes/utensilios.routes"); // ✅ Ruta añadida

// ✅ 8. Registrar rutas
app.use("/api/admin",       adminRoutes);
app.use("/api/productos",   productosRoutes);
app.use("/api/recetas",     recetasRoutes);
app.use("/api/diario",      diarioRoutes);
app.use("/api",             loginRoutes);
app.use("/api/ventas",      ventasRoutes);
app.use("/api/resenas",     resenasRoutes);
app.use("/api/ordenes",     ordenesRoutes);
app.use("/api/usuarios",    usuariosRoutes);

// ✅ Tienda
app.use("/api/grupos",      gruposTiendaRoutes);
app.use("/api/categorias",  categoriasTiendaRoutes);

// ✅ Recetas (nuevas rutas específicas)
app.use("/api/grupos/recetas",     gruposRecetasRoutes);
app.use("/api/categorias/recetas", categoriasRecetasRoutes);

// ✅ Utensilios
app.use("/api/utensilios", utensiliosRoutes); // 🧪 Aquí se activa correctamente la ruta

// ✅ 9. Verificar conexión
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

// ✅ 10. Ruta de prueba
app.get("/", (req, res) => {
  res.send("🚀 ¡Servidor funcionando correctamente!");
});

// ✅ 11. Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
