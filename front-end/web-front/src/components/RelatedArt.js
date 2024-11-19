import "./RelatedArt.css";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import RelatedArtworkCard from "../components/RelatedArtworkCard";

function RelatedArt({ artworkId }) {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // function to fetch artwork details (Might not need modification)
  const fetchArtworkDetails = useCallback(async (objectIds) => {
    const artworkPromises = objectIds.map((id) =>
      fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
      ).then((res) => res.json())
    );

    const artworkDetails = await Promise.all(artworkPromises);
    return artworkDetails.map((artwork) => ({
      ...artwork,
      image: artwork.primaryImage || "/api/placeholder/600/400",
      artist: artwork.artistDisplayName || "Unknown artist",
    }));
  }, []);

  // function to fetch related art from the backend
  const fetchRelatedArt = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Making a request to the backend to get related artwork IDs
      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ artwork_id: artworkId }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch similar artworks from backend");
      }

      const data = await response.json();
      const objectIds = data.similar_artworks;

      if (objectIds.length === 0) {
        setError("No similar artworks found.");
        setArtworks([]);
        return;
      }

      // Fetching artwork details from the Met API
      const artworkDetails = await fetchArtworkDetails(objectIds);
      setArtworks(artworkDetails);
    } catch (err) {
      setError("Failed to fetch artworks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [fetchArtworkDetails, artworkId]);

  useEffect(() => {
    if (artworkId) {
      console.log("Artwork ID in RelatedArt:", artworkId);
      fetchRelatedArt();
    } else {
      console.error("Artwork ID is undefined in RelatedArt");
    }
  }, [fetchRelatedArt, artworkId]);
  

  // no need to modify this anything below
  if (loading) {
    return <div>Loading artworks...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleArtworkClick = (artworkId) => {
    navigate(`/artwork/${artworkId}`);
  };

  return (
    <>
      <div className="details-rating">
        {artworks.map((artwork) => (
          <button
            key={artwork.objectID}
            className="related-cards"
            onClick={() => handleArtworkClick(artwork.objectID)}
          >
            <RelatedArtworkCard artwork={artwork} />
          </button>
        ))}
      </div>
    </>
  );
}

export default RelatedArt;
