import express from "express";
import Destination from "../models/Destination.js";
import Review from "../models/Review.js"; // Import the Review model
import multer from "multer";
import path from "path";

const router = express.Router();

// Set up multer for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ------------------------- GET all destinations with reviews ------------------------- */
router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find().lean(); // Use .lean() for faster performance if you're not modifying the docs
    const destinationsWithReviews = await Promise.all(
      destinations.map(async (dest) => {
        const reviews = await Review.find({ destination: dest.name }).lean();
        return { ...dest, reviews };
      })
    );
    res.status(200).json(destinationsWithReviews);
  } catch (error) {
    console.error("Error fetching destinations with reviews:", error);
    res.status(500).json({ error: "Error loading destinations with reviews" });
  }
});

/* ------------------ GET a single destination by ID ------------------ */
router.get("/:id", async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (destination) {
      res.status(200).json(destination);
    } else {
      res.status(404).json({ message: "Destination not found" });
    }
  } catch (error) {
    console.error("Error fetching destination by ID:", error);
    res.status(500).json({ error: "Error loading destination" });
  }
});

/* ------------------------ POST a new destination ------------------------ */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description, details, price, duration, country } = req.body;
    const image = req.file ? req.file.filename : null;

    if (
      !name ||
      !description ||
      !details ||
      !price ||
      !duration ||
      !country ||
      !image
    ) {
      return res
        .status(400)
        .json({ error: "All fields are required including image." });
    }

    const newDestination = new Destination({
      name,
      description,
      details,
      price,
      duration,
      country,
      image,
    });

    await newDestination.save();
    res.status(201).json(newDestination);
  } catch (error) {
    console.error("Error adding destination:", error);
    res.status(500).json({ error: "Error adding destination" });
  }
});

/* ------------------------ ✅ POST a review (associated by destination name) ------------------------ */
router.post("/:destinationName/review", async (req, res) => {
  const { bookingId, rating, comment } = req.body;
  const { destinationName } = req.params;

  if (!rating) {
    return res.status(400).json({ error: "Rating is required." });
  }

  try {
    // No need to find the destination here, as the Review model will reference it directly
    const newReview = new Review({
      bookingId: bookingId,
      destination: destinationName,
      rating: Number(rating),
      comment: comment || "", // Allow empty comments
    });

    await newReview.save();
    res.status(201).json({ message: "Review added successfully." });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Error adding review." });
  }
});

export default router;
