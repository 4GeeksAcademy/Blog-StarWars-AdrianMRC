import React, { useEffect, useRef } from 'react';

export default function StarBackground({ starCount = 120 }) {
  const svgRef = useRef();

  useEffect(() => {
    // Genera estrellas sólo una vez
    const svg = svgRef.current;
    let content = '';
    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const r = Math.random() * 1.6 + 0.3; // radios variados
      const alpha = Math.random() * 0.7 + 0.2;
      content += `<circle cx="${x}vw" cy="${y}vh" r="${r}" fill="white" opacity="${alpha}"/>`;
    }
    svg.innerHTML = content;
  }, [starCount]);

  return (
    <svg
      id="star-background"
      ref={svgRef}
      width="100vw"
      height="100vh"
      style={{ position: 'fixed', top: 0, left: 0 }}
    />
  );
}
