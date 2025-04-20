import React, { useEffect, useRef } from "react";
import "./InspiringWomen.css";
import mujeresData from "../Mujeres/mujeresData"; // ✅ Correcto
import { useNavigate } from "react-router-dom";

const InspiringWomen = () => {
  const cardsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="inspiring-section">
      <h2>🌸 Mujeres que inspiran</h2>
      <p>Emprendedoras que hacen parte de nuestra comunidad</p>

      <div className="inspiring-grid">
        {mujeresData.slice(0, 5).map((mujer, index) => (
          <div
            className="inspiring-card"
            key={mujer.id}
            ref={el => (cardsRef.current[index] = el)}
            onClick={() => navigate(`/mujeres/${mujer.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={mujer.fotoPerfil} alt={mujer.nombre} />
            <p className="insta-name">
              @{mujer.nombre.split(" ")[0].toLowerCase()} <span className="checkmark">✔</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InspiringWomen;
