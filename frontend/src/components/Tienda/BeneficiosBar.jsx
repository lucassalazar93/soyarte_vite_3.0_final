import React from "react";
import "./BeneficiosBar.css";

function BeneficiosBar() {
  return (
    <section className="beneficios-bar">
      <div className="beneficio">
        <i className="fas fa-shipping-fast"></i>
        <p>Envío gratis en pedidos +$100.000</p>
      </div>
      <div className="beneficio">
        <i className="fas fa-headset"></i>
        <p>Asesoría 24/7</p>
      </div>
      <div className="beneficio">
        <i className="fas fa-sync-alt"></i>
        <p>Devoluciones fáciles</p>
      </div>
      <div className="beneficio">
        <i className="fas fa-lock"></i>
        <p>Pago seguro</p>
      </div>
    </section>
  );
}

export default BeneficiosBar;
