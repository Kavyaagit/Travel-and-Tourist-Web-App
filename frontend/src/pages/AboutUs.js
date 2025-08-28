import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-us-page">
      <div className="about-us-header">
        <h1>Welcome to Your Dream Getaway</h1>
        <p>Discover the world with us – your trusted travel partner.</p>
        <img
          src="https://images.pexels.com/photos/734302/pexels-photo-734302.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Travel"
          className="about-us-header-img"
        />
      </div>

      <section className="our-vision">
        <h2>Our Vision</h2>
        <div className="vision-content">
          <img
            src="https://images.unsplash.com/photo-1510070009289-b5bc34383727?auto=format&fit=crop&w=800&q=80"
            alt="Vision"
            className="vision-img"
          />
          <p>
            We envision a world where travel brings people closer, supports
            local communities, and fosters cultural understanding. Our goal is
            to create experiences that inspire, educate, and leave lasting
            memories.
          </p>
        </div>
      </section>

      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
              alt="Expert Advice"
              className="feature-img"
            />
            <h3>Expert Advice</h3>
            <p>
              Our team of travel experts offers tailored recommendations based
              on your preferences and travel style.
            </p>
          </div>
          <div className="feature">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
              alt="Personalized Service"
              className="feature-img"
            />
            <h3>Personalized Service</h3>
            <p>
              We understand that every traveler is unique. From planning to
              booking, we offer a personalized touch at every step.
            </p>
          </div>
          <div className="feature">
            <img
              src="https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=800&q=80"
              alt="Sustainable Tourism"
              className="feature-img"
            />
            <h3>Sustainable Tourism</h3>
            <p>
              We prioritize eco-friendly travel experiences that support local
              communities and preserve the environment.
            </p>
          </div>
        </div>
      </section>

      <section className="our-commitment">
        <h2>Our Commitment to You</h2>
        <div className="commitment-content">
          <p>
            At Your Travel Agency, we are committed to crafting unforgettable
            journeys. Whether you're seeking a relaxing retreat or an
            adventurous escape, we're here to ensure your experience is
            seamless, enjoyable, and stress-free.
          </p>
          <img
            src="https://images.unsplash.com/photo-1502920917128-1aa500764ce7?auto=format&fit=crop&w=800&q=80"
            alt="Our Commitment"
            className="commitment-img"
          />
        </div>
        <p>
          Let us take care of the details so you can focus on the adventure
          ahead!
        </p>
      </section>

      <div className="cta-section">
        <h2>Ready to Travel?</h2>
        <p>
          Let us help you plan your next adventure. Get in touch today and let's
          create the trip of a lifetime!
        </p>
        <button className="cta-button">Contact Us</button>
      </div>
    </div>
  );
}

export default AboutUs;
