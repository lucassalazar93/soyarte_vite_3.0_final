import React from "react";
import "./BloquesSanadores.css";

const bloques = [
  {
    icono: "🧘‍♀️",
    titulo: "Cocinar para calmar la ansiedad",
    descripcion: "Recetas simples y meditativas, con instrucciones pausadas.",
    tooltip: "Explora recetas que calman la ansiedad",
    link: "#recetas-calma"
  },
  {
    icono: "🫂",
    titulo: "Reconectar con tu niño/a interior",
    descripcion: "Preparaciones que despiertan ternura y memorias felices.",
    tooltip: "Conecta con tu esencia más dulce",
    link: "#recetas-ninez"
  },
  {
    icono: "☔️",
    titulo: "Cocinar en días difíciles",
    descripcion: "Comidas reconfortantes que abrazan el alma en tiempos retadores.",
    tooltip: "Recetas cálidas para momentos grises",
    link: "#recetas-confort"
  },
  {
    icono: "✨",
    titulo: "Cocinar con intención",
    descripcion: "Alimentos preparados con significado para momentos especiales.",
    tooltip: "Nutre tu propósito con cada bocado",
    link: "#recetas-intencion"
  }
];

const opciones = [
  {
    emoji: "😰",
    texto: "Me siento ansiosa",
    link: "#recetas-calma"
  },
  {
    emoji: "💔",
    texto: "Necesito consuelo",
    link: "#recetas-confort"
  },
  {
    emoji: "🤍",
    texto: "Busco conectar conmigo",
    link: "#recetas-intencion"
  },
  {
    emoji: "🌺",
    texto: "Quiero reconectar con mi niña interior",
    link: "#recetas-ninez"
  }
];

const BloquesSanadores = () => {
  return (
    <>
      <section className="bloques-sanadores">
        <h2 className="titulo-bloques">🌸 Cocinar también puede sanar</h2>
        <p className="subtitulo-bloques">
          Explora caminos culinarios que reconfortan el alma en distintos momentos de la vida.
        </p>

        <div className="bloques-grid">
          {bloques.map((bloque, index) => (
            <div className="tarjeta-bloque" key={index}>
              <div className="icono">{bloque.icono}</div>
              <h3>{bloque.titulo}</h3>
              <p>{bloque.descripcion}</p>
              <span className="tooltip">{bloque.tooltip}</span>
              <a href={bloque.link} className="btn-bloque">Ver recetas</a>
            </div>
          ))}
        </div>

        <p className="mensaje-final">
          Elige la receta que necesitas hoy. Tu cocina también es un refugio 💗<br />
          <span className="frase-extra">Porque cada emoción merece ser nutrida con amor.</span>
        </p>
      </section>

      <section className="test-emocional">
        <h2>❤️‍🩹 ¿Qué necesitas hoy?</h2>
        <p className="subtitulo-test">
          Elige el estado que más resuene contigo y explora recetas que lo acompañen.
        </p>

        <div className="opciones-test">
          {opciones.map((opcion, i) => (
            <a href={opcion.link} className="opcion-bloque" key={i}>
              <div className="emoji">{opcion.emoji}</div>
              <p>{opcion.texto}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
};

export default BloquesSanadores;
