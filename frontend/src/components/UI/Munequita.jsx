import React from "react";
import "./Munequita.css"; // ✅ Importa los estilos

const Munequita = () => {
  return (
    <div className="munequita-container">
      <div className="munequita">
        <img src="/images/avatarnore.png" alt="Soy Arte" />
      </div>
      <div className="munequita-text">
        <p>¿Necesitas ayuda? 💬</p>
        <a
          href="https://wa.me/573001234567?text=¡Hola! Quisiera más información sobre Soy Arte." 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Escríbeme en WhatsApp 💜
        </a>
      </div>
    </div>
  );
};

export default Munequita;
