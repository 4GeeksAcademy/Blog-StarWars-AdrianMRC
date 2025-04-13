import React, { useState } from "react";

// Lista de colores para el sable de luz, cada uno con su color principal y sombra
const saberColors = [
  { color: "#1cfffc", shadow: "#00f0ff" },
  { color: "#ffe81f", shadow: "#ffe81f" },
  { color: "#f34f4f", shadow: "#ff2222" },
  { color: "#4ff362", shadow: "#56ff6c" },
  { color: "#b97aff", shadow: "#a26cff" },
];

const messages = [
  "Que la Fuerza te acompañe", 
  "El equilibrio está en tus manos", 
  "El lado oscuro es poderoso", 
  "La esperanza nunca muere", 
  "El poder de la sabiduría", 
];

export default function FooterSable() {
  const [idx, setIdx] = useState(0); // Estado para rastrear el color activo del sable
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(false); // Reinicia la animación
    setTimeout(() => setAnimate(true), 10); 
    setIdx((idx + 1) % saberColors.length);
  };

  const activeColor = saberColors[idx];

  return (
    <footer className="footer-sable">
      <div className="sable-lightsaber-row">
        <div className="sable-mango">
          <button
            className="sable-boton"
            aria-label="Cambiar color del sable"
            onClick={handleClick}
            style={{
              "--sable-color": activeColor.color,
              "--sable-shadow": activeColor.shadow,
            }}
          />
        </div>
        <div
          className={`sable-hoja ${animate ? "animate-hojaOn" : ""}`}
          style={{
            "--sable-color": activeColor.color,
            "--sable-shadow": activeColor.shadow,
          }}
        />
      </div>
      <div className="sable-text">
        {messages[idx]}
      </div>
    </footer>
  );
}
