import React from 'react'
import "../style/Footer.css"
const Footer = () => {
  return (
   <footer className="site-footer">
        <div className="container">
            <div className="footer-grid">
                <div className="footer-column about">
                    <h3 className="logo">KUYAPLAY</h3>
                    <p>KuyaPlay is a premier online gaming platform in the Philippines, offering a wide range of games. We are committed to providing a safe, fair, and entertaining experience for all our players.</p>
                </div>
                <div className="footer-column">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#hot-games">Hot Games</a></li>
                        <li><a href="#">Promotions</a></li>
                        <li><a href="#">VIP Club</a></li>
                        <li><a href="#">How to Deposit</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Information</h4>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 KuyaPlay. All Rights Reserved. For 18+ years old only.</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer
