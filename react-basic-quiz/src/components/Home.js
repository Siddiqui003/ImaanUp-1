// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Navbar/>
            <h1>Welcome to ImaanUp</h1>
            <p>Test your knowledge with our quiz!</p>
            <Link to="/quiz">
                <button style={{ padding: '10px 20px', fontSize: '1rem' }}>Start Quiz</button>
            </Link>
        </div>
    );
};

export default Home;
