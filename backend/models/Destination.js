import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: String,
  comment: String,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const destinationSchema = new mongoose.Schema({
  name: String,
  description: String,
  details: String,
  price: Number,
  duration: String,
  country: String,
  image: String,
  reviews: [reviewSchema], // Array to store reviews
});

const Destination = mongoose.model("Destination", destinationSchema);
export default Destination;
