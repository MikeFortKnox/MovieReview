import { useState, useEffect } from "react";
import { getMovieDetails } from "../../contexts/SearchMovieApi";
import { useParams } from "react-router-dom";
import MovieReviewForm from "../MovieReviewForm/MovieReviewForm";

const MovieDetail = ({ movies, addRating, addReview }) => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let params = useParams();
  console.log(params);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieDetails(params.movieId);
      setMovie(data);
      setIsLoading(false);
    };

    fetchMovie();
  }, [params.movieId]);

  if (isLoading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;
  console.log(movies, params.movieId);
  return (
    <div className="movie_detail">
      <div className="movie_header">
        <MovieReviewForm
          addRating={addRating}
          addReview={addReview}
          movieRatings={movies.find((m) => {
            if (m.id === params.movieId) return true;
            else return false;
          })}
          movie={movie}
        />
        <img src={movie.Poster} alt={movie.Title} />
        <div>
          <h1>
            {movie.Title} ({movie.Year})
          </h1>
          <p>
            {movie.Rated} | {movie.Runtime} | {movie.Genre}
          </p>
        </div>
      </div>
      <div className="movie_info">
        <p>Director: {movie.Director}</p>
        <p>Actors: {movie.Actors}</p>
        <p>Plot: {movie.Plot}</p>
        <p>IMDb Rating: {movie.imdbRating}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
