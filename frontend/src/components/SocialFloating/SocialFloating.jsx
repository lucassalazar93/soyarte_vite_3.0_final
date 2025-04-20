import React from "react";
import "./SocialFloating.css";

const SocialFloating = () => {
  return (
    <div className="social-floating">
      <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook">
        <img src="/images/facebook.png" alt="Facebook" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram">
        <img src="/images/instagram.png" alt="Instagram" />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noreferrer" title="Twitter">
        <img src="/images/twitter.png" alt="Twitter" />
      </a>
      <a href="mailto:soyarte@gmail.com" target="_blank" rel="noreferrer" title="Correo">
        <img src="/images/gmail.png" alt="Correo" />
      </a>
    </div>
  );
};

export default SocialFloating;
