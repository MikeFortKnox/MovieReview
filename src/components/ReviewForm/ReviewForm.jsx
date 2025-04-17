import React, { useState } from "react";

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
    <form className="reviewForm" onSubmit={handleSubmit}>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review here..."
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
