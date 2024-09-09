import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSongs } from "../services/songService";
import ErrorPage from "./ErrorPage";

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    if (query) {
      fetchSongs(query);
    }
  }, [location]);

  const fetchSongs = async (query) => {
    try {
      const response = await getSongs(query);
      console.log("Fetched data:", response);
      setResults(response || []);
    } catch (error) {
      console.error("Error fetching songs:", error);
      setError("Error fetching songs");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorPage message={error} />;

  return (
    <div className="container mt-5">
      <h1>Search Results</h1>
      <button onClick={handleGoBack} className="btn btn-primary mb-3">
        Go Back
      </button>
      {results.length > 0 ? (
        <ul className="list-group">
          {results.map((song) => (
            <li key={song._id} className="list-group-item">
              <h5>{song._source.title}</h5>
              <p>
                {song._source.artist} - {song._source.album}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default ResultsPage;
