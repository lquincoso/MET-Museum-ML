import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ArtworkCard from "../components/ArtworkCard";
import { ReactComponent as Star } from "../assets/star.svg";
import AuthContext from "../context/AuthContext";
import "./My-Gallery.css";

const MyGallery = () => {
  const navigate = useNavigate();
  const [selectedStar, setSelectedStar] = useState(0);
  const [userArtworks, setUserArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authTokens, refreshToken, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserRatings = async () => {
      if (!authTokens?.access || !user) return;

      try {
        let response = await fetch("http://127.0.0.1:8000/api/ratings/", {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });

        if (response.status === 401) {
          const newToken = await refreshToken();
          if (newToken) {
            response = await fetch("http://127.0.0.1:8000/api/ratings/", {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            });
          }
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch ratings: ${response.status}`);
        }

        const ratings = await response.json();
        const userRatings = ratings.filter(
          (rating) => rating.user === user.user_id
        );
        console.log(
          "Filtered ratings for user",
          user.user_id,
          ":",
          userRatings
        );
        await fetchArtworkDetails(userRatings);
      } catch (error) {
        console.error("Error fetching user ratings:", error);
        setError("Failed to load your rated artworks");
      } finally {
        setLoading(false);
      }
    };

    const fetchArtworkDetails = async (ratings) => {
      try {
        const artworkPromises = ratings.map(async (rating) => {
          const response = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${rating.artwork_id}`
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch artwork ${rating.artwork_id}`);
          }

          const data = await response.json();
          return {
            id: rating.artwork_id,
            title: data.title,
            artist: data.artistDisplayName || "Unknown Artist",
            location: data.GalleryNumber
              ? `Gallery ${data.GalleryNumber}`
              : "Not on view",
            primaryImage: data.primaryImage || "/api/placeholder/300/200",
            rating: rating.rating,
            ratedAt: new Date(rating.updated_at).toLocaleDateString(),
            userId: rating.user,
          };
        });

        const artworks = await Promise.all(artworkPromises);
        // Sort artworks by rating date, most recent first
        const sortedArtworks = artworks.sort(
          (a, b) => new Date(b.ratedAt) - new Date(a.ratedAt)
        );
        console.log(
          "Fetched artworks for user",
          user.user_id,
          ":",
          sortedArtworks
        );
        setUserArtworks(sortedArtworks);
      } catch (error) {
        console.error("Error fetching artwork details:", error);
        setError("Failed to load artwork details");
      }
    };

    fetchUserRatings();
  }, [authTokens, refreshToken, user]);

  const handleArtworkClick = (artworkId) => {
    navigate(`/artwork/${artworkId}`);
  };

  const handleStarClick = (starNumber) => {
    setSelectedStar((prevStar) => (prevStar === starNumber ? 0 : starNumber));
  };

  const filteredArtworks = userArtworks.filter(
    (artwork) => selectedStar === 0 || artwork.rating === selectedStar
  );

  if (!authTokens || !user) {
    return (
      <div className="gallery-container">
        Please log in to view your rated artworks
      </div>
    );
  }

  if (loading) {
    return <div className="gallery-container">Loading your gallery...</div>;
  }

  if (error) {
    return <div className="gallery-container">{error}</div>;
  }

  return (
    <div className="gallery-container">
      <h1 className="gallery-heading">My Rated Artworks</h1>
      <div className="gallery-rating">
        {[1, 2, 3, 4, 5].map((starNumber) => (
          <button
            key={starNumber}
            className="gallery-stars"
            onClick={() => handleStarClick(starNumber)}
          >
            <Star
              className={`gallery-star ${
                selectedStar === starNumber
                  ? "gallery-star-clicked"
                  : "gallery-star-inactive"
              }`}
              style={{ "--star-color": `var(--star-color-${starNumber})` }}
            />
          </button>
        ))}
        <button
          onClick={() => setSelectedStar(0)}
          className="gallery-rating-btn"
        >
          Clear
        </button>
      </div>

      <div className="gallery-rated">
        {filteredArtworks.length > 0 ? (
          filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              onClick={() => handleArtworkClick(artwork.id)}
            >
              <ArtworkCard artwork={artwork} rating={artwork.rating} />
            </div>
          ))
        ) : (
          <div>
            {selectedStar > 0
              ? `No artworks found`
              : "No rated artworks found"}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGallery;
