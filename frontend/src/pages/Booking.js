import React, { useState } from "react";
import axios from "axios";
import ReviewForm from "../components/ReviewForm"; // Import the ReviewForm component
import "./Booking.css"; // Import the CSS file

const Booking = () => {
  // Booking Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [currentBookingId, setCurrentBookingId] = useState(null);
  const [bookingConfirmationMessage, setBookingConfirmationMessage] =
    useState("");
  const [bookingError, setBookingError] = useState("");

  // Available Destinations
  const destinations = ["Paris", "Tokyo", "New York", "Bali", "Rome"];

  // Submit Booking
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingConfirmationMessage(""); // Clear any previous success message
    setBookingError(""); // Clear any previous error message
    try {
      const response = await axios.post("http://localhost:5000/api/booking", {
        name,
        email,
        destination,
        date,
      });
      console.log("Booking successful:", response.data.message);
      console.log("Backend Response:", response.data); // Check the response
      setBookingConfirmationMessage(
        `Thank you for your booking, ${name}! Happy journey to ${response.data.destination}!`
      );
      alert("Booking successful!");
      setCurrentBookingId(response.data.bookingId); // Assuming your backend returns a bookingId
      // Clear form
      setName("");
      setEmail("");
      setDestination("");
      setDate("");
    } catch (err) {
      console.error("Booking error:", err);
      console.error("Full error object:", err);
      setBookingError("Booking failed. Please try again.");
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="booking-page">
      <h2>Book a Destination</h2>
      {bookingConfirmationMessage && (
        <div className="message-box success-message">
          {bookingConfirmationMessage}
        </div>
      )}
      {bookingError && (
        <div className="message-box error-message">{bookingError}</div>
      )}
      <div className="booking-section">
        <form className="booking-form" onSubmit={handleBookingSubmit}>
          {/* ... form elements ... */}
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="destination">Destination:</label>
            <select
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            >
              <option value="">Select a destination</option>
              {destinations.map((dest) => (
                <option key={dest} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit Booking</button>
        </form>
      </div>

      {/* Pass the destinations array to the ReviewForm */}
      <div className="review-section">
        <h3>Leave a Review</h3>
        <ReviewForm
          bookingId={currentBookingId}
          availableDestinations={destinations}
          bookedDestination={destination}
        />
      </div>
    </div>
  );
};

export default Booking;
