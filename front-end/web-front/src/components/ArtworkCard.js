import "./ArtworkCards.css";
import { ReactComponent as LocationPin } from "../assets/location_pin.svg";
import { ReactComponent as Star } from "../assets/star.svg";
import React, { useEffect, useRef, useState } from "react";

const ArtworkCard = ({ artwork, rating }) => {
  const titleRef = useRef(null);
  const [isLongTitle, setIsLongTitle] = useState(false);

  useEffect(() => {
    const checkTitleLength = () => {
      const titleElement = titleRef.current;
      if (titleElement) {
        const lineHeight = parseInt(window.getComputedStyle(titleElement).lineHeight);
        const maxHeight = lineHeight * 2;
        setIsLongTitle(titleElement.scrollHeight > maxHeight);
      }
    };

    checkTitleLength();
    window.addEventListener('resize', checkTitleLength);
    return () => window.removeEventListener('resize', checkTitleLength);
  }, [artwork.title]);

  // Get the appropriate star color based on rating
  const getStarColor = () => {
    if (!rating) return 'rgba(0, 0, 0, 0.4)'; 
    return `var(--star-color-${rating})`; 
  };

  return (
    <div className="art-card-container">
      <div className="top-item">
        <div className="card-image">
          <img
            src={artwork.primaryImage || "/api/placeholder/300/200"}
            alt={artwork.title}
          />
        </div>
      </div>
      <div className="bottom-item">
        <div className="location-star">
          <div className="location">
            <LocationPin className="location-pin" />
            <span>{artwork.location}</span>
          </div>
          <Star 
            className="card-star" 
            style={{ 
              fill: getStarColor(),
              opacity: rating ? 1 : 0.4
            }} 
          />
        </div>
        <h3 
          ref={titleRef}
          className={`artwork-card-title ${isLongTitle ? 'long-title' : ''}`}
        >
          {artwork.title}
        </h3>
        <p className="artwork-card-artist">{artwork.artist}</p>
      </div>
    </div>
  );
};

export default ArtworkCard;