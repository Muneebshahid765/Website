import React from 'react';
import { Crown } from 'lucide-react';

const WinnerCard = ({ winner }) => {
  return (
    <div className="winner-card">
      <div className="winner-content">
        <div className="winner-info">
          <div className="winner-avatar">
            <Crown size={20} />
          </div>
          <div className="winner-details">
            <p className="winner-username">{winner.username}</p>
            <p className="winner-game">Just won in {winner.game}</p>
          </div>
        </div>
        <div className="winner-amount">
          <p className="amount">
            {winner.currency}{winner.amount.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WinnerCard;