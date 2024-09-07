import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorPage from "./ErrorPage"; // Import the ErrorPage component

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null); // Add error state
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    if (query.trim()) {
      try {
        const response = await axios.get(`/api/search`, {
          params: { q: query }, // Ensure the param matches 'q'
        });
        setResults(response.data);
        navigate(`/results?query=${encodeURIComponent(query)}`);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later."); // Set error message
      }
    }
  };

  if (error) {
    return <ErrorPage message={error} />; // Display ErrorPage component
  }

  return (
    <div className="container mt-5">
      <h1>Search for Songs</h1>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter part of song title (eg. 'You')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      {/* Render results if needed */}
      <div>
        {results.length > 0 && (
          <ul>
            {results.map((result) => (
              <li key={result.id}>
                {result.title} by {result.artist}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
