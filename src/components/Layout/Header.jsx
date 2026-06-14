import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ChevronDown, Menu } from 'lucide-react';


const Header = () => {
  return (
    <header className="header">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container top-bar-container">
          <div className="top-bar-contact">
            <div className="contact-item">
              <div className="icon-circle">
                <Phone size={14} />
              </div>
              <span>9051931617 / 9836868444</span>
            </div>
            <div className="contact-item">
              <div className="icon-circle">
                <Mail size={14} />
              </div>
              <span>diamondpestcontrol3@gmail.com</span>
            </div>
          </div>
          <div className="top-bar-social">
            <a href="#" className="social-circle">f</a>
            <a href="#" className="social-circle">t</a>
            <a href="#" className="social-circle">y</a>
            <a href="#" className="social-circle">in</a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="main-nav-wrapper">
        <div className="container main-nav-container">
          {/* Logo Placeholder */}
          <Link to="/" className="brand-logo">
            <div className="diamond-logo-placeholder">
              <span className="diamond-bug">🪲</span>
            </div>
          </Link>
          
          <nav className="desktop-nav">
            <Link to="/" className="nav-link active">Home</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            <div className="nav-dropdown">
              <Link to="/services" className="nav-link">Services <ChevronDown size={14} className="dropdown-arrow" /></Link>
            </div>
            <Link to="/clients" className="nav-link">Clients</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
            <Link to="/contact" className="nav-link">Contact Us</Link>
          </nav>
          
          <div className="header-actions">
            <Link to="/pricing" className="btn btn-quote">GET A QUOTE</Link>
            <button className="mobile-menu-btn" aria-label="Menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
