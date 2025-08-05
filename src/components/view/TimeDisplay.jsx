import React, { useState, useEffect } from 'react';

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `GMT+5 ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div style={styles.headerContainer}>
      <div style={styles.leftSection}>
        <div style={styles.flagContainer}>
          <div style={styles.flag}>
            <div style={styles.flagRed}></div>
            <div style={styles.flagWhite}></div>
            <div style={styles.flagRed}></div>
          </div>
          <span style={styles.languageText}>English</span>
          <span style={styles.dropdownArrow}>▼</span>
        </div>
      </div>
      
      <div style={styles.centerSection}>
        <span style={styles.timeText}>{formatTime(currentTime)}</span>
      </div>
      
      <div style={styles.rightSection}>
        <button style={styles.licenseButton}>Show License</button>
      </div>
    </div>
  );
};

const styles = {
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2c4a6b',
    padding: '8px 16px',
    color: 'white',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif',
    height: '40px',
    boxSizing: 'border-box'
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center'
  },
  flagContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  flag: {
    display: 'flex',
    flexDirection: 'column',
    width: '20px',
    height: '14px',
    marginRight: '8px',
    border: '1px solid #ccc'
  },
  flagRed: {
    backgroundColor: '#ff0000',
    flex: 1
  },
  flagWhite: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  languageText: {
    marginRight: '4px',
    color: 'white'
  },
  dropdownArrow: {
    fontSize: '10px',
    color: 'white'
  },
  centerSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  timeText: {
    color: 'white',
    fontWeight: 'normal',
    animation: 'pulse 2s infinite'
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center'
  },
  licenseButton: {
    backgroundColor: '#4a6b8a',
    color: 'white',
    border: '1px solid #5a7ba0',
    borderRadius: '4px',
    padding: '6px 12px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  }
};

// Add CSS animation for the time
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
  }
`;
document.head.appendChild(styleSheet);

export default TimeDisplay;