import React from "react";
import ReviewForm from "../ReviewForm/ReviewForm";
import StarRating from "../StarRating/StarRating";
import "./MovieList.css";

const MovieList = ({ movies, addReview, rateMovie }) => {
  return (
    <div className="movie__list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie__card">
          <h2>{movie.title}</h2>
          <div className="rating__container">
            <StarRating
              currentRating={movie.averageRating}
              onRate={(rating) => rateMovie(movie.id, rating)}
            />
            <span className="rating__count">
              ({movie.ratings.length} ratings)
            </span>
          </div>
          <ReviewForm movieId={movie.id} addReview={addReview} />
          <ul className="reviews__list">
            {movie.reviews.map((review, index) => (
              <li key={index}>{review}</li>
            ))}
          </ul>
          <div className="reviews__count">
            {movie.reviews.length}{" "}
            {movie.reviews.length === 1 ? "review" : "reviews"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
