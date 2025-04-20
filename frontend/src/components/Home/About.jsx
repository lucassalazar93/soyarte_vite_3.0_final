import React, { useEffect, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.3 }
    );

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <section className="about-wrapper">
      <div className="about-section" ref={sectionRef}>
        <div className="about-container">
          <img
            src="/images/nore1.jpeg" // 📌 Imagen debe estar en public/images/nore1.jpeg
            alt="Equipo Soy Arte"
            className="about-image"
          />
          <div className="about-text">
            <h2>💜 Quiénes Somos</h2>
            <p>
              Bienvenidas a <strong>Soy Arte</strong>, un espacio creado por y para mujeres. Aquí celebramos la diversidad,
              la fuerza y la belleza de ser mujer, ofreciendo una plataforma donde cada una de nosotras puede encontrar inspiración, apoyo y comunidad.
            </p>

            <Link to="/nosotros" className="about-button">
              Conócenos <FaArrowRight style={{ marginLeft: '8px' }} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
