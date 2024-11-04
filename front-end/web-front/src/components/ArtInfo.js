import React from "react";
import "./ArtInfo.css";
function ArtInfo({ artwork }) {
  return (
    <>
      <div className="artwork-info">
        {[
          { label: "Artist", value: artwork.artist },
          { label: "Date", value: artwork.date },
          { label: "Period", value: artwork.period },
          { label: "Culture", value: artwork.culture },
          { label: "Medium", value: artwork.medium },
        ].map(({ label, value }) => (
          <div key={label} className="art-info-item">
            <div className="art-info-label">{label}:</div>
            <div className="art-info-value">{value}</div>
          </div>
        ))}
      </div>
      <div className="about-container">
        <div className="art-info-label">About: </div>
        <div className="about-text">{artwork.about}</div>
      </div>
    </>
  );
}

export default ArtInfo;
