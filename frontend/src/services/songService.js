import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Adjust if needed

export const getSongs = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: { query }
        });
        return response;
    } catch (error) {
        throw error;
    }
};
