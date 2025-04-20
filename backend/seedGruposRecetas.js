// backend/seedGruposRecetas.js
const pool = require("./config/db");

async function seedGruposYCategoriasRecetas() {
  try {
    console.log("🧯 Desactivando claves foráneas...");
    await pool.query("SET FOREIGN_KEY_CHECKS = 0");

    console.log("🧹 Vaciando tablas de recetas...");
    await pool.query("TRUNCATE TABLE categorias_recetas");
    await pool.query("TRUNCATE TABLE grupos_recetas");

    console.log("🔒 Activando claves foráneas...");
    await pool.query("SET FOREIGN_KEY_CHECKS = 1");

    console.log("🌱 Insertando grupos_recetas...");
    await pool.query(`
      INSERT INTO grupos_recetas (nombre, slug, descripcion, banner_url, emoji) VALUES
      ('Cultura Gastronómica', 'cultura-gastronomica', 'Recetas agrupadas por tradición y país.', '/img/recetas/gastronomia.jpg', '🍲'),
      ('Técnicas de Cocina', 'tecnicas-cocina', 'Recetas organizadas por tipo de cocción o preparación.', '/img/recetas/tecnicas.jpg', '🔪'),
      ('Tipo de Plato', 'tipo-de-plato', 'Entradas, platos fuertes, postres y más.', '/img/recetas/platos.jpg', '🍽️'),
      ('Estilo de Vida', 'estilo-de-vida', 'Recetas para estilos de vida especiales como vegano, saludable o económico.', '/img/recetas/estilos.jpg', '🌱');
    `);

    console.log("🌱 Insertando categorias_recetas...");
    await pool.query(`
      INSERT INTO categorias_recetas (grupo_id, nombre, slug, descripcion) VALUES
      (1, 'Italiana', 'italiana', 'Pizzas, pastas y sabores del mediterráneo.'),
      (1, 'Mexicana', 'mexicana', 'Tacos, enchiladas y sazón tradicional.'),
      (1, 'Colombiana', 'colombiana', 'Arepas, ajiacos y platos típicos.'),
      (2, 'Frituras', 'frituras', 'Técnicas con aceite y crocancia.'),
      (2, 'Al horno', 'al-horno', 'Preparaciones al calor seco.'),
      (2, 'Al vapor', 'al-vapor', 'Método de cocción suave y saludable.'),
      (3, 'Entrada', 'entrada', 'Recetas para iniciar una comida.'),
      (3, 'Plato fuerte', 'plato-fuerte', 'El plato central del menú.'),
      (3, 'Postres', 'postres', 'Dulces que conquistan el alma.'),
      (4, 'Vegan', 'vegan', 'Recetas libres de productos animales.'),
      (4, 'Saludable', 'saludable', 'Bajas en grasa, pensadas en el bienestar.'),
      (4, 'Económica', 'economica', 'Delicias accesibles para todos los bolsillos.');
    `);

    console.log("✅ Seed de grupos y categorías de recetas ejecutado correctamente.");
    process.exit();
  } catch (error) {
    console.error("❌ Error al ejecutar el seed:", error.message);
    process.exit(1);
  }
}

seedGruposYCategoriasRecetas();
