import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ArticulosRelacionados.css';

const BASE_URL = 'http://localhost:5000'; // ajusta si usas proxy o dominio en producción

const ArticulosRelacionados = () => {
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    obtenerArticulosAleatorios();
  }, []);

  const obtenerArticulosAleatorios = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/blog/aleatorios`);
      if (!res.ok) throw new Error("No se pudo obtener artículos");
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("La respuesta no es un array");
      setArticulos(data);
    } catch (error) {
      console.error('❌ Error al obtener artículos relacionados:', error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="cargando-articulos">Cargando artículos relacionados...</p>;
  if (error) return <p className="error-articulos">No se pudieron cargar los artículos.</p>;

  return (
    <section className="articulos-relacionados" data-aos="fade-up">
      <h3 className="titulo-relacionados">También te podría interesar:</h3>
      <div className="tarjetas-horizontal">
        {articulos.map((articulo) => (
          <Link
            key={articulo.post_id}
            to={`/blog/${articulo.slug}`}
            className="tarjeta-blog"
          >
            <div className="imagen-wrapper">
              <img
                src={`${BASE_URL}${articulo.imagen}`}
                alt={articulo.titulo}
                loading="lazy"
                onError={(e) => (e.target.style.display = 'none')}
              />
            </div>
            <div className="contenido-blog">
              <h4 className="titulo-blog">🌸 {articulo.titulo}</h4>
              <p className="resumen-blog">
                {articulo.resumen?.slice(0, 100)}...
              </p>
              <span className="link-leer">Leer más →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ArticulosRelacionados;
