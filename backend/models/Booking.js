import mongoose from "mongoose";

// Define the booking schema
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  destination: String,
  date: String,
});

// Create the Booking model
const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
