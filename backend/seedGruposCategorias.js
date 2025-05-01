// backend/seedEntradasBlog.js
const pool = require("./config/db");

// ✅ Función para crear slugs amigables
const slugify = (texto) =>
  texto
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const blogs = [
  {
    titulo: "El arte de sanar a través de la cocina",
    resumen: "Descubre cómo un simple plato puede transformar emociones profundas.",
    pregunta: "¿Puede la cocina ser una terapia emocional?",
    contenido: "Desde tiempos ancestrales, el acto de cocinar ha sido un ritual de amor y sanación...",
    mini_historia: "Cuando preparé mi primer pan casero en un momento difícil, sentí que volvía a conectarme conmigo misma.",
    reflexion: "Sanar no siempre requiere palabras. A veces, un aroma o un sabor basta.",
    imagen: "/images/blog/infidelidad.png",
    video_url: "https://www.youtube.com/watch?v=video1",
    audio_url: "https://www.example.com/audio1.mp3",
    musica_url: "https://www.example.com/music1.mp3",
    youtube_embed: "https://www.youtube.com/embed/video1"
  },
  {
    titulo: "Cocinar en silencio: el poder de la introspección",
    resumen: "En el silencio de la cocina, muchas veces encontramos las respuestas.",
    pregunta: "¿Qué te dice tu alma cuando cocinas en silencio?",
    contenido: "La cocina puede convertirse en un refugio silencioso para meditar...",
    mini_historia: "Aprendí a valorar los momentos en que el único sonido era el hervor del agua.",
    reflexion: "El silencio también es una medicina.",
    imagen: "/images/blog/ejemplo2.jpg",
    video_url: "https://www.youtube.com/watch?v=video2",
    audio_url: "https://www.example.com/audio2.mp3",
    musica_url: "https://www.example.com/music2.mp3",
    youtube_embed: "https://www.youtube.com/embed/video2"
  },
  {
    titulo: "Recetas que abrazan el alma",
    resumen: "Más que recetas: son abrazos, memorias y emociones que se sirven en un plato.",
    pregunta: "¿Qué plato te recuerda a tu infancia?",
    contenido: "Las recetas de la abuela tienen el poder de transportarnos a otros tiempos...",
    mini_historia: "Un aroma a canela siempre me lleva de vuelta a mi niñez.",
    reflexion: "El amor puede tener sabor a canela.",
    imagen: "/images/blog/ejemplo3.jpg",
    video_url: "https://www.youtube.com/watch?v=video3",
    audio_url: "https://www.example.com/audio3.mp3",
    musica_url: "https://www.example.com/music3.mp3",
    youtube_embed: "https://www.youtube.com/embed/video3"
  },
  {
    titulo: "Sabor y memoria: cómo la comida reconstruye",
    resumen: "La comida tiene el poder de reconstruir puentes rotos en nuestro interior.",
    pregunta: "¿Has sentido cómo un plato te sana desde adentro?",
    contenido: "Comer algo preparado con amor puede ser más terapéutico que cualquier terapia...",
    mini_historia: "Una sopa caliente me reconcilió con mi historia.",
    reflexion: "Cada receta guarda una cicatriz y una esperanza.",
    imagen: "/images/blog/ejemplo4.jpg",
    video_url: "https://www.youtube.com/watch?v=video4",
    audio_url: "https://www.example.com/audio4.mp3",
    musica_url: "https://www.example.com/music4.mp3",
    youtube_embed: "https://www.youtube.com/embed/video4"
  },
  {
    titulo: "Cocinar para sanar: un acto de amor propio",
    resumen: "Cocinar para ti misma es un acto de amor y respeto profundo.",
    pregunta: "¿Te has cocinado para ti con amor?",
    contenido: "No necesitamos a nadie más para celebrar nuestro ser...",
    mini_historia: "La primera vez que cociné una cena solo para mí, lloré de amor propio.",
    reflexion: "Te mereces cada plato que prepares con amor.",
    imagen: "/images/blog/ejemplo5.jpg",
    video_url: "https://www.youtube.com/watch?v=video5",
    audio_url: "https://www.example.com/audio5.mp3",
    musica_url: "https://www.example.com/music5.mp3",
    youtube_embed: "https://www.youtube.com/embed/video5"
  },
  {
    titulo: "Cuando cocinar se convierte en ritual de sanación",
    resumen: "Cada corte, cada mezcla, cada cocción es un pequeño paso hacia tu bienestar.",
    pregunta: "¿Cómo ritualizas tu cocina?",
    contenido: "Ponerte tu música favorita mientras cocinas puede ser más sanador que cualquier remedio...",
    mini_historia: "Cantar mientras cocino me devuelve la sonrisa.",
    reflexion: "Ritualiza tu vida y verás magia donde antes solo veías rutina.",
    imagen: "/images/blog/ejemplo6.jpg",
    video_url: "https://www.youtube.com/watch?v=video6",
    audio_url: "https://www.example.com/audio6.mp3",
    musica_url: "https://www.example.com/music6.mp3",
    youtube_embed: "https://www.youtube.com/embed/video6"
  },
  {
    titulo: "Pequeños gestos en la cocina, grandes cambios en el alma",
    resumen: "Pequeños gestos en la cocina pueden significar grandes revoluciones emocionales.",
    pregunta: "¿Qué pequeño gesto en la cocina te ha cambiado el día?",
    contenido: "Pelar una naranja con calma puede reconectarte contigo mismo más de lo que imaginas...",
    mini_historia: "Una taza de chocolate caliente me reconcilió conmigo misma en un día gris.",
    reflexion: "El amor vive en los pequeños gestos.",
    imagen: "/images/blog/ejemplo7.jpg",
    video_url: "https://www.youtube.com/watch?v=video7",
    audio_url: "https://www.example.com/audio7.mp3",
    musica_url: "https://www.example.com/music7.mp3",
    youtube_embed: "https://www.youtube.com/embed/video7"
  }
];

// 🔥 Función principal para insertar los blogs
const seedEntradas = async () => {
  try {
    for (const blog of blogs) {
      const slug = slugify(blog.titulo);
      await pool.query(
        `INSERT INTO entradas_blog 
        (titulo, slug, resumen, pregunta, contenido, mini_historia, reflexion, imagen, video_url, audio_url, musica_url, youtube_embed) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          blog.titulo,
          slug,
          blog.resumen,
          blog.pregunta,
          blog.contenido,
          blog.mini_historia,
          blog.reflexion,
          blog.imagen,
          blog.video_url,
          blog.audio_url,
          blog.musica_url,
          blog.youtube_embed
        ]
      );
    }
    console.log("✅ Seed de blogs creado exitosamente.");
    process.exit();
  } catch (error) {
    console.error("❌ Error al hacer seed:", error.message);
    process.exit(1);
  }
};

seedEntradas();
