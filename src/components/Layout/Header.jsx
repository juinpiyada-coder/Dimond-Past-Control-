import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, User, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <img src="/logo1.png" alt="Diamond Pest Control Logo" className="logo-img" />
          <span className="logo-text" style={{ color: 'white', marginLeft: '10px' }}>Dimond Past Control</span>
        </Link>
        
        <nav className="desktop-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/pricing" className="nav-link">Pricing</Link>
        </nav>
        
        <div className="header-actions">
          <Link to="/book" className="btn btn-primary">Book Now</Link>
          <Link to="/profile" className="icon-btn" aria-label="Profile">
            <User size={20} />
          </Link>
          <button className="mobile-menu-btn" aria-label="Menu">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
