import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import './Quiz.css';

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
  const [shouldSlide, setShouldSlide] = useState(false);  // Control sliding

  // Transitions for sliding animation
  const transitions = useTransition(currentQuestion, {
    from: { transform: 'translateX(100%)', opacity: 0 },
    enter: { transform: 'translateX(0%)', opacity: 1 },
    leave: { transform: 'translateX(-100%)', opacity: 0 },
    reset: true,
    immediate: !shouldSlide,  // Disable transition until Next Question is clicked
  });

  const handleOptionClick = (scoreValue) => {
    setSelectedOption(scoreValue);  // Set selected option
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      setScore(score + selectedOption);  // Add score for the selected option
      setShouldSlide(true);  // Enable sliding animation
      setSelectedOption(null);  // Reset selected option
    }
  };

  const handleSubmit = () => {
    setScore(score + selectedOption);  // Add final score
    setIsCompleted(true);
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);  // Reset to first question
    setScore(0);  // Reset score
    setSelectedOption(null);  // Reset selected option
    setIsCompleted(false);  // Mark quiz as not completed
    setShouldSlide(false);  // Disable sliding effect for retake
  };


  useEffect(() => {
    if (shouldSlide) {
      // Immediately change question and then apply slide effect
      setCurrentQuestion((prev) => (prev + 1) % questions.length);
      const timer = setTimeout(() => {
        setShouldSlide(false);  // Disable sliding after transition
      }, 500); // Delay for content update, slide effect will follow right after

      return () => clearTimeout(timer);
    }
  }, [shouldSlide]);

  return (
    <div className="quiz">
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
            <animated.div style={style}>
              <div className="question-section">
                <h2>{questions[item].questionText}</h2>
              </div>
              <div className="answer-section">
                {questions[item].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option.score)}  // Only sets selected option
                    className={`option-button ${selectedOption === option.score ? 'selected' : ''}`}
                  >
                    {option.answerText}
                  </button>
                ))}
              </div>
              {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}  // Triggers slide on Next Question
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
  );
};

export default Quiz;
