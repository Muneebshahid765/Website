import React from 'react';
import '../style/MobileFooter.css';

export default function MobileFooter() {
  return (
    <footer className="footer">
      <div className="footer-item">
        <img src="/icons/member.png" alt="Member" />
        <span>Member</span>
      </div>
      <div className="footer-item">
        <img src="/icons/promotion.png" alt="Promotion" />
        <span>Promotion</span>
      </div>
      <div className="footer-center">
        <img src="/icons/kuya-logo.png" alt="KuyaPlay" className="footer-logo" />
        <span className="footer-home">Home</span>
      </div>
      <div className="footer-item">
        <img src="/icons/deposit.png" alt="Deposit" />
        <span>Deposit</span>
      </div>
      <div className="footer-item">
        <img src="/icons/services.png" alt="Services" />
        <span>Services</span>
      </div>
    </footer>
  );
}
