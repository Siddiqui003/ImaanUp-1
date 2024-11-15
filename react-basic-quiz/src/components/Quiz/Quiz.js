// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import './Quiz.css';
import Navbar from '../Navbar';

const questions = [
  {
    questionText: 'What is your name?',
    options: [
      { answerText: 'John', score: 5 },
      { answerText: 'Jane', score: 10 },
      { answerText: 'Mike', score: 15 },
      { answerText: 'Sarah', score: 20 },
    ],
  },
  {
    questionText: 'What is your age?',
    options: [
      { answerText: '18-25', score: 5 },
      { answerText: '26-35', score: 10 },
      { answerText: '36-45', score: 15 },
      { answerText: '46+', score: 20 },
    ],
  },
  // Add more questions here
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shouldSlide, setShouldSlide] = useState(false);

  // Transitions for sliding animation
  const transitions = useTransition(currentQuestion, {
    from: { transform: 'translateX(100%)', opacity: 0 },
    enter: { transform: 'translateX(0%)', opacity: 1 },
    leave: { transform: 'translateX(-100%)', opacity: 0 },
    reset: true,
    immediate: !shouldSlide,
  });

  const handleOptionClick = (scoreValue) => {
    setSelectedOption(scoreValue);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      setScore(score + selectedOption);
      setShouldSlide(true);
      setSelectedOption(null);
    }
  };

  const handleSubmit = () => {
    setScore(score + selectedOption);
    setIsCompleted(true);
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setIsCompleted(false);
    setShouldSlide(false);
  };

  useEffect(() => {
    if (shouldSlide) {
      setCurrentQuestion((prev) => (prev + 1) % questions.length);
      const timer = setTimeout(() => {
        setShouldSlide(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [shouldSlide]);

  return (
    <div>
    <Navbar/> 
    <div className="quiz">
      <h1 className="quiz-heading">ImaanUp Knowledge Quiz</h1>

      {isCompleted ? (
        <div className="score-section">
          <p>You scored: {score} points</p>
          <button onClick={handleRetakeQuiz} className="retake-button">
            Retake Quiz
          </button>
        </div>
      ) : (
        <div className="question-container">
          {transitions((style, item) => (
            <animated.div style={style} className="question-card">
              <div className="question-section">
                <h2 className="question-text">
                  Question {currentQuestion + 1}: {questions[item].questionText}
                </h2>
              </div>
              <div className="answer-section">
                {questions[item].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option.score)}
                    className={`option-button ${selectedOption === option.score ? 'selected' : ''}`}
                  >
                    <span className="option-label">{String.fromCharCode(65 + index)}.</span> 
                    {option.answerText}
                  </button>
                ))}
              </div>
              {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedOption === null}
                  className="next-button"
                >
                  Go to Next Question
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  className="submit-button"
                >
                  Submit
                </button>
              )}
            </animated.div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default Quiz;
