// src/components/blog/ContenidoPrincipal.jsx
import React from 'react';
import './ContenidoPrincipal.css'; // Asegúrate de tener este archivo

const ContenidoPrincipal = ({ pregunta, contenido }) => (
  <section className="contenido-principal">
    {pregunta && (
      <div className="articulo-pregunta" data-aos="fade-up">
        <h2>{pregunta}</h2>
      </div>
    )}
    <div className="articulo-cuerpo" data-aos="fade-up" data-aos-delay="100">
      <div dangerouslySetInnerHTML={{ __html: contenido }} />
    </div>
  </section>
);

export default ContenidoPrincipal;
