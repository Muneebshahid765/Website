import React, { useState, useEffect } from 'react';
import { Trophy, Crown, Zap, Star } from 'lucide-react';
import HotGame from './HotGame';
import WinnerCard from './WinnerCard';
import JackpotCard from './JackpotCard';
import '../style/GamePage.css';

const GamesPage = () => {
  const [jackpot, setJackpot] = useState(null);
  const [winners, setWinners] = useState([]);
  const [jackpotGames, setJackpotGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // API functions for GamesPage
  const getJackpot = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          amount: 19293260.77,
          currency: '₱',
          isActive: true
        });
      }, 300);
    });
  };

  const getWinners = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, username: '****g24', game: 'Sugar Bang Bang', amount: 11880, currency: '₱' },
          { id: 2, username: '****i19', game: 'Super Bingo', amount: 9710.5, currency: '₱' },
          { id: 3, username: '****h', game: 'Monopoly Live', amount: 8755, currency: '₱' },
          { id: 4, username: '****n01', game: 'Lightning Roulette', amount: 12450, currency: '₱' },
          { id: 5, username: '****k88', game: 'Crazy Time', amount: 15200, currency: '₱' },
          { id: 6, username: '****m12', game: 'Dream Catcher', amount: 7890, currency: '₱' }
        ]);
      }, 400);
    });
  };

  const getJackpotGames = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'Mega Fortune', jackpot: 5420000, image: '💰' },
          { id: 2, name: 'Divine Fortune', jackpot: 3200000, image: '⚡' },
          { id: 3, name: 'Hall of Gods', jackpot: 2800000, image: '🏛️' },
          { id: 4, name: 'Arabian Nights', jackpot: 1900000, image: '🧞' },
          { id: 5, name: 'Mega Moolah', jackpot: 4100000, image: '🦁' },
          { id: 6, name: 'Major Millions', jackpot: 1200000, image: '💎' }
        ]);
      }, 600);
    });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [jackpotData, winnersData, jackpotGamesData] = await Promise.all([
          getJackpot(),
          getWinners(),
          getJackpotGames()
        ]);

        setJackpot(jackpotData);
        setWinners(winnersData);
        setJackpotGames(jackpotGamesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Format currency for different screen sizes
  const formatCurrency = (amount, currency = '₱') => {
    if (isMobile && amount >= 1000000) {
      return `${currency} ${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000000) {
      return `${currency} ${(amount / 1000000).toFixed(2)}M`;
    } else if (amount >= 1000) {
      return `${currency} ${(amount / 1000).toFixed(1)}K`;
    }
    return `${currency} ${amount.toLocaleString()}`;
  };

  // Get responsive number of items to show
  const getResponsiveItems = (items, defaultCount) => {
    if (isMobile) {
      return items.slice(0, Math.min(4, defaultCount));
    }
    return items.slice(0, defaultCount);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading amazing games...</div>
      </div>
    );
  }

  return (
    <div className="casino-platform">
      <div className="game-container">
        {/* Breaking News Ticker */}
        <div className="breaking-news-ticker">
          <div className="ticker-content">
            🎉 Welcome to KuyaPlay.net - Your Ultimate Gaming Destination! Play and Earn Money 💰 Join thousands of winners today!
          </div>
        </div>  
        
        {/* Hot Games Section */}
        <HotGame />

        <div className="game-content">
          {/* Jackpot Section */}
          <div className="jackpot-section">
            <div className="jackpot-container">
              <div className="jackpot-header">
                <div className="jackpot-icon">
                  <Crown size={isMobile ? 32 : 40} />
                </div>
                <h3 className="jackpot-title">
                  {isMobile ? 'MEGA JACKPOT' : 'MEGA JACKPOT'}
                </h3>
                {jackpot && (
                  <div className="jackpot-main-amount">
                    {formatCurrency(jackpot.amount, jackpot.currency)}
                  </div>
                )}
              </div>
              
              <div className="jackpot-games">
                {getResponsiveItems(jackpotGames, 6).map((game) => (
                  <JackpotCard 
                    key={game.id} 
                    game={{
                      ...game,
                      formattedJackpot: formatCurrency(game.jackpot)
                    }} 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Winners Section */}
          <div className="winners-section">
            <div className="section-header">
              <div className="section-title">
                <Trophy className="section-icon" size={isMobile ? 24 : 28} />
                <h2>Recent Winners</h2>
              </div>
              <button className="more-button">
                {isMobile ? 'More →' : 'View All →'}
              </button>
            </div>
            
            <div className="winners-list">
              {getResponsiveItems(winners, 6).map((winner) => (
                <WinnerCard 
                  key={winner.id} 
                  winner={{
                    ...winner,
                    formattedAmount: formatCurrency(winner.amount, winner.currency)
                  }} 
                />
              ))}
            </div>

            {/* Live Stats */}
            <div className="stats-grid">
              <div className="stat-card stat-players">
                <Zap className="stat-icon" size={isMobile ? 20 : 24} />
                <div className="stat-value">2,847</div>
                <div className="stat-label">{isMobile ? 'Online' : 'Players Online'}</div>
              </div>
              <div className="stat-card stat-games">
                <Star className="stat-icon" size={isMobile ? 20 : 24} />
                <div className="stat-value">156</div>
                <div className="stat-label">{isMobile ? 'Games' : 'Games Available'}</div>
              </div>
              <div className="stat-card stat-winnings">
                <Trophy className="stat-icon" size={isMobile ? 20 : 24} />
                <div className="stat-value">₱2.4M</div>
                <div className="stat-label">{isMobile ? 'Won Today' : 'Won Today'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;