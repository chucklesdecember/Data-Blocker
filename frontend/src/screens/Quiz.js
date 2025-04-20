import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QUIZ_QUESTIONS = [
  {
    question: "Which visual theme do you prefer?",
    choices: [
      "Light mode",
      "Dark mode",
      "Auto",
      "No preference"
    ],
    correctIndex: null // No correct answer
  },
  { 
    question: "What most closely matches your understanding of how Data Blocker works?",
    choices: [
      "To block social media tracking",
      "To use as part of a research study",
      "To improve ad targeting",
      "To securely store user health data"
    ],
    correctIndex: 1
  },
  {
    question: "Which of the following best describes what Data Blocker might collect?",
    choices: [
      "Only name and email address",
      "Device info and browsing history",
      "Biometric and health data",
      "No personal data is collected"
    ],
    correctIndex: 2
  },
  {
    question: "What most closely matches your understanding of how your data might be shared?",
    choices: [
      "It isn't shared with anyone",
      "Only if I'm asked each time",
      "If I agreed to it when I accepted the Terms and Conditions",
      "Only in anonymous academic research"
    ],
    correctIndex: 2
  }
];

function Quiz({ token, onLogout }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const question = QUIZ_QUESTIONS[current];

  const handleSelect = async (choiceIdx) => {
    const newAnswers = [...answers, choiceIdx];
    setAnswers(newAnswers);
    if (current < QUIZ_QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      // Optional: send results to backend
      const results = QUIZ_QUESTIONS.map((q, i) => ({
        question: q.question,
        correct: q.correctIndex === null ? null : q.correctIndex === newAnswers[i],
        selected: q.choices[newAnswers[i]]
      }));
      await fetch('https://data-blocker.onrender.com/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ results }),
        credentials: 'include'
      });
      setTimeout(() => navigate('/padlock'), 1200);
    }
  };

  return (
    <div className="quiz-container">
      <h2>Help Us Personalize Your Experience</h2>
      <div className="quiz-question">{question.question}</div>
      <div className="quiz-choices">
        {question.choices.map((choice, idx) => (
          <button
            key={idx}
            className="quiz-choice"
            onClick={() => handleSelect(idx)}
          >
            {choice}
          </button>
        ))}
      </div>
      <div className="quiz-progress">
        Question {current + 1} of {QUIZ_QUESTIONS.length}
      </div>
      {/* <button onClick={onLogout} style={{ marginTop: 32 }}>Logout</button> */}
    </div>
  );
}

export default Quiz;
