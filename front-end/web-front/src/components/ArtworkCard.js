import React from "react";
import "./ArtworkCard.css";
import { ReactComponent as LocationPin } from "../assets/location_pin.svg";
import { ReactComponent as Star } from "../assets/star.svg";

const ArtworkCard = ({ artwork, rating }) => {
  return (
    <div className="art-card-container">
      <div className="top-item">
        <img
          src={artwork.imageUrl || "/api/placeholder/300/200"}
          alt={artwork.title}
          className="card-image"
        />
      </div>
      <div className="bottom-item">
        <div className="location-star">
          <div className="location">
            <LocationPin className="location-pin" />
            <span>{artwork.location}</span>
          </div>
          <Star className="card-star" />
        </div>
        <h3 className="artwork-card-title">{artwork.title}</h3>
        <p className="artwork-card-artist">{artwork.artist}</p>
      </div>
    </div>
  );
};

export default ArtworkCard;
