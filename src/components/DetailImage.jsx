import React, { useEffect, useState } from 'react';

export default function DetailImage({ src, alt, uid }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Reinicia el estado de carga cuando cambian el UID o la fuente de la imagen
    setIsLoaded(false);
  }, [uid, src]);

  return (
    <div className="detail-img-wrapper">
      {!isLoaded && (
        <div className="detail-img-spinner">
          <div
            className="spinner-border text-warning"
            style={{ width: "3rem", height: "3rem" }}
          />
        </div>
      )}
      <img
        key={uid}
        src={src}
        alt={alt}
        className={`detail-img-sw ${isLoaded ? 'loaded' : 'loading'}`}
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