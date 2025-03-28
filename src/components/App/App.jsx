import React, { useState } from "react";
import MovieList from "./components/MovieList/MovieList";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      reviews: [],
      ratings: [], // Stores individual ratings 1-5
      averageRating: 0, // Calculated average
    },
    {
      id: 2,
      title: "Interstellar",
      reviews: [],
      ratings: [],
      averageRating: 0,
    },
    // Add more movies...
  ]);

  // Add a review
  const addReview = (movieId, review) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, reviews: [...movie.reviews, review] }
          : movie
      )
    );
  };

  // Rate a movie (new)
  const rateMovie = (movieId, newRating) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) => {
        if (movie.id === movieId) {
          const updatedRatings = [...movie.ratings, newRating];
          const avgRating = calculateAverage(updatedRatings);
          return {
            ...movie,
            ratings: updatedRatings,
            averageRating: avgRating,
          };
        }
        return movie;
      })
    );
  };

  //Calculate average rating
  const calculateAverage = (ratings) => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return parseFloat((sum / ratings.length).toFixed(1)); // ex. "4.3"
  };

  return (
    <div className="app">
      <h1>Movie Review App</h1>
      <MovieList movies={movies} addReview={addReview} rateMovie={rateMovie} />
    </div>
  );
};

export default App;
