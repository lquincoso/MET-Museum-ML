import React, { useState, useEffect, useCallback } from "react";
import "./Education.css";
import axios from "axios";

function Education({ artwork }) {
  const [articles, setArticles] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [geminiResponse, setGeminiResponse] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const fetchWikipediaArticles = async (query) => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
          query
        )}&format=json&origin=*`
      );
      const data = await response.json();

      return (
        data.query?.search?.slice(0, 1).map((result) => ({
          title: result.title,
          summary: result.snippet.replace(/<\/?[^>]+(>|$)/g, ""), // Strip HTML tags
          url: `https://en.wikipedia.org/wiki/${encodeURIComponent(
            result.title
          )}`,
        })) || []
      );
    } catch (error) {
      console.error("Error fetching Wikipedia articles:", error);
      return [];
    }
  };

  const fetchGoogleBooks = async (query) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();

      return (
        data.items?.slice(0, 4).map((book) => ({
          title: book.volumeInfo.title,
          summary: book.volumeInfo.description || "No description available.",
          url: book.volumeInfo.infoLink,
        })) || []
      );
    } catch (error) {
      console.error("Error fetching Google Books:", error);
      return [];
    }
  };

  const fetchGemini = async (query) => {
    try {
      setChatLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:5000/education/api/gemini",
        { prompt: query },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setGeminiResponse(response.data.response || "No insights available.");
    } catch (error) {
      console.error("Error fetching Gemini data:", error.response?.data || error.message);
      setGeminiResponse("An error occurred while fetching Gemini data.");
    } finally {
      setChatLoading(false);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const queryParts = [];
      if (artwork.title) queryParts.push(artwork.title);
      if (artwork.artist && artwork.artist !== "Unknown Artist")
        queryParts.push(artwork.artist);
      if (artwork.period && artwork.period !== "Period unknown")
        queryParts.push(artwork.period);

      const query = queryParts.join(" ");
      if (!query) {
        setError("No sufficient information to perform an online search.");
        setLoading(false);
        return;
      }

      const wikipediaArticles = await fetchWikipediaArticles(query);
      const britannicaUrl = `https://www.britannica.com/search?query=${encodeURIComponent(
        query
      )}`;
      const googleBooks = await fetchGoogleBooks(query);

      setArticles([
        ...wikipediaArticles,
        {
          title: "Encyclopedia Britannica",
          summary: "Search for this topic on Britannica.",
          url: britannicaUrl,
        },
      ]);
      setBooks([...googleBooks]);

      fetchGemini(query);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [artwork]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div className="education-loading">Loading resources...</div>;
  }

  if (error) {
    return <div className="education-error">Error: {error}</div>;
  }

  return (
    <div className="education-container">
      {/* Articles Section */}
      <div className="education-section">
        <h3>Articles related to "{artwork.title || "This Artwork"}"</h3>
        <div className="education-grid">
          {articles.map((article, index) => (
            <div key={index} className="education-card">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="education-link"
              >
                <div className="education-content">
                  <h4>{article.title}</h4>
                  <p>{article.summary}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Books Section */}
      <div className="education-section">
        <h3>Books related to "{artwork.title || "This Artwork"}"</h3>
        <div className="education-grid">
          {books.map((book, index) => (
            <div key={index} className="education-card">
              <a
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="education-link"
              >
                <div className="education-content">
                  <h4>{book.title}</h4>
                  <p>{book.summary}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Gemini Insights */}
      <div className="education-section">
        <h3>Insights from Gemini</h3>
        {chatLoading ? (
          <div className="education-loading">Loading Gemini insights...</div>
        ) : (
          <div className="education-card education-gemini-content">
            <div className="education-content">
              <p>{geminiResponse}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Education;
