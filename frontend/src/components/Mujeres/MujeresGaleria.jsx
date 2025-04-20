// MujeresGaleria.jsx
import React from "react";
import MujerCard from "./MujerCard";
import "./Mujeres.css"; // Usa el mismo CSS general

// Puedes importar desde un archivo externo si lo deseas
const mujeresData = [
  {
    id: 1,
    nombre: "Catalina Ríos",
    frase: "Cuando una mujer sana, sana toda su historia.",
    resumen: "Empezó vendiendo artesanías y ahora lidera un centro de formación.",
    imagen: "/images/mujeres/catalina.png",
  },
  {
    id: 2,
    nombre: "Luisa Moreno",
    frase: "El arte fue mi terapia y mi voz.",
    resumen: "Transformó su historia de violencia en murales que inspiran a su comunidad.",
    imagen: "/images/mujeres/luisa.png",
  },
  {
    id: 3,
    nombre: "Paola Salas",
    frase: "Me caí muchas veces, pero aprendí a volar.",
    resumen: "Después de perderlo todo, creó un emprendimiento que empodera a madres solteras.",
    imagen: "/images/mujeres/paola.png",
  },
  {
    id: 4,
    nombre: "Diana Arango",
    frase: "Convertí mis heridas en semillas de esperanza.",
    resumen: "Hoy acompaña a otras mujeres en procesos de sanación emocional.",
    imagen: "/images/mujeres/diana.png",
  }
];

const MujeresGaleria = () => {
  return (
    <section className="mujeres-galeria">
      <h2 className="titulo-secundario">Más mujeres que inspiran</h2>
      <p className="subtitulo-galeria">
        Cada historia es una chispa de luz. Descúbrelas.
      </p>
      <div className="mujeres-grid">
        {mujeresData.map((mujer) => (
          <MujerCard key={mujer.id} {...mujer} />
        ))}
      </div>
    </section>
  );
};

export default MujeresGaleria;
