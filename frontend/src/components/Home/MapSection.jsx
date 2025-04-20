import React from "react";
import "./MapSection.css";

const MapSection = () => {
  return (
    <div className="map-container">
      <h2 className="map-title">📍 Encuéntranos en el mapa</h2>
      <iframe
        title="Ubicación Soy Arte"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.853292992896!2d-74.08175338468028!3d4.609710243708181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99c0ad5c213d%3A0x4dd20a79ecb74f3e!2sBogotá%2C%20Colombia!5e0!3m2!1ses-419!2sco!4v1678702069821!5m2!1ses-419!2sco"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapSection;
