// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <Navbar />
            <div className="home-content">
                <h1>Welcome to ImaanUp</h1>
                <p>Test your knowledge with our quiz!</p>
                <Link to="/quiz">
                    <button className="start-quiz-button">Start Quiz</button>
                </Link>
            </div>
            <div className="home-content">
                <p>Listen Quran from authentic Qaaris</p>
                <Link to="/quran-youtube">
                    <button className="start-quiz-button">Listen Quran</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
