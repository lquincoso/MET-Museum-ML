import React, { useState } from "react";
import ArtworkCard from "../components/ArtworkCard";
import { ReactComponent as Star } from "../assets/star.svg";
import "./My-Gallery.css";

const MyGallery = () => {
  const [selectedStar, setSelectedStar] = useState(0);

  const handleStarClick = (starIndex) => {
    setSelectedStar((prevStar) => (prevStar === starIndex ? null : starIndex));
  };

  const artworks = [
    {
      id: 1,
      title: "Artwork Title",
      artist: "Artwork Artist",
      location: "Gallery Location",
      imageUrl: "/api/placeholder/300/200",
      rating: 4,
    },
  ];

  const filteredArtworks = artworks.filter(
    (artwork) => selectedStar === 0 || artwork.rating === selectedStar
  );

  return (
    <div className="gallery-container">
      <div className="gallery-rating">
        {[1, 2, 3, 4, 5].map((starNumber) => (
          <button className="gallery-stars">
            <Star
              size={30}
              onClick={() => handleStarClick(starNumber)}
              className={`gallery-star ${
                selectedStar === starNumber ? "gallery-star-clicked" : "gallery-star-inactive"
              }`}
              style={{ "--star-color": `var(--star-color-${starNumber})` }}
            />
          </button>
        ))}
        <button
          onClick={() => setSelectedStar(0)}
          className="clear-filter-button"
        >
          Clear Filter
        </button>
      </div>

      {/* Artwork grid */}
      <div className="artwork-rated">
        {filteredArtworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </div>
  );
};

export default MyGallery;
