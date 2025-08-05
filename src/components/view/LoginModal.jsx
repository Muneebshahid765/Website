import React, { useState, useEffect } from 'react';
import "../style/Sign.css"
import { Link } from 'react-router-dom'

const LoginModal = ({ isOpen, onClose, onSwitchToSignUp, isForgot }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle modal open/close and body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
      // Reset form when closing
      setFormData({ name: '', password: '' });
      setErrors({});
      setCurrentStep(1);
      setIsLoading(false);
      setIsSuccess(false);
      setErrorMessage('');
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    // Clear general error message
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Username or email is required';
      } else if (formData.name.trim().length < 3) {
        newErrors.name = 'Username or email must be at least 3 characters';
      }
    }
    
    if (step === 2) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 2) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Validate all steps before submitting
    if (!validateStep(1) || !validateStep(2)) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const userData = {
        name: formData.name.trim(),
        password: formData.password,
      };

      // Simulate API call - replace with your actual login logic
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success/failure for demo
          if (Math.random() > 0.3) {
            resolve();
          } else {
            reject(new Error('Invalid username or password. Please try again.'));
          }
        }, 1500);
      });

      // Success
      setIsLoading(false);
      setIsSuccess(true);
      
      // Auto close and redirect after success
      setTimeout(() => {
        onClose();
        // Add your redirect logic here if needed
        // Example: navigate('/dashboard');
      }, 1000);

    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message || 'Login failed. Please try again.');
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading && !isSuccess) {
      handleNext();
    }
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isLoading && !isSuccess) {
      handleNext();
    }
  };

  const handleForgotPassword = () => {
    if (isForgot && typeof isForgot === 'function') {
      isForgot();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="signin-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="signin-modal">
          {/* Close Button */}
          <button className="modal-close-btn" onClick={onClose} disabled={isLoading}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Background Animation */}
          <div className="bg-animation">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
            <div className="floating-shape shape-4"></div>
          </div>

          {/* Header */}
          <div className="modal-header">
            <div className="logo-container">
              <div className="logo-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="18" fill="url(#gradient1)"/>
                  <path d="M15 20l5 5 10-10" stroke="white" strokeWidth="2" fill="none"/>
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#667eea"/>
                      <stop offset="100%" stopColor="#764ba2"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h2 className="modal-title">Welcome to KuyaPlay</h2>
            </div>
            <p className="modal-subtitle">Login to your account in 2 simple steps</p>
          </div>

          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentStep / 2) * 100}%` }}
              ></div>
            </div>
            <div className="progress-steps">
              {[1, 2].map((step) => (
                <div 
                  key={step}
                  className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
                >
                  {currentStep > step ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.5 4.5L6 12l-3.5-3.5" stroke="white" strokeWidth="2"/>
                    </svg>
                  ) : (
                    step
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Success State */}
          {isSuccess && (
            <div className="success-container">
              <div className="success-animation">
                <div className="success-icon">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="35" fill="url(#successGradient)" className="success-circle"/>
                    <path d="M25 40l10 10 20-20" stroke="white" strokeWidth="3" fill="none" className="success-check"/>
                    <defs>
                      <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4ade80"/>
                        <stop offset="100%" stopColor="#22c55e"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3>Welcome back!</h3>
                <p>Login successful. Redirecting...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Form Steps */}
          {!isSuccess && (
            <div className="form-container">
              <form onSubmit={handleFormSubmit}>
                {/* Step 1: Name */}
                {currentStep === 1 && (
                  <div className="form-step step-1">
                    <div className="step-header">
                      <h3>What's your name?</h3>
                      <p>Enter your username or email</p>
                    </div>
                    <div className="form-group">
                      <div className="input-container">
                        <div className="input-icon">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onKeyPress={handleKeyPress}
                          placeholder="Enter your username or email"
                          className={errors.name ? 'error' : ''}
                          disabled={isLoading}
                          autoFocus
                        />
                      </div>
                      <div className='forgot' onClick={handleForgotPassword}>Forgot Password</div>
                      {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>
                  </div>
                )}

                {/* Step 2: Password */}
                {currentStep === 2 && (
                  <div className="form-step step-2">
                    <div className="step-header">
                      <h3>Enter your password</h3>
                      <p>Please enter your account password</p>
                    </div>
                    <div className="form-group">
                      <div className="input-container">
                        <div className="input-icon">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <circle cx="12" cy="7" r="4"/>
                          </svg>
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          onKeyPress={handleKeyPress}
                          placeholder="Enter your password"
                          className={errors.password ? 'error' : ''}
                          disabled={isLoading}
                          autoFocus
                        />
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94L17.94 17.94z"/>
                              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19l-6.65-6.65z"/>
                              <line x1="1" y1="1" x2="23" y2="23"/>
                            </svg>
                          ) : (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                          )}
                        </button>
                      </div>
                      {errors.password && <span className="error-text">{errors.password}</span>}
                      <div className='forgot' onClick={handleForgotPassword}>Forgot Password</div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="form-navigation">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleBack}
                      disabled={isLoading}
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="loading-spinner">
                        <div className="spinner"></div>
                        Logging in...
                      </div>
                    ) : currentStep === 2 ? (
                      'Log in'
                    ) : (
                      'Next'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Footer */}
          {!isSuccess && (
            <div className="modal-footer">
              <p>Don't have an account? 
                <button 
                  className="link-button" 
                  onClick={onSwitchToSignUp}
                  disabled={isLoading}
                >
                  Sign Up
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;