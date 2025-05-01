// seedEntradasBlog.js

const pool = require("./config/db");

async function insertarEntradasBlog() {
  try {
    const entradas = [
      {
        titulo: "El poder de cocinar para ti misma 🌸",
        resumen: "Descubre cómo la cocina puede convertirse en un acto profundo de amor propio.",
        pregunta: "¿Qué receta representa tu momento de mayor amor propio?",
        contenido: `<p>Cocinar para uno mismo es un acto de respeto y cariño. No es un lujo, es un derecho emocional. ¿Te animas a prepararte tu plato favorito esta semana?</p>`,
        mini_historia: "Una noche solitaria, una sopa casera me abrazó más que mil palabras.",
        reflexion: "Cuidarnos en lo simple también es sanar.",
        imagen: null,
        video_url: null,
        audio_url: null,
        musica_url: null,
        youtube_embed: null,
      },
      {
        titulo: "Cocinar en silencio: terapia para el alma 🍃",
        resumen: "El silencio y el aroma de la cocina pueden ser la mejor medicina.",
        pregunta: "¿Qué sientes cuando cocinas sin prisa, sin música, solo contigo?",
        contenido: `<p>En cada burbuja que hierve, en cada cuchillo que corta... en el silencio de la cocina, también florecen respuestas que no sabías que buscabas.</p>`,
        mini_historia: "Un pan casero amasado en silencio me enseñó a escuchar mi corazón.",
        reflexion: "El silencio no es vacío, es un lenguaje que cura.",
        imagen: null,
        video_url: null,
        audio_url: null,
        musica_url: null,
        youtube_embed: null,
      },
      {
        titulo: "Cuando una receta guarda un recuerdo 💌",
        resumen: "Cada receta familiar esconde una carta de amor no escrita.",
        pregunta: "¿Qué receta de tu infancia te lleva directo a un abrazo?",
        contenido: `<p>Una receta es más que instrucciones, es memoria líquida. Volver a preparar un platillo de tu niñez es reencontrarte con quien fuiste y quien sigues siendo.</p>`,
        mini_historia: "Mi abuela no decía te amo: lo demostraba en cada arepa que me preparaba.",
        reflexion: "A veces cocinar es abrazar a quienes extrañamos.",
        imagen: null,
        video_url: null,
        audio_url: null,
        musica_url: null,
        youtube_embed: null,
      },
    ];

    for (const entrada of entradas) {
      await pool.query(
        `INSERT INTO entradas_blog 
        (titulo, resumen, pregunta, contenido, mini_historia, reflexion, imagen, video_url, audio_url, musica_url, youtube_embed) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          entrada.titulo,
          entrada.resumen,
          entrada.pregunta,
          entrada.contenido,
          entrada.mini_historia,
          entrada.reflexion,
          entrada.imagen,
          entrada.video_url,
          entrada.audio_url,
          entrada.musica_url,
          entrada.youtube_embed,
        ]
      );
    }

    console.log("✅ Entradas de blog insertadas correctamente.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al insertar entradas:", error.message);
    process.exit(1);
  }
}

insertarEntradasBlog();
