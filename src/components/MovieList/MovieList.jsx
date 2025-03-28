import React from "react";
import ReviewForm from "../ReviewForm/ReviewForm";
import StarRating from "../StarRating/StarRating";
import "./MovieList.css";

const MovieList = ({ movies, addReview, rateMovie }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <h2>{movie.title}</h2>
          <div className="rating-container">
            <StarRating
              currentRating={movie.averageRating}
              onRate={(rating) => rateMovie(movie.id, rating)}
            />
            <span className="rating-count">
              ({movie.ratings.length} ratings)
            </span>
          </div>
          <ReviewForm movieId={movie.id} addReview={addReview} />
          <ul className="reviews-list">
            {movie.reviews.map((review, index) => (
              <li key={index}>{review}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
