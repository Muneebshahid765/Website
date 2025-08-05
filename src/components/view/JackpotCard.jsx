import React from 'react';

const JackpotCard = ({ game }) => {
  return (
    <div className="jackpot-card">
      <div className="jackpot-content">
        <div className="jackpot-image">{game.image}</div>
        <div className="jackpot-info">
          <h4 className="jackpot-name">{game.name}</h4>
          <p className="jackpot-amount">₱{game.jackpot.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default JackpotCard;