import React from "react";
import "./Multimedia.css";

const Multimedia = ({ audio_url, musica_url }) => (
  <div className="multimedia-wrapper">
    {audio_url && (
      <div className="audio-card">
        <h4><span className="emoji">🎧</span> Escucha esta reflexión:</h4>
        <audio controls src={audio_url} />
        <p className="mensaje-extra">Pon tus audífonos. Esta pausa es solo para ti.</p>
      </div>
    )}

    {musica_url && (
      <div className="audio-card">
        <h4><span className="emoji">🎵</span> Escucha esta música:</h4>
        <audio controls src={musica_url} />
        <p className="mensaje-extra">Cierra los ojos. Deja que el sonido te abrace.</p>
      </div>
    )}
  </div>
);

export default Multimedia;
