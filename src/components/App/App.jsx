import React, { useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import MovieList from "../MovieList/MovieList";
import Header from "../Header/Header";
import MovieDetail from "../MovieDetail/MovieDetail";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import MovieSearch from "../MovieSearch/MovieSearch";
import Profile from "../Profile/Profile";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../utils/api";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isMovieSearchOpen, setIsMovieSearchOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  let navigate = useNavigate();

  const handleRegisterSubmit = (name, email, password, avatar, resetForm) => {
    console.log("Registration data:", { name, email, password, avatar });
    resetForm(); // Clear form
    setIsRegisterModalOpen(false); // Close modal
  };

  const handleMovieSelect = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleLogin = (email, password) => {
    console.log("Login attempt:", email, password);
    // Add your authentication logic here
    setIsLoginModalOpen(false);
    getCurrentUser().then((user) => {
      setCurrentUser(user);
    });
    navigate("/profile");
  };

  console.log(isMovieSearchOpen);
  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          onLoginButtonClick={() => setIsLoginModalOpen(true)}
          onRegisterButtonClick={() => setIsRegisterModalOpen(true)}
          onSearchButtonClick={() => setIsMovieSearchOpen(true)}
        />
        <Routes>
          <Route index element={<Movies />}></Route>
          <Route
            path="/profile"
            element={<Profile user={currentUser} />}
          ></Route>
          <Route path="/movie/:movieId" element={<MovieDetail />} />
        </Routes>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
        />

        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          onRegisterModalSubmit={handleRegisterSubmit}
        />
        <MovieSearch
          isOpen={isMovieSearchOpen}
          onClose={() => setIsMovieSearchOpen(false)}
          onSelectMovie={handleMovieSelect}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

const Movies = () => {
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
    return parseFloat((sum / ratings.length).toFixed(1));
  };

  // user rating
  // based on whatever stars user gives it and then adds to avg rating

  return (
    <div className="app">
      <h1>Movie Review App</h1>
      <MovieList movies={movies} addReview={addReview} rateMovie={rateMovie} />
    </div>
  );
};

export default App;
