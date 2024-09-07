import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async (event) => {
        event.preventDefault();
        if (query.trim()) {
            try {
                const response = await axios.get(`/api/search`, {
                    params: { query }
                });
                setResults(response.data); // Handle the data as needed
                // Optionally navigate to results page
                navigate(`/results?query=${encodeURIComponent(query)}`);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1>Search for Songs</h1>
            <form onSubmit={handleSearch}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter song title, album, or artist"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            {/* Render results if needed */}
            <div>
                {results.length > 0 && (
                    <ul>
                        {results.map((result) => (
                            <li key={result.id}>{result.title} by {result.artist}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
