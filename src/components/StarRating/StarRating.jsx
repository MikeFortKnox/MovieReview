import React, { useState } from "react";
import "./StarRating.css";

const StarRating = ({ currentRating, addRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="star__rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${
            star <= (hoverRating || currentRating) ? "filled" : ""
          }`}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => addRating(star)}
        >
          ★
        </span>
      ))}
      <span className="rating__text">
        {currentRating > 0 ? `${currentRating}/5` : "Rate this"}
      </span>
    </div>
  );
};

export default StarRating;
