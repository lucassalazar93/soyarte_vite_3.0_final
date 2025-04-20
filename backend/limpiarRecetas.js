// ✅ backend/limpiarRecetas.js
const db = require("./config/db");

async function limpiarRecetas() {
  try {
    console.log("🧹 Limpiando recetas, pasos y relaciones...");

    await db.query("SET FOREIGN_KEY_CHECKS = 0");

    await db.query("TRUNCATE TABLE pasos_receta");
    await db.query("TRUNCATE TABLE receta_utensilios");
    await db.query("TRUNCATE TABLE recetas");

    await db.query("SET FOREIGN_KEY_CHECKS = 1");

    console.log("✅ Limpieza completada. La base está lista para nuevos datos.");
    process.exit();
  } catch (err) {
    console.error("❌ Error al limpiar recetas:", err);
    process.exit(1);
  }
}

limpiarRecetas();
