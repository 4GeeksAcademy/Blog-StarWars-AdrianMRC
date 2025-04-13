import React, { useState } from "react";

const saberColors = [
  { color: "#1cfffc", shadow: "#00f0ff" },   // Azul
  { color: "#ffe81f", shadow: "#ffe81f" },   // Amarillo
  { color: "#f34f4f", shadow: "#ff2222" },   // Rojo
  { color: "#4ff362", shadow: "#56ff6c" },   // Verde
  { color: "#b97aff", shadow: "#a26cff" },   // Morado
];

export default function FooterSable() {
  const [idx, setIdx] = useState(0);
  const handleClick = () => setIdx((idx + 1) % saberColors.length);
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
              boxShadow: `0 0 6px 2px ${activeColor.shadow}66`,
              border: `2px solid ${activeColor.color}`,
            }}
          />
        </div>
        <div
          className="sable-hoja"
          style={{
            background: `linear-gradient(90deg, white 20%, ${activeColor.color} 80%)`,
            boxShadow: `0 0 22px 8px ${activeColor.shadow}, 0 0 90px 25px ${activeColor.shadow}66`,
          }}
        />
      </div>
      <div className="sable-text">
        Que la Fuerza te acompañe
      </div>
    </footer>
  );
}
