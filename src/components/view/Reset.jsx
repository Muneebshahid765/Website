import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { resetUser } from '../../state/redux/reset.js'; // Adjust import path as needed
import '../style/Reset.css';
const Reset = ({ onClose, isOpen }) => {

  const [formData, setFormData] = useState({
    code: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({
    code: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (!formData.code.trim()) {
      newErrors.code = 'Verification code is required';
      valid = false;
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'Password is required';
      valid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
      valid = false;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // dispatch(resetUser({
      //   code: formData.code,
      //   password: formData.newPassword
      // }));

    }
    
  };
    if(errors){
        onClose(true)
    }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="password-reset-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-content">
          <h2 className="modal-title">Reset Your Password</h2>
          <p className="modal-subtitle">Enter the verification code and your new password</p>
          
          <form onSubmit={handleSubmit} className="reset-form">
            <div className="form-input">
              <label htmlFor="code">Verification Code</label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Enter 6-digit code"
                className={errors.code ? 'input-error' : ''}
              />
              {errors.code && <span className="error-message">{errors.code}</span>}
            </div>
            
            <div className="form-input">
              <label htmlFor="newPassword">New Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className={errors.newPassword ? 'input-error' : ''}
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  )}
                </button>
              </div>
              {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
            </div>
            
            <div className="form-input">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className={errors.confirmPassword ? 'input-error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={errors}
            >
              {errors ? (
                <>
                  <span className="spinner"></span>
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
            
            {errors && <div className="form-error">{errors}</div>}
            {errors && (
              <div className="form-success">
                Password reset successfully! You can now login with your new password.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;