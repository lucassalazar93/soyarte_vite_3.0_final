import React from "react";
import "./VideosTestimonios.css";

const VideosTestimonios = () => {
    return (
        <div className="videos-testimonios-section fade-in">
            {/* 🎥 Video Tutorial */}
            <section className="video-tutorial">
                <h2 className="titulo-vt">👨‍🍳 Cocina para sanar👩🏻‍🍳</h2>
                <p className="subtitulo-vt">
                    Aprende a preparar una <strong>Sopa Detox</strong> ligera y nutritiva para desintoxicar cuerpo y mente.
                </p>
                <div className="video-container">
                    <iframe
                        src="https://www.youtube.com/embed/PAhcf0D9daM"
                        title="Sopa Detox"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

            </section>

            {/* 💬 Testimonios */}
            <section className="testimonios">
                <h2 className="titulo-testimonios">👱🏼‍♀️ Historias que inspiran</h2>
                <blockquote>
                    “Preparar la sopa para el alma me ayudó a reconectar conmigo misma después de una semana difícil. Sentí alivio en cada cucharada.”
                    <cite>— Laura G.</cite>
                </blockquote>
                <blockquote>
                    “Hornear pan con intención fue como meditar. Mi cocina se llenó de paz.”
                    <cite>— Carmen M.</cite>
                </blockquote>
            </section>
        </div>
    );
};

export default VideosTestimonios;
