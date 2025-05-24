import StarRating from "../StarRating/StarRating";
import ReviewForm from "../ReviewForm/ReviewForm";

const MovieReviewForm = ({
  movieRatings = {
    id: 1,
    reviews: [],
    ratings: [], // Stores individual ratings 1-5
    averageRating: 0, // Calculated average
  },
  addReview,
  addRating,
  movie,
}) => {
  // when we call addReview, pass movieRatings object into it along with the review information so we can add it to the array in App
  return (
    <div key={movieRatings.id} className="movie_card">
      <h2>{movie.Title}</h2>
      <div className="rating_container">
        <StarRating
          currentRating={movieRatings.averageRating}
          addRating={(rating) => addRating(movieRatings.id, rating)}
        />
        <span className="rating_count">
          ({movieRatings.ratings.length} ratings)
        </span>
      </div>
      <ReviewForm
        movieId={movieRatings.id}
        addRating={addRating}
        addReview={addReview}
      />
      <ul className="reviews_list">
        {movieRatings.reviews.map((review, index) => (
          <li key={index}>{review}</li>
        ))}
      </ul>
      <div className="reviews_count">
        {movieRatings.reviews.length}{" "}
        {movieRatings.reviews.length === 1 ? "review" : "reviews"}
      </div>
    </div>
  );
};

export default MovieReviewForm;
