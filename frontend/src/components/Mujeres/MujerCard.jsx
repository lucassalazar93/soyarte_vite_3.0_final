import React from "react";
import { Link } from "react-router-dom";
import "./Mujeres.css";

const MujerCard = ({ id, nombre, frase, resumen, imagen }) => {
  return (
    <div className="mujer-card">
      <div className="mujer-img-wrapper">
        <img src={imagen} alt={nombre} className="mujer-img" />
      </div>
      <h3>{nombre}</h3>
      <p className="frase">{frase}</p>
      <p className="resumen">{resumen}</p>
      <Link to={`/mujeres/${id}`} className="btn-ver-historia-mini">
        Ver historia
      </Link>
    </div>
  );
};

export default MujerCard;
