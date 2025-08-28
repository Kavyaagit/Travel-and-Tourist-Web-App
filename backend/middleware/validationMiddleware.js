const validateDestination = (req, res, next) => {
  const { name, description, details, price, duration, country } = req.body;

  if (!name || !description || !details || !price || !duration || !country) {
    return res.status(400).json({ message: "All fields are required." });
  }

  next();
};

module.exports = validateDestination;
