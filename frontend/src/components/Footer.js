import React from "react";
import "./Footer.css"; // Create this CSS file

function Footer() {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Travel & Tourism. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
