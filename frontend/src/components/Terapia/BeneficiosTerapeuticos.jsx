import React from "react";
import "./BeneficiosTerapeuticos.css";

const BeneficiosTerapeuticos = () => {
    return (
        <section className="terapeutico fade-in">
            <div className="contenedor">

                <h2>🥣 Beneficios Terapéuticos</h2>


                <div className="ingrediente-box">
                    <div className="ingrediente">
                        <span className="icono">🌰</span>
                        <h3>Almendras y Nueces</h3>
                        <p>Ricas en melatonina y magnesio, ayudan a mejorar la calidad del sueño.</p>
                        <small>Fuente: Cadena SER</small>
                    </div>

                    <div className="ingrediente">
                        <span className="icono">🍯</span>
                        <h3>Miel Natural</h3>
                        <p>Con propiedades antibacterianas y relajantes, ideal para calmar antes de dormir.</p>
                    </div>
                </div>

                <hr className="divisor" />

                <div className="consejos">
                    <h3>🧘 Consejos de Preparación Consciente</h3>
                    <ul>
                        <li>🌬 Respira profundo antes de comenzar y crea un ambiente tranquilo.</li>
                        <li>👀 Observa la textura de los ingredientes con atención plena.</li>
                        <li>👃 Siente los aromas como parte de tu momento de autocuidado.</li>
                        <li>💜 Cocina sin prisa, disfrutando el proceso como un ritual sanador.</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default BeneficiosTerapeuticos;
