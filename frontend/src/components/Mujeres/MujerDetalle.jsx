import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MujerDetalle.css";
import mujeresData from "./mujeresData";
import HeroMujer from "./HeroMujer";

const MujerDetalle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const mujer = mujeresData.find((m) => m.id === parseInt(id));

    if (!mujer) {
        return <p style={{ textAlign: "center", marginTop: "3rem" }}>Mujer no encontrada.</p>;
    }

    return (
        <div className="mujer-detalle">
            {/* 🎀 Hero emocional */}
            <HeroMujer
                nombre={mujer.nombre}
                cita={mujer.cita} // 🔥 ESTA ES LA CORRECCIÓN
                ciudad={mujer.ciudad}
                ocupacion={mujer.profesion}
                imagen={mujer.fotoPerfil}
            />

            <section className="historia-transformacion">
                <div className="historia-contenido">
                    <h2>Su Historia</h2>
                    <p>{mujer.historiaLarga ?? "Esta historia aún está en construcción."}</p>

                    {/* Primera frase destacada */}
                    {mujer.frases?.[0] && (
                        <blockquote className="frase-impacto">“{mujer.frases[0]}”</blockquote>
                    )}
                </div>
            </section>




            {/* 🪄 Línea de vida */}
            <section className="timeline">
                <h2>Línea de Vida</h2>
                <ul>
                    {mujer.timeline?.map((evento, index) => (
                        <li key={index} className="timeline-item">
                            <span className="timeline-icon">{evento.icono}</span>
                            <p>{evento.texto}</p>
                        </li>
                    ))}
                </ul>
            </section>


            {/* 💬 Frases inspiradoras */}
            {mujer.frases?.map((frase, idx) => (
                <section key={idx} className="frase-inspiradora">
                    <blockquote>{frase}</blockquote>
                </section>
            ))}

            {/* 📸 Galería real */}
            <section className="galeria">
                <h2>Galería</h2>
                <div className="galeria-grid">
                    {mujer.galeria?.map((foto, idx) => (
                        <figure key={idx}>
                            <img src={foto.src} alt={foto.alt} />
                            <figcaption>{foto.caption}</figcaption>
                        </figure>
                    ))}
                </div>
            </section>

            {/* 📽 Video */}
            {mujer.videoUrl && (
                <section className="video-section">
                    <h2>Conócela en su propia voz</h2>
                    <div className="video-wrapper">
                        <iframe
                            src={mujer.videoUrl}
                            title={`Video de ${mujer.nombre}`}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                        <span className="video-icon">🎬</span>
                    </div>
                </section>
            )}

            {/* 🌟 Impacto */}
            <section className="impacto">
                <h2 className="animado">Impacto que deja huella</h2>
                <div className="impacto-cards">
                    {mujer.impacto?.map((dato, idx) => (
                        <div key={idx} className="impacto-card">
                            <span>{dato.icono}</span>
                            <h3>{dato.numero}</h3>
                            <p>{dato.descripcion}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 💌 Instagram */}
            <div className="btn-instagram-wrapper">
                <a
                    href={mujer.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-rosa-centro"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="white"
                        viewBox="0 0 24 24"
                        style={{ marginRight: "8px", verticalAlign: "middle" }}
                    >
                        <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.3.1 2 .3 2.5.5.6.3 1 .7 1.4 1.4.3.5.5 1.2.5 2.5.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.3-.3 2-.5 2.5-.3.6-.7 1-1.4 1.4-.5.3-1.2.5-2.5.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.3-.1-2-.3-2.5-.5-.6-.3-1-.7-1.4-1.4-.3-.5-.5-1.2-.5-2.5C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.3.3-2 .5-2.5.3-.6.7-1 1.4-1.4.5-.3 1.2-.5 2.5-.5 1.3-.1 1.7-.1 4.9-.1m0-2.2C8.7 0 8.3 0 7 .1 5.6.1 4.6.3 3.8.6c-.9.3-1.6.8-2.3 1.5C.8 3.7.3 4.4 0 5.3c-.3.8-.5 1.8-.6 3.2C-.7 10.3-.7 10.7-.7 12s0 1.7.1 2.5c.1 1.4.3 2.4.6 3.2.3.9.8 1.6 1.5 2.3.7.7 1.4 1.2 2.3 1.5.8.3 1.8.5 3.2.6 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c1.4-.1 2.4-.3 3.2-.6.9-.3 1.6-.8 2.3-1.5.7-.7 1.2-1.4 1.5-2.3.3-.8.5-1.8.6-3.2.1-.8.1-1.2.1-4.9s0-3.7-.1-4.9c-.1-1.4-.3-2.4-.6-3.2-.3-.9-.8-1.6-1.5-2.3C20.4.8 19.7.3 18.8 0c-.8-.3-1.8-.5-3.2-.6C15.3-.1 14.9-.1 12-.1zM12 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm0 10.2a4 4 0 110-8 4 4 0 010 8zm6.4-10.7a1.4 1.4 0 11-2.8 0 1.4 1.4 0 012.8 0z" />
                    </svg>
                    Síguela en Instagram
                </a>
            </div>


            {/* 🔁 Otras mujeres */}
            {mujer.otras && mujer.otras.length > 0 && (
                <section className="otras-inspiradoras">
                    <h2>Otras Mujeres que Inspiran</h2>
                    <div className="otras-carousel">
                        {mujer.otras.map((otra) => (
                            <div
                                key={otra.id}
                                className="otra-card"
                                onClick={() => navigate(`/mujeres/${otra.id}`)}
                            >
                                <img src={otra.thumbnail} alt={otra.nombre} />
                                <p>{otra.nombre}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default MujerDetalle;

