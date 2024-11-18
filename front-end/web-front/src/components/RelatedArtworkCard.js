import "./ArtworkCards.css";

import React, { useEffect, useRef, useState } from "react";

const ArtworkCard = ({ artwork }) => {
  const titleRef = useRef(null);
  const [isLongTitle, setIsLongTitle] = useState(false);

  useEffect(() => {
    const checkTitleLength = () => {
      const titleElement = titleRef.current;
      if (titleElement) {
        // Check if the content height is greater than two lines
        const lineHeight = parseInt(window.getComputedStyle(titleElement).lineHeight);
        const maxHeight = lineHeight * 2;
        setIsLongTitle(titleElement.scrollHeight > maxHeight);
      }
    };

    checkTitleLength();
    window.addEventListener('resize', checkTitleLength);
    return () => window.removeEventListener('resize', checkTitleLength);
  }, [artwork.title]);

  return (
    <div className="related-art-card-container">
      <div className="top-item">
        <div className="card-image">
          <img
            src={artwork.primaryImage || "/api/placeholder/300/200"}
            alt={artwork.title}
          />
        </div>
      </div>
      <div className="related-bottom-item">
        <h3 
          ref={titleRef}
          className={`related-artwork-card-title ${isLongTitle ? 'related-long-title' : ''}`}
        >
          {artwork.title}
        </h3>
        <p className="related-artwork-card-artist">{artwork.artist}</p>
      </div>
    </div>
  );
};

export default ArtworkCard;