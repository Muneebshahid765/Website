import React, { useState, useEffect } from 'react';
import "../style/Forgot.css";

const Forgot = ({ onClose, isOpen, setCode }) => {
    const [phone, setPhone] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onchange = (e) => {
        setPhone(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            // dispatch(forgotUser({ phone }));
        }, 1500);
    }

    useEffect(() => {
        if (isOpen) {
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
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="forgot-body" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <form className="subscription-form" onSubmit={handleSubmit} method="POST">
                    <h2 className="form-title">Password Reset</h2>

                    {!isSubmitted ? (
                        <div className="input-group">
                            <input
                                type="tel"
                                className="email-input"
                                name="phone"
                                value={phone}
                                placeholder="Enter your phone No : "
                                onChange={onchange}
                                required
                                disabled={isLoading}
                            />
                            <button type="submit" className="submit-btn" disabled={isLoading}>
                                {isLoading ? 'Sending...' : 'Send Reset Code'}
                            </button>
                        </div>
                    ) : (
                        <div className="success-message-container">
                            <p className="success-message">Success! If an account with that phone number exists, a password reset code has been sent.</p>
                            <button 
                                type="button" 
                                className="submit-btn" 
                                onClick={() => setCode(true)}
                                disabled={isLoading}
                            >
                                Enter Code
                            </button>
                        </div>
                    )}
                    
                    <p className="form-note">We'll send a password reset code to your registered phone number.</p>
                </form>
            </div>
        </div>
    )
}

export default Forgot;