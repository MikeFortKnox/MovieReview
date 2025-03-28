import React, { useState } from "react";
import "./StarRating.css";

const StarRating = ({ currentRating, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${
            star <= (hoverRating || currentRating) ? "filled" : ""
          }`}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => onRate(star)}
        >
          // insert star picture here //
        </span>
      ))}
      <span className="rating-text">
        {currentRating > 0 ? `${currentRating}/5` : "Rate this"}
      </span>
    </div>
  );
};

export default StarRating;
