import React, { useEffect, useState } from 'react';

function StarField({ stars = 90 }) {
  // Simple starfield SVG
  return (
    <svg className="detail-img-starfield" width="100%" height="100%">
      {Array.from({ length: stars }).map((_, i) => {
        const x = Math.random()*100;
        const y = Math.random()*100;
        const r = Math.random()*1.3+.2;
        return (
          <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill={"#fff"} opacity={Math.random()*.7+.1}/>
        );
      })}
    </svg>
  );
}

export default function DetailImage({ src, alt, uid }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [uid, src]);

  return (
    <div className="detail-img-wrapper">
      {!isLoaded && (
        <>
          <StarField />
          <div className="detail-img-spinner">
            <div className="spinner-border text-warning" style={{width: "3rem", height: "3rem"}} />
          </div>
        </>
      )}
      <img
        key={uid}
        src={src}
        alt={alt}
        className="detail-img-sw"
        style={{ opacity: isLoaded ? 1 : 0 }}
        onLoad={() => setIsLoaded(true)}
        onError={e => {
          e.target.src = 'https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/placeholder.jpg';
          setIsLoaded(true);
        }}
        draggable={false}
      />
    </div>
  );
}
