import React, { useEffect, useState } from "react";
import "./HistoriasReflexiones.css";

const cortarHTML = (html, maxLength = 100) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  const textoPlano = div.textContent || div.innerText || "";
  return textoPlano.length > maxLength
    ? textoPlano.slice(0, maxLength) + "..."
    : textoPlano;
};

const HistoriasReflexiones = ({ mini_historias, reflexiones }) => {
  const [historias, setHistorias] = useState([]);
  const [reflexionesList, setReflexionesList] = useState([]);

  // Normaliza datos si llegan como string JSON desde la base de datos
  useEffect(() => {
    const normalizar = (dato) => {
      if (!dato) return [];
      if (Array.isArray(dato)) return dato;
      try {
        const parsed = JSON.parse(dato);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return [dato];
      }
    };

    setHistorias(normalizar(mini_historias));
    setReflexionesList(normalizar(reflexiones));
  }, [mini_historias, reflexiones]);

  return (
    <section className="historias-reflexiones-seccion">
      <h2 className="titulo-seccion">💫 Historias y reflexiones que tocan el alma</h2>

      <div className="grid-tarjetas">
        {historias.map((contenido, i) => (
          <div className="tarjeta-hover-container" key={`historia-${i}`}>
            <div className="tarjeta">🌸 {cortarHTML(contenido)}</div>
            <div className="tooltip-flotante">
              <div dangerouslySetInnerHTML={{ __html: contenido }} />
            </div>
          </div>
        ))}

        {reflexionesList.map((contenido, i) => (
          <div className="tarjeta-hover-container" key={`reflexion-${i}`}>
            <div className="tarjeta">🌿 {cortarHTML(contenido)}</div>
            <div className="tooltip-flotante">
              <div dangerouslySetInnerHTML={{ __html: contenido }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HistoriasReflexiones;
