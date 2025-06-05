import React, { useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import MovieList from "../MovieList/MovieList";
import Header from "../Header/Header";
import MovieDetail from "../MovieDetail/MovieDetail";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import MovieSearch from "../MovieSearch/MovieSearch";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Profile from "../Profile/Profile";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../utils/api";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isMovieSearchOpen, setIsMovieSearchOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
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
    {
      id: "tt0076759",
      title: "Star Wars",
      reviews: [],
      ratings: [],
      averageRating: 0,
    },
    // Add more movies...
  ]);

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
      setIsLoggedIn(true);
      setCurrentUser(user);
    });
    navigate("/profile");
  };

  const handleEditProfileSubmit = (name, avatar) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      name,
      avatar: avatar instanceof File ? URL.createObjectURL(avatar) : avatar,
    }));
    setIsEditProfileModalOpen(false);
  };

  console.log(isMovieSearchOpen);

  const addReview = (movieId, review) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, reviews: [...movie.reviews, review] }
          : movie
      )
    );
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (review) {
      addReview(movieRatings, review);
      setReview("");
    }
  };

  // Rate a movie (new)
  const addRating = (movieId, newRating) => {
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
      <h1 className="app_title">Movie Review App</h1>
      {/* <MovieList movies={movies} addReview={addReview} rateMovie={rateMovie} /> */}

      <CurrentUserContext.Provider value={currentUser}>
        <Header
          onLoginButtonClick={() => setIsLoginModalOpen(true)}
          onRegisterButtonClick={() => setIsRegisterModalOpen(true)}
          onSearchButtonClick={() => setIsMovieSearchOpen(true)}
          isLoggedIn={isLoggedIn}
        />
        <Routes>
          {/* <Route index element={<Movies />}></Route> */}
          <Route
            path="/profile"
            element={<Profile user={currentUser} />}
            onEditProfile={() => setIsEditProfileModalOpen(true)}
          ></Route>
          <Route
            path="/movie/:movieId"
            element={
              <MovieDetail
                movies={movies}
                addRating={addRating}
                addReview={addReview}
              />
            }
          />
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

export default App;
