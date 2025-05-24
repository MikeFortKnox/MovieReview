import { useState } from "react";
import { searchMovies } from "../../contexts/SearchMovieApi";
import "./MovieSearch.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const MovieSearch = ({ onSelectMovie, isOpen, onClose }) => {
  const [searchFields, setSearchFields] = useState({
    title: "",
    director: "",
    year: "",
  });
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ratings state: { imdbID: averageRating }
  const [movieRatings, setMovieRatings] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchMovies(searchFields);
      if (!results || results.length === 0) {
        setError("No movies found.");
        setMovies([]);
        setMovieRatings({});
      } else {
        setMovies(results);
        // Initialize ratings for found movies if not already set
        const initialRatings = {};
        results.forEach((movie) => {
          initialRatings[movie.imdbID] = movieRatings[movie.imdbID] || 0;
        });
        setMovieRatings(initialRatings);
      }
    } catch (err) {
      setError("An error occurred while searching for movies.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMovieClick = (movieId) => {
    onSelectMovie(movieId);
    onClose();
    setSearchFields({
      title: "",
      director: "",
      year: "",
    });
    setMovies([]);
    setMovieRatings({});
  };

  const handleRateMovie = (imdbID, rating) => {
    setMovieRatings((prevRatings) => ({
      ...prevRatings,
      [imdbID]: rating,
    }));
  };

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Movie Search"
      buttonText="Movie Search"
      isOpen={isOpen}
      onClose={onClose}
      onFormSubmit={handleSearch}
    >
      <div className="movie_search">
        <div>
          <input
            type="text"
            className="movie__input"
            name="title"
            value={searchFields.title}
            onChange={handleInputChange}
            placeholder="Title"
          />

          <input
            type="number"
            className="movie__input"
            name="year"
            value={searchFields.year}
            onChange={handleInputChange}
            placeholder="Year"
            min="1888"
            max={new Date().getFullYear()}
          />
          <button
            className="movie__search-button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        <div className="movie_results">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="movie_card"
              onClick={() => handleMovieClick(movie.imdbID)}
            >
              <img src={movie.Poster} alt={movie.Title} />
              <h3>
                {movie.Title} ({movie.Year})
              </h3>
            </div>
          ))}
        </div>
      </div>
    </ModalWithForm>
  );
};

export default MovieSearch;
