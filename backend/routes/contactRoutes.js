import express from "express";
import Contact from "../models/contact.js";

const router = express.Router();

// POST route to handle contact form submissions
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message,
    });

    const savedContact = await newContact.save();
    console.log("New contact message saved:", savedContact);
    res
      .status(201)
      .json({ message: "Message received and saved successfully!" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res
      .status(500)
      .json({ error: "Failed to save message. Please try again." });
  }
});

export default router;
