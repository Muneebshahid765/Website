import React, { useState, useEffect } from 'react';
import "../style/Sign.css"

const Sign = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    phone: '',
    role: ''
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
      setFormData({ name: '', password: '', phone: '', role: '' });
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
        newErrors.name = 'Name is required';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }
    }
    
    if (step === 2) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase, and number';
      }
    }
    
    if (step === 3) {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!formData.phone.match(/^\d{11}$/)) {
        newErrors.phone = 'Phone number must be exactly 11 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
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
    setIsLoading(true);
    setErrorMessage('');

    try {
      const userData = {
        name: formData.name.trim(),
        password: formData.password,
        phone: formData.phone,
        role: formData.role.trim() || null,
      };

      // Simulate API call - replace with your actual signup logic
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success/failure for demo
          if (Math.random() > 0.3) {
            resolve();
          } else {
            reject(new Error('Account creation failed. Please try again.'));
          }
        }, 2000);
      });

      // Success
      setIsLoading(false);
      setIsSuccess(true);
      
      // Auto close after success
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading && !isSuccess) {
      handleNext();
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
              <h2 className="modal-title">Join KuyaPlay</h2>
            </div>
            <p className="modal-subtitle">Create your account in 3 simple steps</p>
          </div>

          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
            <div className="progress-steps">
              {[1, 2, 3].map((step) => (
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
                <h3>Welcome to KuyaPlay!</h3>
                <p>Your account has been created successfully</p>
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
              <form onSubmit={(e) => e.preventDefault()}>
                {/* Step 1: Name */}
                {currentStep === 1 && (
                  <div className="form-step step-1">
                    <div className="step-header">
                      <h3>What's your name?</h3>
                      <p>Let's start with your full name</p>
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
                          placeholder="Enter your full name"
                          className={errors.name ? 'error' : ''}
                          disabled={isLoading}
                          autoFocus
                        />
                      </div>
                      {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>
                  </div>
                )}

                {/* Step 2: Password */}
                {currentStep === 2 && (
                  <div className="form-step step-2">
                    <div className="step-header">
                      <h3>Create a secure password</h3>
                      <p>Choose a strong password to protect your account</p>
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
                          placeholder="Create your password"
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
                      <div className="password-strength">
                        <div className="strength-indicators">
                          <div className={`strength-dot ${formData.password.length >= 8 ? 'active' : ''}`}></div>
                          <div className={`strength-dot ${/[A-Z]/.test(formData.password) ? 'active' : ''}`}></div>
                          <div className={`strength-dot ${/[a-z]/.test(formData.password) ? 'active' : ''}`}></div>
                          <div className={`strength-dot ${/\d/.test(formData.password) ? 'active' : ''}`}></div>
                        </div>
                        <span className="strength-text">Password strength</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact & Role */}
                {currentStep === 3 && (
                  <div className="form-step step-3">
                    <div className="step-header">
                      <h3>Final details</h3>
                      <p>Complete your profile information</p>
                    </div>
                    <div className="form-group">
                      <div className="input-container">
                        <div className="input-icon">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                          </svg>
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onKeyPress={handleKeyPress}
                          placeholder="11-digit phone number"
                          className={errors.phone ? 'error' : ''}
                          disabled={isLoading}
                          autoFocus
                        />
                      </div>
                      {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>
                    <div className="form-group">
                      <div className="input-container">
                        <div className="input-icon">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                            <path d="M20 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M1 21v-2a4 4 0 0 1 6-3.87"/>
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          onKeyPress={handleKeyPress}
                          placeholder="Role (optional)"
                          disabled={isLoading}
                        />
                      </div>
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
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNext}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="loading-spinner">
                        <div className="spinner"></div>
                        Creating Account...
                      </div>
                    ) : currentStep === 3 ? (
                      'Create Account'
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
              <p>Already have an account? 
                <button 
                  className="link-button" 
                  onClick={onSwitchToLogin}
                  disabled={isLoading}
                >
                  Sign In
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sign;