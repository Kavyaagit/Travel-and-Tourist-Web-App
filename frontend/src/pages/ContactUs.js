import React, { useState } from "react";
import "./ContactUs.css"; // Make sure this CSS file exists

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionMessage("");
    setSubmissionError("");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmissionMessage(
          data.message || "Your message has been sent successfully!"
        );
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setSubmissionError(
          data.error || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-us-page">
      <h2>Contact Us</h2>
      <p>
        We'd love to hear from you! Please fill out the form below or use the
        contact information provided.
      </p>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit" className="button" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>

      {submissionMessage && (
        <div className="success-message">{submissionMessage}</div>
      )}
      {submissionError && (
        <div className="error-message">{submissionError}</div>
      )}

      <div className="contact-info">
        <h3>Our Contact Information:</h3>
        <p>Address: 123 Travel Lane, Bengaluru, India</p>
        <p>Phone: +91 9876543210</p>
        <p>Email: kavibhagi@travelagency.com</p>
      </div>
    </div>
  );
}

export default ContactUs;
