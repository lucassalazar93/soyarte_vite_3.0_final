import React, { useEffect, useState } from "react";
import "./DesafioSanador.css";

const retos = [
  {
    id: 1,
    icono: "📵",
    titulo: "Cocina algo sin mirar el celular",
    descripcion:
      "Regálate 20 minutos de presencia total. Deja el teléfono lejos y conéctate con aromas, texturas y el momento.",
  },
  {
    id: 2,
    icono: "🔇",
    titulo: "Cocina en completo silencio",
    descripcion:
      "Apaga música y pantallas. Escucha el chisporroteo del sartén, el crujir del cuchillo. Tu cocina también habla.",
  },
  {
    id: 3,
    icono: "💐",
    titulo: "Prepara algo como regalo para alguien más",
    descripcion:
      "Cocina desde el corazón para sorprender a alguien con un gesto nutritivo y amoroso.",
  },
  {
    id: 4,
    icono: "🌿",
    titulo: "Explora una hierba que nunca has usado",
    descripcion:
      "Compra o cultiva una nueva planta aromática y crea una receta con ella. Descubre nuevos sabores.",
  },
];

const obtenerRetoSemanal = () => {
  const semana = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7));
  return retos[semana % retos.length];
};

const DesafioSanador = () => {
  const retoActual = obtenerRetoSemanal();
  const [completado, setCompletado] = useState(
    localStorage.getItem(`reto-${retoActual.id}`) === "true"
  );
  const [diario, setDiario] = useState(localStorage.getItem(`diario-${retoActual.id}`) || "");
  const [mostrarDiario, setMostrarDiario] = useState(false);
  const [historial, setHistorial] = useState(
    JSON.parse(localStorage.getItem("historialRetos")) || []
  );

  const marcarComoCompletado = () => {
    setCompletado(true);
    localStorage.setItem(`reto-${retoActual.id}`, "true");
    const nuevoHistorial = [...historial, retoActual.id];
    localStorage.setItem("historialRetos", JSON.stringify([...new Set(nuevoHistorial)]));
    setHistorial([...new Set(nuevoHistorial)]);
    setMostrarDiario(true);
  };

  const guardarDiario = () => {
    localStorage.setItem(`diario-${retoActual.id}`, diario);
    setMostrarDiario(false);
  };

  return (
    <section className="desafio-sanador">
      <h2 className="titulo-desafio">🕊️ Desafío Sanador de la Semana ❤️‍🩹</h2>
      <p className="subtitulo-desafio">
        Pequeñas misiones que alimentan tu alma mientras cocinas.
      </p>

      <div className={`tarjeta-desafio ${completado ? "completado" : ""}`}>
        <div className="icono-desafio">{retoActual.icono}</div>
        <h3>{retoActual.titulo}</h3>
        <p>{retoActual.descripcion}</p>

        {!completado ? (
          <button onClick={marcarComoCompletado}>💜 ¡Desafío aceptado!</button>
        ) : mostrarDiario ? (
          <>
            <textarea
              placeholder="¿Qué sentiste al completar este reto?"
              value={diario}
              onChange={(e) => setDiario(e.target.value)}
            />
            <button onClick={guardarDiario}>💌 Guardar experiencia</button>
          </>
        ) : (
          <div className="completado-texto animado">
            ✨ Reto completado. ¡Gracias por regalarte este momento!
          </div>
        )}
      </div>

      {historial.length > 0 && (
        <div className="galeria-retos">
          <h4>🌟 Retos completados</h4>
          <div className="iconos-retos">
            {historial.map((id) => {
              const reto = retos.find((r) => r.id === id);
              return <span key={id}>{reto?.icono}</span>;
            })}
          </div>
        </div>
      )}

      <p className="frase-inspiradora">
        “Tu cocina puede ser tu refugio. Un lugar para sanar y reconectar.” 💫
      </p>
    </section>
  );
};

export default DesafioSanador;
