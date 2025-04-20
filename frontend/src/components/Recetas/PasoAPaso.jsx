import React, { useEffect, useState } from "react";
import "./PasoAPaso.css";

const PasoAPaso = ({ recetaId }) => {
  const [pasos, setPasos] = useState([]);
  const [completados, setCompletados] = useState(() => {
    const saved = localStorage.getItem(`pasos_${recetaId}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/recetas/${recetaId}/pasos`)
      .then(res => res.json())
      .then(data => setPasos(data))
      .catch(err => console.error("Error al cargar pasos:", err));
  }, [recetaId]);

  useEffect(() => {
    localStorage.setItem(`pasos_${recetaId}`, JSON.stringify(completados));
  }, [completados, recetaId]);

  const togglePaso = (idPaso) => {
    setCompletados((prev) =>
      prev.includes(idPaso)
        ? prev.filter(id => id !== idPaso)
        : [...prev, idPaso]
    );
  };

  const progreso = pasos.length > 0
    ? Math.round((completados.length / pasos.length) * 100)
    : 0;

  return (
    <section className="paso-a-paso">
      <h2 className="paso-titulo">👣 Paso a paso</h2>

      <div className="barra-progreso">
        <div className="progreso-completado" style={{ width: `${progreso}%` }}></div>
      </div>

      {pasos.map((paso, index) => (
        <div key={paso.id} className={`paso ${completados.includes(paso.id) ? "completado" : ""}`}>
          <div className="paso-header">
            <h3>Paso {index + 1}</h3>
            <button className="check-btn" onClick={() => togglePaso(paso.id)}>
              {completados.includes(paso.id) ? "✅" : "☐"}
            </button>
          </div>

          <p>{paso.descripcion}</p>

          {paso.imagen && (
            <img
              src={`http://localhost:5000${paso.imagen}`}
              alt={`Paso ${index + 1}`}
              className="imagen-paso"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/img/default.jpg";
              }}
            />
          )}

          {paso.tiempo && <p className="tiempo-paso">⏱️ {paso.tiempo}</p>}
        </div>
      ))}
    </section>
  );
};

export default PasoAPaso;
