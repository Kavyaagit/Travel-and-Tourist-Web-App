import express from "express";
const router = express.Router();
import Review from "../models/Review.js"; // Assuming your model file is named Review.js

// POST /api/reviews - Create a new review
router.post("/", async (req, res) => {
  try {
    const { bookingId, destination, rating, comment } = req.body;

    if (!destination || !rating) {
      return res
        .status(400)
        .json({ message: "Destination and rating are required." });
    }

    const newReview = new Review({
      bookingId,
      destination,
      rating,
      comment,
    });

    const savedReview = await newReview.save();
    console.log("Review saved:", savedReview);
    res
      .status(201)
      .json({ message: "Review submitted successfully!", review: savedReview });
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ message: "Failed to save review on the server." });
  }
});

// GET /api/reviews - Get all reviews (for potential admin use)
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews." });
  }
});

export default router; // This is the crucial part for ES Modules
