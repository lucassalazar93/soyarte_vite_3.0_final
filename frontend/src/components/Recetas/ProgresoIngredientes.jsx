import React, { useEffect, useRef, useState } from "react";
import "./ProgresoIngredientes.css";

const ProgresoIngredientes = ({ total, listos }) => {
  const [visible, setVisible] = useState(false);
  const barraRef = useRef(null);

  const porcentaje = (listos / total) * 100;

  // Mostrar barra si hay al menos 1 ingrediente marcado
  useEffect(() => {
    setVisible(listos > 0);
  }, [listos]);

  // Posición inicial de la barra
  useEffect(() => {
    const barra = barraRef.current;
    if (barra) {
      barra.style.right = "30px";
      barra.style.bottom = "30px";
    }
  }, []);

  // Hacer la barra arrastrable
  useEffect(() => {
    const barra = barraRef.current;
    if (!barra) return;

    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    const startDrag = (e) => {
      isDragging = true;
      offsetX = e.clientX - barra.getBoundingClientRect().left;
      offsetY = e.clientY - barra.getBoundingClientRect().top;
      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", stopDrag);
    };

    const drag = (e) => {
      if (!isDragging) return;
      barra.style.left = `${e.clientX - offsetX}px`;
      barra.style.top = `${e.clientY - offsetY}px`;
      barra.style.right = "auto";
      barra.style.bottom = "auto";
    };

    const stopDrag = () => {
      isDragging = false;
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", stopDrag);
    };

    barra.addEventListener("mousedown", startDrag);

    return () => {
      barra.removeEventListener("mousedown", startDrag);
    };
  }, []);

  if (!visible) return null;

  return (
    <div ref={barraRef} className="barra-flotante draggable">
      <span className="texto">{listos}/{total} ingredientes listos ✅</span>
      <button className="cerrar-btn" onClick={() => setVisible(false)}>❌</button>
      <div className="barra-progreso">
        <div className="barra-interna" style={{ width: `${porcentaje}%` }}></div>
      </div>
    </div>
  );
};

export default ProgresoIngredientes;
