import React from 'react';
import { Flame } from 'lucide-react';
import "../style/GamePage.css"

const GameCard = ({ game, onClick }) => (
  <div 
    className="game-card"
    onClick={() => onClick(game)}
  >
    <div className="game-card-content">
      {game.isHot && (
        <div className="hot-badge">
          <Flame size={12} />
          HOT
        </div>
      )}
      
      <div className="game-image">{game.image}</div>
      
      <div className="game-info">
        <h3 className="game-name">{game.name}</h3>
        <p className="game-category">{game.category}</p>
      </div>
      
      <div className="game-overlay" />
    </div>
  </div>
);

export default GameCard;