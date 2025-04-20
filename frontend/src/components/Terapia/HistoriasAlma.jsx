// HistoriasAlma.jsx
import React, { useState } from "react";
import "./HistoriasAlma.css";

const testimonios = [
  {
    frase:
      "Cocinar brownies con mi hija me devolvió la paz que había perdido. Entre aromas dulces y risas suaves, sané sin darme cuenta.",
    autor: "— Claudia, 42 años",
    emoji: "🍪"
  },
  {
    frase:
      "Preparar pan me ayudó a soltar el estrés. Amasar fue como meditar.",
    autor: "— Marta, 36 años",
    emoji: "🥖"
  },
  {
    frase:
      "Descubrí que cocinar con intención es una forma de recordarme que merezco cuidar de mí.",
    autor: "— Elena, 29 años",
    emoji: "🫶"
  }
];

const frasesCarrusel = [
  "Cocinar también es abrazar con el alma.",
  "A veces una receta guarda más que ingredientes.",
  "Cuidar a otros empieza por cuidar lo que cocinamos."
];

const HistoriasAlma = () => {
  const [recetaSeleccionada, setRecetaSeleccionada] = useState("");

  const handleSelectChange = (e) => {
    setRecetaSeleccionada(e.target.value);
  };

  return (
    <section className="historias-section">
      <h2 className="titulo-historias">🌼 Historias que sanan a fuego lento</h2>
      <p className="subtitulo-historias">
        La cocina también guarda historias. Aquí algunas que comenzaron con una receta... y terminaron sanando el alma.
      </p>

      <div className="frase-carrusel" id="fraseCarrusel"></div>

      <div className="grid-testimonios">
        {testimonios.map((t, i) => (
          <div className="tarjeta-testimonio" key={i}>
            <div className="emoji-testimonio">{t.emoji}</div>
            <p className="texto-testimonio">“{t.frase}”</p>
            <p className="autor-testimonio">{t.autor}</p>
          </div>
        ))}
      </div>

      <div className="formulario-historia">
        <h3>💖 ¿Te gustaría compartir tu historia?</h3>

        <textarea placeholder="¿Qué sentiste al cocinar esta receta?... 🌱✨" />

        <input
          type="text"
          placeholder="Nombre y edad (opcional)"
          className="input-nombre"
        />

        <select className="select-receta" onChange={handleSelectChange}>
          <option value="">¿Con qué receta se relaciona tu historia?</option>
          <option value="Brownies reconfortantes">🍪 Brownies reconfortantes</option>
          <option value="Pan artesanal">🥖 Pan artesanal</option>
          <option value="Infusión relajante">🍵 Infusión relajante</option>
          <option value="Sopa para el alma">🍲 Sopa para el alma</option>
          <option value="Otra">📝 Otra receta...</option>
        </select>

        {recetaSeleccionada === "Otra" && (
          <input
            type="text"
            className="input-nombre"
            placeholder="Escribe el nombre de la receta..."
          />
        )}

        <input type="file" accept="image/*" />

        <label className="checkbox-anonimo">
          <input type="checkbox" /> Publicar mi historia de forma anónima
        </label>

        <div className="boton-centrado">
          <button>❤️ Compartir mi historia</button>
        </div>

        <p className="nota-privacidad">
          Tu historia puede inspirar a otros. Compartiremos tu testimonio solo con tu consentimiento,
          y sin datos personales si así lo deseás.
        </p>

        <p className="frase-cierre">
          Porque cada emoción merece ser nutrida con amor. ✨
        </p>

        <p className="frase-apoyo">“Tu historia puede ser la chispa que reconecte a alguien más con su bienestar.”<br />Gracias por compartir con amor 💜</p>
      </div>
    </section>
  );
};

export default HistoriasAlma;