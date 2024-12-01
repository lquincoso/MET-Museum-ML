import React, { useState, useEffect } from "react";
import "./Education.css";
import axios from 'axios';

function Education({ artwork }) {
  const [articles, setArticles] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatGptResponse, setChatGptResponse] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  // Function to fetch Google Books data
  const fetchGoogleBooks = async (query) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
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

  // Function to fetch Project Gutenberg data
  const fetchGutenbergBooks = async (query) => {
    try {
      const response = await fetch(
        `https://gutendex.com/books/?search=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      return (
        data.results?.slice(0, 4).map((book) => ({
          title: book.title,
          summary: "Available on Project Gutenberg.",
          url: `https://www.gutenberg.org/ebooks/${book.id}`,
        })) || []
      );
    } catch (error) {
      console.error("Error fetching Project Gutenberg:", error);
      return [];
    }
  };

  // Function to fetch ChatGPT response
  const fetchChatGPT = async (query) => {
    try {
      setChatLoading(true);
      const response = await axios.post("http://127.0.0.1:5000/api/chatgpt", {
        prompt: query,
      });
      setChatGptResponse(response.data.response || "No insights available");
    } catch (error) {
      console.error("Error fetching ChatGPT response:", error);
      setChatGptResponse("An error occurred while fetching ChatGPT data.");
    } finally {
      setChatLoading(false);
    }
  };

  // Main function to fetch all data
  const fetchData = async () => {
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

      // Fetch data from various sources
      const wikipediaResponse = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          query
        )}`
      );
      const wikipediaData = await wikipediaResponse.json();

      const britannicaUrl = `https://www.britannica.com/search?query=${encodeURIComponent(
        query
      )}`;
      const googleBooks = await fetchGoogleBooks(query);
      const gutenbergBooks = await fetchGutenbergBooks(query);

      setArticles([
        {
          title: "Wikipedia",
          summary: wikipediaData.extract || "No summary available.",
          url: wikipediaData.content_urls?.desktop?.page || "#",
        },
        {
          title: "Encyclopedia Britannica",
          summary: "Search for this topic on Britannica.",
          url: britannicaUrl,
        },
      ]);

      setBooks([...googleBooks, ...gutenbergBooks]);

      // Fetch ChatGPT response
      fetchChatGPT(query);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [artwork]);

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

      {/* ChatGPT Section */}
      <div className="education-section">
        <h3>Insights from ChatGPT</h3>
        {chatLoading ? (
          <div className="education-loading">Loading ChatGPT insights...</div>
        ) : (
          <div className="education-card">
            <div className="education-content">
              <p>{chatGptResponse}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Education;
