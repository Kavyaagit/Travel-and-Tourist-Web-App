import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  bookingId: String,
  destination: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review; // Changed export
