// ✅ src/components/Recetas/CierreReceta.jsx
import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  FaSave,
  FaUserCheck,
  FaStar,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
  FaYoutube,
  FaTelegramPlane,
  FaUpload,
  FaBookOpen,
  FaCheckCircle,
} from "react-icons/fa";

import "./CierreReceta.css";

const CierreReceta = () => {
  const [comentario, setComentario] = useState("");
  const [foto, setFoto] = useState(null);
  const [enviado, setEnviado] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleComentarioChange = (e) => setComentario(e.target.value);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setFoto(URL.createObjectURL(file));
  };

  const handleEnviar = () => {
    setEnviado(true);
    confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });

    setTimeout(() => {
      alert("🎉 ¡Gracias, chef! Tu receta fue guardada.");
    }, 500);
  };

  const handleRating = (value) => setRating(value);

  const handleVerCocinadas = () => {
    window.location.href = "/cocinadas";
  };

  const copiarTexto = () => {
    const texto = "¡Mira lo que preparé con @SoyArteCocina! 🍫👩‍🍳 #RecetasConAmor";
    navigator.clipboard.writeText(texto);
    alert("📋 ¡Texto copiado al portapapeles!");
  };

  return (
    <section className="cierre-receta">
      <h2>🎉 ¡Finaliza tu experiencia!</h2>
      <p>¿Qué deseas hacer con esta receta?</p>

      <div className="acciones-finales">
        <button className="accion-guardar">
          <FaSave /> Guardar
        </button>
        <button className="accion-cocinada">
          <FaUserCheck /> Ya la cociné
        </button>
      </div>

      <hr />

      <div className="interaccion-usuario">
        <h3>⭐ Califica esta receta</h3>
        <div className="estrellas">
          {[1, 2, 3, 4, 5].map((value) => (
            <FaStar
              key={value}
              className={`estrella ${value <= (hoverRating || rating) ? "activa" : ""}`}
              onClick={() => handleRating(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>

        <textarea
          placeholder="¿Cómo te fue? ¿Algún tip que quieras compartir?"
          className="comentario-textarea"
          value={comentario}
          onChange={handleComentarioChange}
        />

        <label className="subir-foto">
          <FaUpload /> Sube una foto de tu preparación
          <input type="file" accept="image/*" onChange={handleFotoChange} />
        </label>

        {foto && (
          <>
            <img src={foto} alt="Preview" className="preview-foto" />
            <p className="preview-texto">😍 Así quedó tu obra de arte. ¿Listo para compartirla?</p>
          </>
        )}

        <button className="btn-enviar-experiencia" onClick={handleEnviar}>
          📤 Compartir experiencia
        </button>

        {enviado && (
          <>
            <p className="gracias">
              <FaCheckCircle className="icono-check" /> ¡Gracias, chef! 🎉 Tu receta fue guardada y es parte del libro de cocina de nuestra comunidad.
            </p>
            <button className="btn-libro" onClick={handleVerCocinadas}>
              <FaBookOpen /> Ver mis recetas cocinadas
            </button>
          </>
        )}
      </div>

      <hr />

      <div className="compartir-social">
        <h3>📢 ¡Comparte tu creación!</h3>
        <p>Comparte tu creación con el mundo 🌎 y ayuda a inspirar a otros:</p>
        <div className="social-buttons">
          <a href="https://facebook.com/sharer/sharer.php?u=https://soyarte.com" target="_blank" rel="noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="https://wa.me/?text=¡Mira esta receta en SoyArte! https://soyarte.com" target="_blank" rel="noreferrer">
            <FaWhatsapp />
          </a>
          <a href="https://twitter.com/intent/tweet?text=Receta deliciosa en https://soyarte.com" target="_blank" rel="noreferrer">
            <FaTwitter />
          </a>
          <a href="https://youtube.com/@soyarte" target="_blank" rel="noreferrer">
            <FaYoutube />
          </a>
          <a href="https://t.me/share/url?url=https://soyarte.com&text=Mira esta receta" target="_blank" rel="noreferrer">
            <FaTelegramPlane />
          </a>
        </div>
        <p className="mensaje-copiable" onClick={copiarTexto}>
          “¡Mira lo que preparé con @SoyArteCocina! 🍫👩‍🍳 <strong>#RecetasConAmor</strong>” <span>(Haz clic para copiar)</span>
        </p>
      </div>
    </section>
  );
};

export default CierreReceta;
