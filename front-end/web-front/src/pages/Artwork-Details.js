import React, { useState, useEffect, useContext } from "react";
import { ReactComponent as Star } from "../assets/star.svg";
import NoImage from "../assets/no_image.svg";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";
import ArtInfo from "../components/ArtInfo";
import RelatedArt from "../components/RelatedArt";
import Education from "../components/Education";
import "./Artwork-Details.css";

const ArtworkDetails = () => {
  const { artworkId } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);
  const [currentRating, setCurrentRating] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const { authTokens, refreshToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserRating = async () => {
      if (!authTokens?.access || !artworkId) return;

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/ratings/?artwork_id=${artworkId}`,
          {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            // Token expired, try to refresh
            const newToken = await refreshToken();
            if (newToken) {
              // Retry with new token
              const retryResponse = await fetch(
                `http://127.0.0.1:8000/api/ratings/?artwork_id=${artworkId}`,
                {
                  headers: {
                    Authorization: `Bearer ${newToken}`,
                  },
                }
              );
              if (retryResponse.ok) {
                const data = await retryResponse.json();
                handleRatingData(data);
              }
            }
          }
          throw new Error(`Failed to fetch rating: ${response.status}`);
        }

        const data = await response.json();
        handleRatingData(data);
      } catch (error) {
        console.error("Error fetching user rating:", error);
      }
    };

    const handleRatingData = (data) => {
      if (Array.isArray(data) && data.length > 0) {
        const userRating = data.find(
          (rating) => rating.artwork_id === parseInt(artworkId)
        );
        if (userRating) {
          setCurrentRating(userRating.rating);
          setSelectedStar(userRating.rating);
          console.log("User rating found:", userRating);
        }
      }
    };

    fetchUserRating();
  }, [artworkId, authTokens, refreshToken]);

  useEffect(() => {
    const fetchArtworkDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkId}`
        );
        if (!response.ok) throw new Error("Artwork not found");
        const data = await response.json();

        setArtwork({
          image: data.primaryImage || NoImage,
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

    if (artworkId) {
      fetchArtworkDetails();
    }
  }, [artworkId]);

  const handleStarClick = async (rating) => {
    if (!authTokens) {
      alert("Please log in to rate artworks");
      return;
    }

    try {
      let token = authTokens.access;

      // First attempt with current access token
      let response = await fetch("http://127.0.0.1:8000/api/ratings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ artwork_id: artworkId, rating }),
      });

      // If token is expired, try to refresh it
      if (response.status === 401) {
        console.log("Token expired, attempting to refresh...");
        const newToken = await refreshToken();

        if (newToken) {
          // Retry the request with new token
          response = await fetch("http://127.0.0.1:8000/api/ratings/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${newToken}`,
            },
            body: JSON.stringify({ artwork_id: artworkId, rating }),
          });
        } else {
          throw new Error("Could not refresh token");
        }
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Rating submitted successfully:", data);
        setCurrentRating(rating);
        setSelectedStar(rating);
      } else {
        throw new Error(`Failed to submit rating: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert(
        "An error occurred while submitting the rating. Please try again later."
      );
    }
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
                  selectedStar === starNumber || currentRating === starNumber
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
              <RelatedArt artworkId={artworkId} />
            </div>
          ) : (
            <div className="artwork-education">
              {" "}
              <Education artwork={artworkId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetails;
