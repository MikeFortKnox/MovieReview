const API_KEY = "ef0fc259";
const BASE_URL = "http://www.omdbapi.com/";

export const searchMovies = async ({ title, director, year }) => {
  try {
    let queryParams = new URLSearchParams({
      apikey: API_KEY,
      s: title,
      director: director,
      y: year,
    });

    const response = await fetch(`${BASE_URL}?${queryParams.toString()}`);
    const data = await response.json();
    return data.Search || []; // Return empty array if no results
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
