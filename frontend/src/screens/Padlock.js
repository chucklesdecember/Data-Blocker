import React, { useState } from 'react';

function Padlock({ token, onLogout }) {
  const [locked, setLocked] = useState(false);

  const handlePadlock = () => setLocked(l => !l);

  return (
<div className={`final-container ${locked ? "locked" : "unlocked"}`}>
<button
        onClick={handlePadlock}
        className="final-lock-btn"
        aria-label={locked ? 'Unlock' : 'Lock'}
      >
        <svg width="160" height="160" viewBox="0 0 100 100">
          <rect x="20" y="45" width="60" height="40" rx="12"
            fill="none"
            stroke={locked ? "#22C55E" : "#F44"}
            strokeWidth="8"
          />
          <path
            d={locked
              ? "M30 45 v-12 a20 20 0 0 1 40 0 v12"
              : "M-10 45 v-12 a20 20 0 0 1 40 0 v12"}
            fill="none"
            stroke={locked ? "#22C55E" : "#F44"}
            strokeWidth="8"
          />
        </svg>
      </button>
      <div className="final-title">
        Data Protection: {locked ? "On" : "Off"}
      </div>
      <div className="final-note">
        Note: This app is for research purposes only<br />
        and does not provide any actual data<br />
        protection functionality.
      </div>
      <button className="logout-button" onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Padlock;