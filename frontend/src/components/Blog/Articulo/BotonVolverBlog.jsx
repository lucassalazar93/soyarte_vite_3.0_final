import React from 'react';
import { Link } from 'react-router-dom';
import './BotonVolverBlog.css';

const BotonVolverBlog = () => (
  <Link to="/blog" className="boton-volver-blog">
    ← Volver al Blog
  </Link>
);

export default BotonVolverBlog;
