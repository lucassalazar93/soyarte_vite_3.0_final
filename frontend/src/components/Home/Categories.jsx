import React from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

const categories = [
  {
    title: "Blog",
    description: "Artículos y noticias",
    button: "Leer más",
    link: "/blog",
    image: "/images/blog.jpeg",
  },
  {
    title: "Recetas",
    description: "Explora nuevas recetas",
    button: "Ver recetas",
    link: "/recetas",
    image: "/images/recetas.jpg",
  },
  {
    title: "Terapia Culinaria",
    description: "Descubre el poder de la cocina",
    button: "Explorar",
    link: "/terapia-culinaria",
    image: "/images/terapia.jpg",
  },
  {
    title: "Tienda",
    description: "Compra los mejores productos",
    button: "Ir a la tienda",
    link: "/tienda",
    image: "/images/card-tienda.jpeg",
  },
];

const Categories = () => {
  return (
    <section className="categories-wrapper">
      <div className="categories-inner">
        <div className="categories-container">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <img
                src={category.image}
                alt={category.title}
                className="category-image"
              />
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <Link to={category.link} className="category-button">
                {category.button}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
