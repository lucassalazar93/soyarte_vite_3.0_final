// src/components/Blog/Articulo/ComentariosBlog.jsx

import React, { useState, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import { useParams } from 'react-router-dom';
import './ComentariosBlog.css';

const ComentariosBlog = () => {
  const [comentarios, setComentarios] = useState([]);
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState(0);
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const { slug } = useParams();

  // Obtener comentarios visibles de este artículo
  useEffect(() => {
    if (slug) {
      obtenerComentarios(slug);
    }
  }, [slug]);

  const obtenerComentarios = async (slugActual) => {
    try {
      const res = await fetch(`http://localhost:5000/api/comentarios-blog/slug/${slugActual}`);
      const data = await res.json();
      setComentarios(data.filter(c => c.visible));
    } catch (err) {
      console.error('Error al cargar comentarios:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comentario || !calificacion || !slug) return;

    try {
      const res = await fetch('http://localhost:5000/api/comentarios-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: comentario, calificacion, slug })
      });

      if (res.ok) {
        setComentario('');
        setCalificacion(0);
        obtenerComentarios(slug);
      } else {
        console.error('No se pudo guardar el comentario');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const agregarEmoji = (emojiData) => {
    setComentario(prev => prev + emojiData.emoji);
    setMostrarPicker(false);
  };

  return (
    <section className="comentarios-blog" data-aos="fade-up">
      <h3>Comparte tu reflexión ✨</h3>

      {comentarios.length === 0 ? (
        <p className="comentarios-vacio">Sé la primera en compartir tu luz 🌟</p>
      ) : (
        <div className="lista-comentarios">
          {comentarios.map((c) => (
            <div key={c.id} className="comentario-card">
              <p className="comentario-texto">"{c.texto}"</p>
              <div className="comentario-info">
                <span className="comentario-fecha">{new Date(c.fecha).toLocaleString()}</span>
                <div className="comentario-puntuacion">
                  {Array.from({ length: c.calificacion }).map((_, i) => (
                    <span key={i} className="estrella-comentario">★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="formulario-comentario">
        <div className="area-escritura-horizontal">
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Escribe con libertad... 🌸"
            required
          />
          <div className="emoji-wrapper">
            <button
              type="button"
              className="boton-emoji"
              onClick={() => setMostrarPicker(!mostrarPicker)}
            >
              😊
            </button>
            {mostrarPicker && (
              <div className="emoji-picker">
                <Picker onEmojiClick={agregarEmoji} />
              </div>
            )}
          </div>
        </div>

        <div className="calificacion-estrellas">
          {[1, 2, 3, 4, 5].map((estrella) => (
            <span
              key={estrella}
              onClick={() => setCalificacion(estrella)}
              className={estrella <= calificacion ? 'estrella activa' : 'estrella'}
            >
              ★
            </span>
          ))}
          <span className="calificacion-numero">{calificacion}/5</span>
        </div>

        <button type="submit" className="boton-enviar">Enviar reflexión ✨</button>
      </form>
    </section>
  );
};

export default ComentariosBlog;
