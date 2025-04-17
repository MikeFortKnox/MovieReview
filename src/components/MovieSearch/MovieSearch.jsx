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

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const results = await searchMovies(searchFields);
    setMovies(results);
    setIsLoading(false);
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
  };

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Movie_Title"
      buttonText="Movie Search"
      isOpen={isOpen}
      onClose={onClose}
      onFormSubmit={handleSearch}
    >
      <div className="movie_search">
        <div>
          <input
            type="text"
            name="title"
            value={searchFields.title}
            onChange={handleInputChange}
            placeholder="Title"
          />

          <input
            type="number"
            name="year"
            value={searchFields.year}
            onChange={handleInputChange}
            placeholder="Year"
            min="1888"
            max={new Date().getFullYear()}
          />
          <button type="submit" disabled={isLoading}>
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
