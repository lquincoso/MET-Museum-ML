import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar";
import ArtworkCard from "../components/ArtworkCard";
import "./Art-Search.css";

const ArtSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 40;

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
      location: artwork.GalleryNumber ? `Gallery ${artwork.GalleryNumber}` : "Not on display",
      artist: artwork.artistDisplayName || "Unknown artist",
    }));
  }, []);

  const fetchArtworks = useCallback(
    async (query = "") => {
      setLoading(true);
      setError(null);
      try {
        let objectIds;
        if (query) {
          const searchResponse = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`
          );
          const searchData = await searchResponse.json();
          objectIds = searchData.objectIDs || [];
        } else {
          const response = await fetch(
            "https://collectionapi.metmuseum.org/public/collection/v1/objects"
          );
          const data = await response.json();
          objectIds = data.objectIDs || [];
        }

        setTotalPages(Math.ceil(objectIds.length / itemsPerPage));

        const startIndex = (currentPage - 1) * itemsPerPage;
        const pageObjectIds = objectIds.slice(
          startIndex,
          startIndex + itemsPerPage
        );

        const artworkDetails = await fetchArtworkDetails(pageObjectIds);
        setArtworks(artworkDetails);
      } catch (err) {
        setError("Failed to fetch artworks. Please try again.");
        console.error("Error fetching artworks:", err);
      }
      setLoading(false);
    },
    [currentPage, fetchArtworkDetails]
  );

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  useEffect(() => {
    if (searchQuery) {
      setCurrentPage(1);
      fetchArtworks(searchQuery);
    }
  }, [searchQuery, fetchArtworks]);

  useEffect(() => {
    fetchArtworks(searchQuery);
  }, [currentPage, searchQuery, fetchArtworks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const handleArtworkClick = (artworkId) => {
    navigate(`/artwork/${artworkId}`);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const showPages = 5; // Number of pages to show on each side

    // Calculate start and end page numbers
    let startPage = Math.max(currentPage - showPages, 1);
    let endPage = Math.min(currentPage + showPages, totalPages);

    // Adjust if we're near the beginning or end
    if (currentPage <= showPages) {
      endPage = Math.min(showPages * 2 + 1, totalPages);
    } else if (currentPage >= totalPages - showPages) {
      startPage = Math.max(totalPages - (showPages * 2), 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="art-search">
      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <label htmlFor="search">Search for Art</label>
          <input
            type="text"
            id="search"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter artist, title, culture, or description..."
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      <div className="search-result-container">
        <div className="search-filter">
          <FilterSidebar />
        </div>
        <div className="search-result">
          {error && <div className="error-message">{error}</div>}
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              <div className="artwork-grid">
                {artworks.map((artwork) => (
                  <div
                    key={artwork.objectID}
                    onClick={() => handleArtworkClick(artwork.objectID)}
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <ArtworkCard
                      artwork={artwork}
                      rating={0}
                    />
                  </div>
                ))}
              </div>
              {artworks.length === 0 && <p>No artworks found.</p>}
              <div className="pagination">
                {/* First page button */}
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1 || loading}
                  className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  First
                </button>

                {/* Previous page button */}
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1 || loading}
                  className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  Previous
                </button>

                {/* Page numbers */}
                <div className="page-numbers">
                  {getPageNumbers().map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      disabled={loading}
                      className={`px-3 py-2 rounded-md ${
                        currentPage === pageNum
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                {/* Next page button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages || loading}
                  className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  Next
                </button>

                {/* Last page button */}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages || loading}
                  className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  Last
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtSearch;