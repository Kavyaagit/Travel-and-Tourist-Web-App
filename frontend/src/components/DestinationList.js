import React, { useEffect, useState } from "react";
import axios from "axios";

const DestinationList = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/destinations");
        setDestinations(res.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div>
      <h2>All Destinations</h2>
      {destinations.map((dest) => (
        <div
          key={dest._id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <h3>{dest.name}</h3>
          <p>
            <strong>Country:</strong> {dest.country}
          </p>
          <p>
            <strong>Description:</strong> {dest.description}
          </p>
          <p>
            <strong>Details:</strong> {dest.details}
          </p>
          <p>
            <strong>Price:</strong> ₹{dest.price}
          </p>
          <p>
            <strong>Duration:</strong> {dest.duration} days
          </p>
          {dest.image && (
            <img
              src={`http://localhost:5000/${dest.image}`}
              alt={dest.name}
              style={{ width: "200px", height: "auto", objectFit: "cover" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default DestinationList;
