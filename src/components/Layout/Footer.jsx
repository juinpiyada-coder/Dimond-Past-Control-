import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Share2 } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3 className="footer-title">Dimond Pest Control</h3>
          <p className="footer-text">
            Professional and reliable pest control services for your home and business. Your safety is our priority.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon"><Share2 size={20} /></a>
            <a href="#" className="social-icon"><Share2 size={20} /></a>
            <a href="#" className="social-icon"><Share2 size={20} /></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Support</h4>
          <ul className="footer-links">
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/guide">Pest Identification</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Contact</h4>
          <ul className="footer-contact">
            <li><Phone size={16} /> +1 234 567 890</li>
            <li><Mail size={16} /> info@dimondpest.com</li>
            <li><MapPin size={16} /> 123 Clean Street, NY</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Dimond Pest Control. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
