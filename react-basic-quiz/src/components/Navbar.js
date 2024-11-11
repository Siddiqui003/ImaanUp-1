// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src="/logo.png" alt="ImaanUp Logo" className="logo-image" />
                <span className="app-name">ImaanUp</span>
            </div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/quiz">Quiz</Link>
            </div>
        </nav>
    );
};

export default Navbar;
