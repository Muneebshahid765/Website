import React, { useEffect, useState } from 'react';
import PaymentOption from './PaymentOption';
import GamesPage from './GamesPage';
import MobileFooter from './MobileFooter';
import "../style/HeroSection.css";

const HeroSection = () => {

  const heroImages = [
    "https://cdn.dribbble.com/userupload/18739264/file/original-bc35a7e55b3c9f4b4c759896e1e9e3e2.png?crop=0x0-3201x2401&format=webp&resize=400x300&vertical=center",
    "https://static.vecteezy.com/system/resources/previews/002/215/175/non_2x/casino-roulette-gamling-game-with-playing-cards-banner-free-vector.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCs_QBZXNiNw5XC0Bbtf4b6FGVUx-ntNxKMg&s",
    "https://images.prismic.io/soaringeagle/253ec5e4-29c3-4ea6-a92d-35ec16dfb477_SEAGLE_InnerImageMobile_838x525px_Casino_WelcomeOffer2024_Offer-1_V002.jpg?auto=compress,format&rect=0,0,838,525&w=838&h=525",
    "https://www.shutterstock.com/image-vector/online-casino-web-banner-jackpot-600nw-2393199157.jpg"
  ];

  const carouselImages = [heroImages[heroImages.length - 1], ...heroImages, heroImages[0]];


  const [currentIndex, setCurrentIndex] = useState(1);
  
  
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    const interval = setInterval(() => {
     
      setCurrentIndex(prevIndex => prevIndex + 1);
    }, 5000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  
  useEffect(() => {
    if (!transitionEnabled) {
      setTransitionEnabled(true);
    }
  }, [currentIndex, transitionEnabled]);


 
  const handleTransitionEnd = () => {
    
    if (currentIndex === carouselImages.length - 1) {
      setTransitionEnabled(false); 
      setCurrentIndex(1);         
    }

   
    if (currentIndex === 0) {
      setTransitionEnabled(false); 
      setCurrentIndex(heroImages.length);
    }
  };
  

  let activeIndicatorIndex = currentIndex - 1;
  if (currentIndex === 0) {
    activeIndicatorIndex = heroImages.length - 1;
  } else if (currentIndex === carouselImages.length - 1) {
    activeIndicatorIndex = 0;
  }

  return (
   <> 
    <main className={scrolled ? 'scrolled' : ''}>
      <section id="hero">
        <div 
            className="carousel-track" 
            style={{ 
                transform: `translateX(-${currentIndex * 100}%)`,
               
                transition: transitionEnabled ? 'transform 0.5s ease-in-out' : 'none'
            }}
            
            onTransitionEnd={handleTransitionEnd}
        >
      
          {carouselImages.map((img, index) => (
            <div
              key={index}
              className="carousel-slide"
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>

        <div className="hero-indicators right">
       
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === activeIndicatorIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index + 1)}
            />
          ))}
        </div>
      </section>

      
    </main>
      <GamesPage />
      <PaymentOption />
    <div className="Mobile-Footer">
      <MobileFooter/>
    </div>

</>
  );
};

export default HeroSection;