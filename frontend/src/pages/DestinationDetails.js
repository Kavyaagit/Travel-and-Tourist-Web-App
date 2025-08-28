import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DestinationDetails = () => {
  const { id } = useParams(); // Gets the 'id' from the URL
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinationDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/destinations/${id}`
        );
        setDestination(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDestinationDetails();
  }, [id]);

  if (loading) {
    return <div>Loading destination details...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!destination) {
    return <div>Destination not found.</div>;
  }

  return (
    <div>
      <h2>Destination Details</h2>
      <h3>{destination.name}</h3>
      {destination.image && (
        <img
          src={`/uploads/${destination.image}`}
          alt={destination.name}
          style={{ maxWidth: "500px", maxHeight: "300px" }}
        />
      )}
      <p>
        <strong>Description:</strong> {destination.description}
      </p>
      <p>
        <strong>Details:</strong> {destination.details}
      </p>
      <p>
        <strong>Price:</strong> {destination.price}
      </p>
      <p>
        <strong>Duration:</strong> {destination.duration}
      </p>
      <p>
        <strong>Country:</strong> {destination.country}
      </p>
    </div>
  );
};

export default DestinationDetails;
