// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
            <img 
                src={ process.env.REACT_APP_MODE === 'local'? "ImaanUp/logo.png": "logo.png" }
                alt="ImaanUp Logo" 
                className="logo-image" 
            />
                <span className="app-name">ImaanUp</span>
            </Link>
        </nav>
    );
};

export default Navbar;
