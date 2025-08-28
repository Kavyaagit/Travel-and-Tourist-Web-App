import React, { useState } from "react";
import axios from "axios";
// import "./Booking.css"; // Removed incorrect import

const AddDestination = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    description: "",
    details: "",
    price: "",
    duration: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const destinationData = new FormData();
    destinationData.append("name", formData.name);
    destinationData.append("description", formData.description);
    destinationData.append("details", formData.details);
    destinationData.append("price", formData.price);
    destinationData.append("duration", formData.duration);
    destinationData.append("country", formData.country);
    if (formData.image) {
      destinationData.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/destinations", // Backend endpoint
        destinationData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Destination added successfully!");
      console.log(response.data);
      setFormData({
        name: "",
        image: null,
        description: "",
        details: "",
        price: "",
        duration: "",
        country: "",
      });
    } catch (error) {
      console.error("Error adding destination:", error);
      alert("Error adding destination");
    }
  };

  return (
    <div className="booking-page">
      {/* Using a more specific class, or you can create a new CSS file */}
      <h2>Add a New Destination</h2>
      <form className="add-destination-form" onSubmit={handleSubmit}>
        {/* Corrected className */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="details">Details:</label>
          <textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="duration">Duration:</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        <button type="submit">Add Destination</button>
      </form>
    </div>
  );
};

export default AddDestination;
