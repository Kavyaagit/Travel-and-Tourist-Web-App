import React from "react";
import "./Homepage.css"; // Make sure the CSS file is correctly linked

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <img
          src="/images/beach.jpeg" // Image path from the public folder
          alt="Travel Hero"
          className="hero-image"
        />
        <div className="hero-text">
          <h1>Welcome to Travel and Tourist App</h1>
          <p>Explore the world with our travel packages!</p>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
