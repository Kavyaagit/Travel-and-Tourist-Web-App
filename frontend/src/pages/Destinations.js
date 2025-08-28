import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddDestination from "../components/AddDestination";
import "./Destinations.css";
import axios from "axios";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDestinations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/destinations"
      );
      setDestinations(response.data);
      setLoading(false);
      localStorage.setItem("destinations", JSON.stringify(response.data));
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleAddDestination = async () => {
    await fetchDestinations();
  };

  const handleBookNow = (destinationName) => {
    alert(
      `Booking for ${destinationName}! Please proceed to the Booking page to complete your reservation and leave a review.`
    );
  };

  if (loading) return <div>Loading destinations...</div>;
  if (error) return <div>Error loading destinations: {error}</div>;

  return (
    <div className="destinations">
      <h2>Popular Destinations</h2>
      <div className="destination-list">
        {destinations.map((destination) => (
          <div key={destination._id} className="destination-card">
            <img
              src={`http://localhost:5000/uploads/${destination.image}`}
              alt={destination.name}
              className="destination-image"
            />
            <h3>{destination.name}</h3>
            <p>{destination.description}</p>
            <button onClick={() => handleBookNow(destination.name)}>
              Book Now
            </button>
            <Link to={`/destination/${destination._id}`}>View Details</Link>

            {/* ⭐ Ratings Display */}
            <div className="reviews">
              <h4>Reviews:</h4>
              {destination.reviews && destination.reviews.length > 0 ? (
                <>
                  <p>
                    ⭐ Average Rating:{" "}
                    {(
                      destination.reviews.reduce(
                        (sum, r) => sum + r.rating,
                        0
                      ) / destination.reviews.length
                    ).toFixed(1)}{" "}
                    / 5
                  </p>
                  {destination.reviews.slice(0, 2).map((rev, index) => (
                    <div key={index} className="review">
                      <strong>{rev.user}</strong>: {rev.comment} ({rev.rating}
                      /5)
                    </div>
                  ))}
                  {destination.reviews.length > 2 && <p>...and more reviews</p>}
                </>
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="add-destination-section">
        <h2>Add New Destination</h2>
        <AddDestination onDestinationAdded={handleAddDestination} />
      </div>
    </div>
  );
};

export default Destinations;
