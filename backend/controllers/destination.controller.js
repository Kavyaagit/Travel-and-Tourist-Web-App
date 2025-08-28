const Destination = require("../models/destination.model");

// Get all destinations
exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations); // Ensure you are sending JSON here
  } catch (error) {
    res.status(500).json({ message: error.message }); // And here
  }
};
// Get a specific destination by ID
exports.getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new destination
exports.addDestination = async (req, res) => {
  console.log("req.body in addDestination:", req.body); // ADD THIS LINE

  const { name, image, description, details, price, duration, country } =
    req.body;

  const newDestination = new Destination({
    name,
    image,
    description,
    details,
    price,
    duration,
    country, // Explicitly include country
  });

  try {
    const savedDestination = await newDestination.save();
    res.status(201).json(savedDestination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing destination
exports.updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    const { name, image, description, details, price, duration } = req.body;
    if (name) destination.name = name;
    if (image) destination.image = image;
    if (description) destination.description = description;
    if (details) destination.details = details;
    if (price) destination.price = price;
    if (duration) destination.duration = duration;

    const updatedDestination = await destination.save();
    res.json(updatedDestination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a destination
exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.json({ message: "Destination deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
