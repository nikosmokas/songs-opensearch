import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSongs } from '../services/songService'; // Adjust path as needed

const ResultsPage = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query');
        if (query) {
            fetchSongs(query);
        }
    }, [location]);

    const fetchSongs = async (query) => {
        try {
            const { data } = await getSongs(query);
            setResults(data);
        } catch (error) {
            console.error('Error fetching songs:', error);
            setError('Error fetching songs');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-5">
            <h1>Search Results</h1>
            {results.length > 0 ? (
                <ul className="list-group">
                    {results.map((song) => (
                        <li key={song.id} className="list-group-item">
                            <h5>{song.title}</h5>
                            <p>{song.artist} - {song.album}</p>
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
