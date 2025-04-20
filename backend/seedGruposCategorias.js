const pool = require("./config/db");

async function seedGruposYCategorias() {
  try {
    console.log("🧯 Desactivando claves foráneas...");
    await pool.query("SET FOREIGN_KEY_CHECKS = 0");

    console.log("🧹 Vaciando tablas con TRUNCATE...");
    await pool.query("TRUNCATE TABLE categorias");
    await pool.query("TRUNCATE TABLE grupos");

    console.log("🔒 Activando claves foráneas...");
    await pool.query("SET FOREIGN_KEY_CHECKS = 1");

    console.log("🌱 Insertando grupos...");
    await pool.query(`
      INSERT INTO grupos (nombre, descripcion) VALUES
      ("Cuidado personal", "Productos de belleza, higiene y bienestar personal."),
      ("Joyas", "Accesorios de lujo como anillos, aretes, collares y más."),
      ("Niñas", "Moda y accesorios para niñas pequeñas."),
      ("Adolescentes", "Estilo juvenil y dinámico para adolescentes."),
      ("Jóvenes y mujeres adultas", "Moda elegante y casual para mujeres jóvenes y adultas."),
      ("Zapatos", "Calzado cómodo, elegante y deportivo."),
      ("Accesorios", "Bolsos, gafas, sombreros y más.");
    `);

    console.log("🌱 Insertando categorías...");
    await pool.query(`
      INSERT INTO categorias (grupo_id, nombre, descripcion) VALUES
      (1, "Maquillaje", "Labiales, sombras, bases."),
      (1, "Cremas faciales", "Hidratantes, mascarillas."),
      (2, "Aretes", "Pendientes elegantes o casuales."),
      (2, "Collares", "Estilos únicos de collares."),
      (3, "Vestidos niña", "Vestidos elegantes o casuales."),
      (3, "Pijamas niña", "Ropa de dormir para niñas."),
      (4, "Outfits adolescentes", "Conjuntos casuales, urbanos y modernos."),
      (4, "Chaquetas y sudaderas", "Prendas con estilo juvenil."),
      (5, "Vestidos mujer", "Vestidos casuales y elegantes."),
      (5, "Blusas y tops mujer", "Moda versátil para mujeres."),
      (6, "Zapatillas", "Calzado deportivo y cómodo."),
      (6, "Botas", "Botines y botas altas."),
      (7, "Bolsos", "Morrales y carteras."),
      (7, "Gafas y sombreros", "Accesorios visuales para el día a día.");
    `);

    console.log("✅ Seed ejecutado correctamente.");
    process.exit();
  } catch (error) {
    console.error("❌ Error al hacer el seed:", error.message);
    process.exit(1);
  }
}

seedGruposYCategorias();
