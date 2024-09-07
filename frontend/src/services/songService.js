import axios from "axios";

export const getSongs = async (query) => {
  try {
    const response = await axios.get(`/api/search`, {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
