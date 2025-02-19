// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-sections">
        <Link to="/" className="navbar-logo">
          <img
            src={
              process.env.REACT_APP_MODE === "local"
                ? "ImaanUp/logo.png"
                : "logo.png"
            }
            alt="ImaanUp Logo"
            className="logo-image"
          />
        </Link>
        <span className="app-name">ImaanUp</span>
        <Link to="/about" className="nav-links">
          About Us
        </Link>
        <Link to="/contact" className="nav-links">
          Contact Us
        </Link>
        <Link to="/contribute" className="nav-links">
          Contribute
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
