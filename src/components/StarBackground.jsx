import React, { useEffect, useRef, useMemo } from 'react';

const generateStars = (starCount) => {
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

export default function StarBackground({ starCount = 150 }) {
  const svgRef = useRef();
  const stars = useMemo(() => generateStars(starCount), [starCount]);

  useEffect(() => {
    svgRef.current.innerHTML = stars;
  }, [stars]);

  return <svg id="star-background" ref={svgRef} aria-hidden="true" />;
}