import React from 'react';
import './FraseInspiradora.css';

const frases = [
  "Sanar no es olvidar, es recordar sin que duela.",
  "Tu historia es tu fortaleza, no tu vergüenza.",
  "Amarte a ti misma no es un lujo, es una necesidad.",
  "Cocinar también puede ser un abrazo para el alma.",
  "No te rindas: hoy también es un día para sanar."
];

const FraseInspiradora = () => {
  const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];

  return (
    <div className="frase-inspiradora" data-aos="fade-up">
      <p>🌸 {fraseAleatoria}</p>
    </div>
  );
};

export default FraseInspiradora;
