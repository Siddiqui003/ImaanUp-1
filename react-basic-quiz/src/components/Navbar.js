// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                <img src="/logo.png" alt="ImaanUp Logo" className="logo-image" />
                <span className="app-name">ImaanUp</span>
            </Link>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/quiz" className="nav-link">Quiz</Link>
            </div>
        </nav>
    );
};

export default Navbar;
