// components/GoogleLoginCard.jsx
import React from 'react';
import "../style/LoginTooltip.css"

const LoginTooltip = ({ onGoogleLogin }) => {
  return (
    <div 
      className="google-login-card"
      onClick={(e) => e.stopPropagation()} // Prevent event bubbling
    >
      <div className="card-header">
        <h4>Continue with Google</h4>
      </div>
      <div className="card-body">
        <button 
          className="google-login-button"
          onClick={onGoogleLogin}
        >
          <img 
            src="/google-icon.png" 
            alt="Google logo" 
            className="google-icon"
          />
          Connect with Google
        </button>
      </div>
    </div>
  );
};

export default LoginTooltip;