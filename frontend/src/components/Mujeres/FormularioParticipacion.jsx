// FormularioParticipacion.jsx
import React from "react";
import "./Mujeres.css"; // Usamos el mismo CSS

const FormularioParticipacion = () => {
  return (
    <div className="formulario-participacion">
      <h2>💌 ¿Conoces a una mujer que inspire?</h2>
      <p>
        Cada historia puede ser luz para otras. Cuéntanos tu historia o la de
        una mujer que te ha inspirado. 💫
      </p>

      <form
        action="mailto:soyarte@gmail.com"
        method="POST"
        encType="text/plain"
      >
        <input type="text" name="nombre" placeholder="Tu nombre" required />
        <input
          type="email"
          name="email"
          placeholder="Tu correo o red social"
          required
        />
        <textarea
          name="mensaje"
          placeholder="Cuéntanos una historia breve o un mensaje para inspirar"
          rows="5"
          required
        />
        <button type="submit" className="btn-enviar">
          Quiero formar parte ✨
        </button>
      </form>
    </div>
  );
};

export default FormularioParticipacion;
