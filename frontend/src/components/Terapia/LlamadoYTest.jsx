// LlamadoYTest.jsx
import React, { useState } from "react";
import "./LlamadoYTest.css";
import { FaFacebookF, FaXTwitter, FaInstagram, FaWhatsapp, FaTiktok, FaLink } from "react-icons/fa6";

const LlamadoYTest = () => {
    const [estado, setEstado] = useState("");
    const [recomendacion, setRecomendacion] = useState(null);

    const recetasPorEstado = {
        "🌧️ Me siento ansiosa": "Infusión de manzanilla y avena",
        "💔 Necesito consuelo": "Sopa para el alma con papas y cebolla",
        "🌸 Busco conectar conmigo": "Pan casero con esencia de vainilla",
        "🌱 Quiero reconectar con mi niña interior": "Galletas de colores con chispas de chocolate",
        "☀️ Estoy alegre y quiero celebrarlo": "Smoothie de mango y maracuyá"
    };

    const compartir = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("🔗 ¡Enlace copiado para compartir!");
    };

    const manejarSeleccion = (e) => {
        const emocion = e.target.value;
        setEstado(emocion);
        setRecomendacion(recetasPorEstado[emocion]);
    };

    return (
        <div className="seccion-final-terapia">
            {/* 🧠 Test Rápido Emocional */}
            <div className="test-emocional" data-aos="fade-up">
                <h3>🌸 Tu receta emocional del día</h3>
                <p className="frase">
                    ¿Cómo te sientes hoy? Déjate acompañar con una receta que te abrace el alma.
                </p>
                <select value={estado} onChange={manejarSeleccion}>
                    <option value="">Selecciona tu emoción</option>
                    {Object.keys(recetasPorEstado).map((e) => (
                        <option key={e} value={e}>{e}</option>
                    ))}
                </select>
                {recomendacion && (
                    <p className="recomendacion">🧾 Te recomendamos: <strong>{recomendacion}</strong></p>
                )}
                <p className="frase-cierre">
                    🌿 “Tu cocina puede ser tu refugio. Un lugar para sanar, recordar y volver a ti.”
                </p>
                <p className="agradecimiento">🕊️ Gracias por estar aquí. Que cada cucharada te devuelva a tu centro.</p>
            </div>

            {/* ✨ Llamado a Compartir */}
            <div className="llamado-compartir" data-aos="fade-up">
                <h3>💖 ¿Qué te regaló esta receta?</h3>
                <p>
                    A veces, una cucharada de sopa guarda más que sabor: guarda una emoción, un recuerdo, un momento de amor.
                </p>
                <p>
                    ✨ La cocina también puede ser un acto de amor que merece compartirse. <br />
                    Invita a tu comunidad a expresarse y multiplicar la sanación con el hashtag <strong>#CocinarMeSana</strong>.
                </p>
                <p>📸 ¿Capturaste el momento? Comparte tu imagen, anécdota o reflexión:</p>
                <ul>
                    <li>📝 "Me sentí abrazada por los aromas."</li>
                    <li>🫶 "Lo cociné en silencio, y me escuché."</li>
                    <li>🧸 "Recordé a mi abuela y lloré de ternura."</li>
                </ul>
                <div className="botones-compartir">
                    

                    <button onClick={compartir} className="share-btn copy">
                        <FaLink />💖 Copiar enlace 😎
                    </button>
                </div>

                <p className="frase-cierre">
                    “La cocina nos une cuando las palabras no alcanzan.”
                </p>
            </div>
        </div>
    );
};

export default LlamadoYTest;
