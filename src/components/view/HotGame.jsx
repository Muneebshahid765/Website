import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';
import GameCard from './GameCard'; // You'll need to create this component
import '../style/GamePage.css';

const HotGame = () => {
  const [hotGames, setHotGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // API function specific to HotGame
  const getHotGames = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'Super Ace', image: '🎰', category: 'Slots', isHot: true },
          { id: 2, name: 'Super Ace Deluxe', image: '🎲', category: 'Slots', isHot: true },
          { id: 3, name: 'Bingo New Year Bonanza', image: '🎯', category: 'Bingo', isHot: true },
          { id: 4, name: 'Wild Bounty Showdown', image: '🤠', category: 'Adventure', isHot: true },
          { id: 5, name: 'Golden Empire', image: '👑', category: 'Slots', isHot: true },
          { id: 6, name: 'Fortune Game X', image: '💎', category: 'Premium', isHot: true }
        ]);
      }, 500);
    });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const gamesData = await getHotGames();
        setHotGames(gamesData);
      } catch (error) {
        console.error('Error loading hot games:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleGameClick = (game) => {
    console.log('Game clicked:', game);
    // Handle game launch
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading hot games...</div>
      </div>
    );
  }

  return (
    <div className="hot-games-section">
      <div className="section-header">
        <div className="section-title">
          <Flame className="section-icon" size={28} />
          <h2>Hot Games</h2>
        </div>
        <button className="more-button">
          More →
        </button>
      </div>
      
      <div className="games-grid">
        {hotGames.map((game) => (
          <GameCard key={game.id} game={game} onClick={handleGameClick} />
        ))}
      </div>
    </div>
  );
};

export default HotGame;