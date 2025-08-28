import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "./Navbar.css";

function Navbar() {
  const isAuthenticated = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/"); // Example: Navigate to the homepage when the logo is clicked
  };

  return (
    <nav className="navbar">
      <div
        className="navbar-brand"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
        Travel & Tourism
      </div>
      <ul className="navbar-nav">
        {/* ... rest of your navigation links */}
        {isAuthenticated ? (
          <li className="nav-item">
            <LogoutButton />
          </li>
        ) : (
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Log In
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
