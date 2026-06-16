import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, User, ChevronDown, CheckCircle } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="amazon-header">
      {/* CSS in JS for the specific Amazon layout */}
      <style>{`
        :root {
          --header-height: 105px !important;
        }
        .amazon-header {
          background-color: var(--secondary, #2A329F);
          color: white;
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          font-family: inherit;
        }
        .amazon-header a {
          color: white;
          text-decoration: none;
        }
        .amz-nav-belt {
          display: flex;
          align-items: center;
          padding: 10px 20px;
          gap: 20px;
          min-height: 80px;
        }
        .amz-logo-link {
          display: flex;
          align-items: center;
          padding: 5px;
          border: 1px solid transparent;
          border-radius: 2px;
        }
        .amz-logo-link:hover {
          border-color: white;
        }
        .amz-logo-img {
          height: 55px;
          object-fit: contain;
        }
        .amz-search-bar {
          flex-grow: 1;
          display: flex;
          border-radius: 4px;
          overflow: hidden;
          background-color: white;
          height: 40px;
        }
        .amz-search-input {
          flex-grow: 1;
          padding: 0 15px;
          border: none;
          outline: none;
          color: black;
          font-size: 1rem;
        }
        .amz-search-btn {
          background-color: var(--primary, #FFEE00);
          border: none;
          padding: 0 15px;
          cursor: pointer;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .amz-search-btn:hover {
          background-color: var(--primary-hover, #e5d600);
        }
        .amz-nav-tools {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .amz-nav-item {
          display: flex;
          flex-direction: column;
          padding: 8px;
          border: 1px solid transparent;
          border-radius: 2px;
          cursor: pointer;
        }
        .amz-nav-item:hover {
          border-color: white;
        }
        .amz-nav-line-1 {
          font-size: 0.75rem;
          line-height: 14px;
          white-space: nowrap;
        }
        .amz-nav-line-2 {
          font-size: 0.85rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          line-height: 15px;
          white-space: nowrap;
        }
        .amz-nav-main {
          background-color: var(--secondary-hover, #222880);
          display: flex;
          padding: 5px 20px;
          align-items: center;
          gap: 10px;
          overflow-x: auto;
          white-space: nowrap;
          height: 40px;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .amz-nav-main::-webkit-scrollbar {
          display: none;
        }
        .amz-bottom-link {
          padding: 8px 10px;
          border: 1px solid transparent;
          border-radius: 2px;
          font-size: 0.9rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .amz-bottom-link:hover {
          border-color: white;
        }
        .amz-cart-btn {
          display: flex;
          flex-direction: row !important;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background-color: var(--primary, #FFEE00);
          color: #111 !important;
          padding: 0 20px !important;
          height: 42px;
          border-radius: 4px;
          font-weight: 800;
          font-size: 1rem;
          white-space: nowrap;
          border: none !important;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .amz-cart-btn:hover {
          background-color: #facc15;
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
          transform: translateY(-1px);
        }
        
        .user-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: #f1f5f9;
          color: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.9rem;
          margin-right: 8px;
        }

        .mobile-only {
          display: none;
        }

        @media (max-width: 768px) {
          :root {
            --header-height: 140px !important;
          }
          .amz-nav-belt {
            flex-wrap: wrap;
            padding: 8px 10px;
            height: auto;
          }
          .amz-logo-link {
            padding: 0;
            max-width: 60%;
          }
          .amz-logo-img {
            height: 45px;
          }
          .amz-search-bar {
            order: 3;
            width: 100%;
            margin-top: 8px;
            height: 38px;
          }
          .amz-nav-tools {
            gap: 2px;
            margin-left: auto;
          }
          .amz-nav-item {
            padding: 4px;
          }
          .amz-cart-btn {
            height: 35px;
            padding: 0 12px !important;
          }
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: flex;
          }
        }
        @media (max-width: 480px) {
          :root {
            --header-height: 130px !important;
          }
          .amz-nav-main {
            padding: 5px 10px;
          }
          .amz-bottom-link {
            font-size: 0.85rem;
            padding: 6px 8px;
          }
        }
      `}</style>

      {/* Top Bar (Nav Belt) */}
      <div className="amz-nav-belt">
        {/* Logo */}
        <Link to="/" className="amz-logo-link">
          <img src="/logo1.png" alt="Diamond Pest Control Logo" className="amz-logo-img" />
          <span className="desktop-only" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginLeft: '10px' }}>Diamond Pest Control</span>
        </Link>

        {/* Search Bar */}
        <form className="amz-search-bar" onSubmit={handleSearch}>
          <input 
            type="text" 
            className="amz-search-input" 
            placeholder="Search for pest control services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="amz-search-btn" aria-label="Search">
            <Search size={22} />
          </button>
        </form>

        {/* Right Tools */}
        <div className="amz-nav-tools">
          {/* Account */}
          <Link to={user ? (user.role === 'ADMIN' ? '/dashboard' : '/user-dashboard') : '/profile'} className="amz-nav-item">
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="user-avatar">{user.full_name ? user.full_name.charAt(0).toUpperCase() : <User size={16} />}</div>
                <div className="desktop-only">
                  <span className="amz-nav-line-1">Hello, {user.full_name ? user.full_name.split(' ')[0] : 'User'}</span>
                  <span className="amz-nav-line-2">Account & Lists <ChevronDown size={14} style={{ marginLeft: '2px' }} /></span>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="mobile-only"><User size={24} /></div>
                <div className="desktop-only">
                  <span className="amz-nav-line-1">Hello, sign in</span>
                  <span className="amz-nav-line-2">Account & Lists <ChevronDown size={14} style={{ marginLeft: '2px' }} /></span>
                </div>
              </div>
            )}
          </Link>

          {/* Bookings / Returns */}
          <Link to={user ? '/bookings' : '/profile'} className="amz-nav-item desktop-only">
            <span className="amz-nav-line-1">Returns</span>
            <span className="amz-nav-line-2">& Bookings</span>
          </Link>

          {/* Book Now (Cart Equivalent) */}
          <Link to="/book" className="amz-nav-item amz-cart-btn">
            <ShoppingCart size={22} className="desktop-only" />
            <CheckCircle size={22} className="mobile-only" />
            <span className="desktop-only" style={{ fontSize: '1rem' }}>Book Now</span>
          </Link>
        </div>
      </div>

      {/* Bottom Bar (Nav Main) */}
      <div className="amz-nav-main">
        <div 
          className="amz-bottom-link" 
          style={{ cursor: 'pointer' }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={20} /> All
        </div>
        <Link to="/" className="amz-bottom-link">Home</Link>
        <Link to="/services" className="amz-bottom-link">Pest Services</Link>
        <Link to="/pricing" className="amz-bottom-link">Pricing</Link>
        <Link to="/blog" className="amz-bottom-link">Pest Guide & Blog</Link>
        <Link to="/about" className="amz-bottom-link">About Us</Link>
        <Link to="/contact" className="amz-bottom-link">Customer Service</Link>
      </div>

      {/* Mobile Menu Dropdown Overlay */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, width: '250px', backgroundColor: 'white', color: '#111',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', zIndex: 1001,
          display: 'flex', flexDirection: 'column'
        }}>
          <div style={{ backgroundColor: '#f1f5f9', padding: '15px 20px', fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {user ? <div className="user-avatar" style={{ margin: 0, backgroundColor: 'var(--secondary)', color: 'white' }}>{user.full_name ? user.full_name.charAt(0).toUpperCase() : <User size={16} />}</div> : <User size={24} />}
            Hello, {user ? (user.full_name ? user.full_name.split(' ')[0] : 'User') : 'sign in'}
          </div>
          <Link to="/" className="amz-bottom-link" style={{ color: '#111', padding: '15px 20px', borderBottom: '1px solid #f1f5f9' }} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/services" className="amz-bottom-link" style={{ color: '#111', padding: '15px 20px', borderBottom: '1px solid #f1f5f9' }} onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          <Link to="/pricing" className="amz-bottom-link" style={{ color: '#111', padding: '15px 20px', borderBottom: '1px solid #f1f5f9' }} onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
          <Link to="/book" className="amz-bottom-link" style={{ color: '#111', padding: '15px 20px', borderBottom: '1px solid #f1f5f9' }} onClick={() => setIsMobileMenuOpen(false)}>Book Now</Link>
          <Link to={user ? (user.role === 'ADMIN' ? '/dashboard' : '/user-dashboard') : '/profile'} className="amz-bottom-link" style={{ color: '#111', padding: '15px 20px' }} onClick={() => setIsMobileMenuOpen(false)}>Your Account</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
