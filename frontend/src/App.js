import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import AddDestination from "./components/AddDestination";
import Booking from "./pages/Booking";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
import ReviewForm from "./components/ReviewForm"; // Import ReviewForm
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destination/:id" element={<DestinationDetails />} />
          <Route path="/booking" element={<Booking />} />
          <Route
            path="/booking/:bookingId/review"
            element={<ReviewForm />}
          />{" "}
          {/* New route for ReviewForm */}
          <Route path="/add-destination" element={<AddDestination />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
