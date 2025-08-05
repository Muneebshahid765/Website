import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import "../style/Header.css";

import Sign from "./Sign.jsx"
import LoginModal from './LoginModal.jsx';
import Forgot from './Forgot.jsx';
import Reset from './Reset.jsx';
import LoginTooltip from "./LoginTooltip"
import Logo from './Logo.jsx';
import TimeDisplay from './TimeDisplay.jsx';

const Header = () => {
  const location = useLocation();
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const authToken = localStorage.getItem('token');
  
  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  useEffect(() => {
    if (authToken ) {
      // dispatch(fetchUser());
    }
  }, [authToken]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Handle modal open/close and body scroll
  useEffect(() => {
    if (isModalOpen || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen, isMobileMenuOpen]);

  const currentUser = "";
  const isAuthenticated = !!(authToken && currentUser);

  const handleGoogleLogin = () => {
    // Implement your Google auth logic here
    console.log("Google login initiated");
    // Example:
    // window.location.href = '/auth/google';
    // or
    // dispatch(googleLogin());
  };

  const categories = {
    slots: {
      name: 'Slots',
      path: '/slots',
      items: [
        { name: 'Classic Slots', path: '/slots/classic' },
        { name: 'Video Slots', path: '/slots/video' },
        { name: 'Progressive Slots', path: '/slots/progressive' },
        { name: '3D Slots', path: '/slots/3d' },
        { name: 'Megaways', path: '/slots/megaways' }
      ]
    },
    liveCasino: {
      name: 'Live',
      path: '/live-casino',
      items: [
        { name: 'Live Blackjack', path: '/live-casino/blackjack' },
        { name: 'Live Roulette', path: '/live-casino/roulette' },
        { name: 'Live Baccarat', path: '/live-casino/baccarat' },
        { name: 'Live Poker', path: '/live-casino/poker' },
        { name: 'Game Shows', path: '/live-casino/game-shows' }
      ]
    },
    fishing: {
      name: 'Fishing',
      path: '/fishing',
      items: [
        { name: 'Ocean King', path: '/fishing/ocean-king' },
        { name: 'Fish Hunter', path: '/fishing/fish-hunter' },
        { name: 'Golden Toad', path: '/fishing/golden-toad' },
        { name: 'Fishing War', path: '/fishing/war' },
        { name: 'Fishing God', path: '/fishing/god' }
      ]
    },
    bingo: {
      name: 'Bingo',
      path: '/bingo',
      items: [
        { name: '90 Ball Bingo', path: '/bingo/90-ball' },
        { name: '75 Ball Bingo', path: '/bingo/75-ball' },
        { name: '80 Ball Bingo', path: '/bingo/80-ball' },
        { name: 'Speed Bingo', path: '/bingo/speed' },
        { name: 'Pattern Bingo', path: '/bingo/pattern' }
      ]
    },
    sports: {
      name: 'Sports',
      path: '/sports',
      items: [
        { name: 'Football', path: '/sports/football' },
        { name: 'Basketball', path: '/sports/basketball' },
        { name: 'Tennis', path: '/sports/tennis' },
        { name: 'Esports', path: '/sports/esports' },
        { name: 'Virtual Sports', path: '/sports/virtual' }
      ]
    },
    sabong: {
      name: 'Sabong',
      path: '/sabong',
      items: [
        { name: 'Live Sabong', path: '/sabong/live' },
        { name: 'Virtual Sabong', path: '/sabong/virtual' },
        { name: 'Sabong Tournaments', path: '/sabong/tournaments' },
        { name: 'Sabong Betting', path: '/sabong/betting' },
        { name: 'Sabong Results', path: '/sabong/results' }
      ]
    },
    promotions: {
      name: 'Promotions',
      path: '/promotions',
      items: [
        { name: 'Welcome Bonus', path: '/promotions/welcome' },
        { name: 'Free Spins', path: '/promotions/free-spins' },
        { name: 'Cashback', path: '/promotions/cashback' },
        { name: 'VIP Program', path: '/promotions/vip' },
        { name: 'Tournaments', path: '/promotions/tournaments' }
      ]
    }
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div id="header-container">
        <div className="timeDisplay">
          <TimeDisplay/> 
        </div> 
        <header className={`site-header ${scrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <div className="mobile-container navbar">
            <div className="header-left">
              <Link to="/" className="logo"><Logo/></Link>
              
              <div className="nav-categories">
                <Link 
                  to="/"
                  className={`category-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                  Home
                  <span className="link-underline"></span>
                </Link>

                {Object.entries(categories).map(([key, category]) => (
                  <div 
                    key={key}
                    className="category-item"
                    onMouseEnter={() => setHoveredCategory(key)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <Link 
                      to={category.path} 
                      className="category-link"
                    >
                      {category.name}
                      <span className="link-underline"></span>
                    </Link>
                    
                    {hoveredCategory === key && (
                      <div className="mega-menu">
                        <div className="mega-menu-content">
                          <div className="menu-section">
                            <h4 className="menu-title">{category.name}</h4>
                            <div className="menu-items">
                              {category.items.map((item, index) => (
                                <Link 
                                  key={index}
                                  to={item.path} 
                                  className="menu-item"
                                >
                                  {item.name}
                                  <span className="item-hover-effect"></span>
                                </Link>
                              ))}
                            </div>
                          </div>
                          {key === 'slots' && (
                            <div className="menu-highlight">
                              <div className="highlight-content">
                                <h4>Featured Game</h4>
                                <div className="game-preview">
                                  <img src="/game-preview.jpg" alt="Featured Game" />
                                  <div className="game-overlay">
                                    <span>Play Now</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Desktop Navigation Buttons */}
            <div className="nav-buttons">
              {isAuthenticated ? (
                <div className="profile-box">
                  {/* <button className="butn butn-primary" onClick={() => setIsSignModalOpen(true)}>
                    Deposit
                  </button> */}
       
                  <Link 
                    to="/" 
                    className="profile-link"
                    onClick={handleProfileClick}
                  >
                    <div className="profile-image-wrapper">
                      <img 
                        src={currentUser?.image || '/default-profile.png'} 
                        alt={currentUser?.name || 'Profile'} 
                        className="profile-image"
                      />
                      <div className="profile-hover-effect"></div>
                    </div>
                    <span className="profile-name">{currentUser?.name}</span>
                    <span className="profile-balance">₱{currentUser?.balance?.toLocaleString() || '0.00'}</span>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="all-auth-option">
                    <div className="outer-input mobile-input">
                      <div className="outer-password">
                        <input type="password" name="password" id="password" placeholder="Password"/>
                      </div>
                      <div className="outer-name">
                        <input type="text" name="name" id="password" placeholder="Username"/>
                      </div>
                    </div>     
                    <div className="login-button-wrapper" 
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}>
                      <button 
                        className="butn butn-outline" 
                        // onClick={() => setIsLoginModalOpen(true)}
                      >
                        Login
                      </button>
                      {isHovered && <LoginTooltip onGoogleLogin={handleGoogleLogin} />}
                    </div>
                    <button className="butn butn-primary" onClick={() => setIsSignModalOpen(true)}>
                      Register
                    </button>
                  </div> 
                </>
              )}
           
              {/* Mobile Menu Toggle */}
              <button 
                className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
          
          {/* Mobile Auth Section - Hidden on mobile */}
          {isMobile && !isAuthenticated && (
            <div className="mobile-auth-section">
              <div className="mobile-input">
                <input type="text" placeholder="Username"/>
                <input type="password" placeholder="Password"/>
              </div>
              <div className="mobile-auth-buttons">
                <button className="butn butn-outline" onClick={() => setIsLoginModalOpen(true)}>
                  Login
                </button>
                <button className="butn butn-primary" onClick={() => setIsSignModalOpen(true)}>
                  Register
                </button>
              </div>
            </div>
          )}
          
          {/* Mobile Menu */}
          <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="mobile-menu-content">
              <div className="mobile-menu-header">
                {isAuthenticated ? (
                  <div className="mobile-profile" onClick={handleProfileClick}>
                    <div className="mobile-profile-image">
                      <img 
                        src={currentUser?.image || '/default-profile.png'} 
                        alt={currentUser?.name || 'Profile'} 
                      />
                    </div>
                    <div className="mobile-profile-info">
                      <h4>{currentUser?.name}</h4>
                      <p>₱{currentUser?.balance?.toLocaleString() || '0.00'}</p>
                    </div>
                  </div>
                ) : (
                  !isMobile && (
                    <div className="mobile-auth-buttons">
                      <button className="butn butn-outline" onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsLoginModalOpen(true);
                      }}>
                        Login
                      </button>
                      <button className="butn butn-primary" onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsSignModalOpen(true);
                      }}>
                        Register
                      </button>
                    </div>
                  )
                )}
              </div>
              
              <div className="mobile-categories">
                <div className="mobile-category">
                  <Link 
                    to="/"
                    className="mobile-category-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  
                  {Object.entries(categories).map(([key, category]) => (
                    <Link 
                      key={key}
                      to={category.path}
                      className="mobile-category-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                  
                  {isAuthenticated && (
                    <Link 
                      to="/"
                      className="mobile-category-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Deposit
                    </Link>
                  )}
                </div>
              </div>
              
              <div className="mobile-footer">
                <Link to="/help" onClick={() => setIsMobileMenuOpen(false)}>Help Center</Link>
                <Link to="/terms" onClick={() => setIsMobileMenuOpen(false)}>Terms & Conditions</Link>
                <Link to="/privacy" onClick={() => setIsMobileMenuOpen(false)}>Privacy Policy</Link>
              </div>
            </div>
          </div>
        </header>
      </div> 
      
      {/* Personal Information Modal */}
      {isModalOpen && (
        <PersonalInformation
          isOpen={isModalOpen} 
          onClose={closeModal} 
          currentUser={currentUser}
        />
      )}
        
      <Sign
        isOpen={isSignModalOpen}
        onClose={() => setIsSignModalOpen(false)}
        onSwitchToLogin={() => {
          setIsSignModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToSignUp={() => {
          setIsLoginModalOpen(false);
          setIsSignModalOpen(true);
        }}  
        isForgot={() => {
          setIsLoginModalOpen(false);
          setIsForgotModalOpen(true);
        }}  
      />
      <Forgot
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)} 
        setCode={() => {
          setIsForgotModalOpen(false);
          setIsResetModalOpen(true);
        }} 
      />
      <Reset
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)} 
      />   
    </>
  );
};

export default Header;