import React, { useState } from "react";
import { ReactComponent as Star } from "../assets/star.svg";
import "./Artwork-Details.css";

const ART_DETAILS = {
  image: "Artwork Image Here",
  title: "Artwork Name Here",
  location: "(location)",
  artist: "Artist Name",
  date: "Date Created",
  period: "Period (if applicable)",
  culture: "Culture (if applicable)",
  medium: "Medium Used",
  about: "About the Artwork",
  resources: "Resources for Further Reading",
};

function ArtworkDetails() {
  const [selectedStar, setSelectedStar] = useState(null);

  const handleStarClick = (starIndex) => {
    setSelectedStar((prevStar) => (prevStar === starIndex ? null : starIndex));
  };

  return (
    <div className="artwork-details-container">
      <div className="left-container">
        <div className="details-artwork-image"> {ART_DETAILS.image} </div>
        <div className="details-rating">
          {[1, 2, 3, 4, 5].map((starNumber) => (
            <button className="details-stars">
              <Star
                size={30}
                onClick={() => handleStarClick(starNumber)}
                className={`details-star ${
                  selectedStar === starNumber ? "details-star-clicked" : "details-star-inactive"
                }`}
                style={{ "--star-color": `var(--star-color-${starNumber})` }}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="right-container">
        <div className="artwork-title"> {ART_DETAILS.title}</div>
        <div className="artwork-location">
          {" "}
          On View At: {ART_DETAILS.location}{" "}
        </div>
        <div className="artwork-info">
          {[
            { label: "Artist", value: ART_DETAILS.artist },
            { label: "Date", value: ART_DETAILS.date },
            { label: "Period", value: ART_DETAILS.period },
            { label: "Culture", value: ART_DETAILS.culture },
            { label: "Medium", value: ART_DETAILS.medium },
          ].map(({ label, value }) => (
            <div key={label} className="art-info-item">
              <div className="art-info-label">{label}:</div>
              <div className="art-info-value">{value}</div>
            </div>
          ))}
        </div>
        <div className="about-container">
          <div className="art-info-label">About: </div>
          <div className="about-text">{ART_DETAILS.about}</div>
        </div>
        <div className="resources-container">
          <div className="art-info-label">Resources: </div>
          <div className="resources-text">{ART_DETAILS.resources}</div>
        </div>
      </div>
    </div>
  );
}

export default ArtworkDetails;
