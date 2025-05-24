import React, { useState } from "react";
import "./ReviewForm.css";

const ReviewForm = ({ movieId, addReview }) => {
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.trim()) {
      addReview(movieId, review);
      setReview("");
    }
  };

  return (
    <div className="review-form-container">
      <form className="reviewForm" onSubmit={handleSubmit}>
        <textarea
          className="reviewForm__textarea"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
        />
        <button type="submit" className="reviewForm__submit-button">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
