import React, { useState, useEffect } from "react";
import "./ReviewForm.css"; // Or './Review.css'

function ReviewForm({
  bookingId,
  onReviewSubmit,
  availableDestinations,
  bookedDestination,
}) {
  const [selectedDestination, setSelectedDestination] = useState(
    bookedDestination || ""
  );
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");

  useEffect(() => {
    if (bookedDestination) {
      setSelectedDestination(bookedDestination);
    }
  }, [bookedDestination]);

  const handleDestinationChange = (event) => {
    setSelectedDestination(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!selectedDestination) {
      setError("Please select a destination.");
      return;
    }

    const reviewData = {
      bookingId: bookingId,
      destination: selectedDestination,
      rating: rating,
      comment: "", // Removed comment, sending an empty string
    };

    console.log("Review Data being sent:", reviewData); // For debugging

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        console.log("Review submitted successfully!");
        if (onReviewSubmit) {
          onReviewSubmit();
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Failed to submit review. Please try again.");
    }
  };

  console.log(
    "availableDestinations in ReviewForm render:",
    availableDestinations
  ); // For debugging

  return (
    <div className="review-form-container">
      <h2>Rate Your Experience</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="destination">Destination:</label>
          <select
            id="destination"
            value={selectedDestination}
            onChange={handleDestinationChange}
            required
          >
            <option value="">Select a destination</option>
            {availableDestinations &&
              availableDestinations.map((dest) => (
                <option key={dest} value={dest}>
                  {dest}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select id="rating" value={rating} onChange={handleRatingChange}>
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>
        {/* Removed the comment section */}
        <button type="submit" className="button">
          Submit Rating
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
