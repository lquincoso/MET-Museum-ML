import React, { useState, useEffect } from "react";
import { ReactComponent as Star } from "../assets/star.svg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ArtInfo from "../components/ArtInfo";
import RelatedArt from "../components/RelatedArt";
import Education from "../components/Education";
import "./Artwork-Details.css";

const ArtworkDetails = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    const fetchArtworkDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        );
        if (!response.ok) throw new Error("Artwork not found");
        const data = await response.json();

        setArtwork({
          image: data.primaryImage || "/api/placeholder/600/400",
          title: data.title,
          location: data.GalleryNumber
            ? `Gallery ${data.GalleryNumber}`
            : "Not on view",
          artist: data.artistDisplayName || "Unknown Artist",
          date: data.objectDate || "Date unknown",
          period: data.period || "Period unknown",
          culture: data.culture || "Culture unknown",
          medium: data.medium || "Medium unknown",
          about:
            // fetch description from Wikipedia or other source
            data.description || "No description available",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArtworkDetails();
    }
  }, [id]);

  const handleStarClick = (starIndex) => {
    setSelectedStar((prevStar) => (prevStar === starIndex ? null : starIndex));
  };

  if (loading) {
    return <div className="loading-container">Loading artwork details...</div>;
  }

  if (error) {
    return (
      <div className="error-container">Error loading artwork: {error}</div>
    );
  }

  if (!artwork) return null;

  return (
    <div className="artwork-details-container">
      <div className="left-container">
        <div className="details-artwork-image">
          <img src={artwork.image} alt={artwork.title} />
        </div>
        <div className="details-rating">
          {[1, 2, 3, 4, 5].map((starNumber) => (
            <button key={starNumber} className="details-stars">
              <Star
                onClick={() => handleStarClick(starNumber)}
                className={`details-star ${
                  selectedStar === starNumber
                    ? "details-star-clicked"
                    : "details-star-inactive"
                }`}
                style={{ "--star-color": `var(--star-color-${starNumber})` }}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="right-container">
        <div className="artwork-title">{artwork.title}</div>
        <div className="artwork-location">
          On View At: <Link to="/"> {artwork.location}</Link>
        </div>
        <div className="details-related-education-buttons">
          <button
            className={`details-related-education-button ${
              activeTab === "details"
                ? "details-related-education-button-clicked"
                : ""
            }`}
            onClick={() => setActiveTab("details")}
          >
            Artwork Details
          </button>
          <button
            className={`details-related-education-button ${
              activeTab === "related"
                ? "details-related-education-button-clicked"
                : ""
            }`}
            onClick={() => setActiveTab("related")}
          >
            Related Artworks
          </button>
          <button
            className={`details-related-education-button ${
              activeTab === "education"
                ? "details-related-education-button-clicked"
                : ""
            }`}
            onClick={() => setActiveTab("education")}
          >
            Learn More
          </button>
        </div>
        <div className="art-details-related-container">
          {activeTab === "details" ? (
            <div className="artwork-details">
              <ArtInfo artwork={artwork} />
            </div>
          ) : activeTab === "related" ? (
            <div className="related-artwork">
              <RelatedArt artwork={artwork} />
            </div>
          ) : (
            <div className="artwork-education"> <Education artwork={artwork}/></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetails;
