import React from "react";
import { ReactComponent as Star } from "../assets/star.svg";
import "./Artwork-Details.css";

const ART_DETAILS = {
  image: "Artwork Image Here",
  title: "Artwork Name Here",
  location: "On View At (location)",
  artist: "Artist Name",
  date: "Date Created",
  period: "Period (if applicable)",
  culture: "Culture (if applicable)",
  medium: "Medium Used",
  about: "About the Artwork",
  resources: "Resources for Further Reading",
  rating: 0,
};

function ArtworkDetails() {
  return (
    <div className="artwork-container">
      <div className="left-container">
        <div className="artwork-image"> {ART_DETAILS.image} </div>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={32}
              className={`${
                star <= ART_DETAILS.rating
                  ? star === 2
                    ? "fill-red-500 text-red-500"
                    : star === 3
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-green-500 text-green-500"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="right-container">
        <div className="artwork-title"> {ART_DETAILS.title}</div>
        <div className="artwork-location"> {ART_DETAILS.location} </div>
        <div className="artwork-info">
          {[
            { label: "Artist", value: ART_DETAILS.artist },
            { label: "Date", value: ART_DETAILS.date },
            { label: "Period", value: ART_DETAILS.period },
            { label: "Culture", value: ART_DETAILS.culture },
            { label: "Medium", value: ART_DETAILS.medium },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="art-info">{label}:</div>
              <div>{value}</div>
            </div>
          ))}
        </div>
        <div className="about-container">
          <div className="about-title">About</div>
          <div className="about-text">{ART_DETAILS.about}</div>
        </div>
        <div className="resources-container">
          <div className="resources-title">Resources</div>
          <div className="resources-text">{ART_DETAILS.resources}</div>
        </div>
      </div>
    </div>
  );
}

export default ArtworkDetails;
