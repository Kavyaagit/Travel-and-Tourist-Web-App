import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the token from local storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <button onClick={handleLogout} className="button-secondary">
      Log Out
    </button>
  );
}

export default LogoutButton;
