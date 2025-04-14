import React, { useEffect, useRef } from 'react';

const generateStars = (minStars, maxStars) => {
  const starCount = Math.floor(Math.random() * (maxStars - minStars + 1)) + minStars; // Genera un número aleatorio entre minStars y maxStars
  let content = '';
  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const r = Math.random() * 1.6 + 0.3;
    const alpha = Math.random() * 0.7 + 0.2;
    content += `<circle cx="${x}vw" cy="${y}vh" r="${r}" fill="white" opacity="${alpha}"/>`;
  }
  return content;
};

export default function StarBackground({ minStars = 1000, maxStars = 3000, trigger }) {
  const svgRef = useRef();

  useEffect(() => {
    const stars = generateStars(minStars, maxStars);
    svgRef.current.innerHTML = stars;
  }, [minStars, maxStars, trigger]); // Recalcula las estrellas cuando `trigger`, `minStars` o `maxStars` cambian

  return <svg id="star-background" ref={svgRef} aria-hidden="true" />;
}