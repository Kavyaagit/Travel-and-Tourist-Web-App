import express from "express";
import Booking from "../models/Booking.js"; // Assuming the path to your Booking model

const router = express.Router();

// POST: Create a new booking
router.post("/", async (req, res) => {
  try {
    const { name, email, destination, date } = req.body;

    // Validate that all fields are provided
    if (!name || !email || !destination || !date) {
      return res
        .status(400)
        .json({ error: "Name, email, destination, and date are required." });
    }

    // Create a new booking instance
    const newBooking = new Booking({
      name,
      email,
      destination,
      date,
    });

    // Save the new booking to the database
    const savedBooking = await newBooking.save();

    res.status(201).json({
      message: "Booking created successfully!",
      booking: savedBooking, // Optionally send back the created booking data
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Error creating booking." });
  }
});

export default router;
