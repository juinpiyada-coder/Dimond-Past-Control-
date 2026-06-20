import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, User, ChevronDown, CheckCircle } from 'lucide-react';
import { FiFacebook } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { SettingsContext } from '../../App';
import { apiCall } from '../../utils/api';
import FifaLoader from '../FifaLoader';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const settings = useContext(SettingsContext);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [allData, setAllData] = useState({ services: [], blogs: [], pages: [] });
  
  const headerMenus = [
    { menu_id: 1, label: 'Home', url: '/' },
    { menu_id: 2, label: 'About Us', url: '/about' },
    { menu_id: 3, label: 'Services', url: '/services' },
    { menu_id: 7, label: 'Blog', url: '/blog' },
    { menu_id: 5, label: 'Our Clients', url: '/clients' },
    { menu_id: 4, label: 'Contact', url: '/contact' }
  ];

  React.useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const [servicesRes, blogsRes] = await Promise.all([
          apiCall('/services').catch(() => []),
          apiCall('/blogs').catch(() => [])
        ]);
        setAllData({ 
          services: Array.isArray(servicesRes) ? servicesRes : [], 
          blogs: Array.isArray(blogsRes) ? blogsRes : [], 
          pages: headerMenus 
        });
      } catch (err) {
        console.error('Failed to fetch search data', err);
      }
    };
    fetchSearchData();
  }, []);

  React.useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    const q = searchQuery.toLowerCase();
    
    const matchedPages = allData.pages
      .filter(p => p.label.toLowerCase().includes(q))
      .map(p => ({ label: p.label, url: p.url, type: 'Page' }));
      
    const matchedServices = allData.services
      .filter(s => s.name?.toLowerCase().includes(q) || s.short_description?.toLowerCase().includes(q))
      .map(s => ({ label: s.name, url: `/service/${s.name.toLowerCase().replace(/\s+/g, '-')}`, type: 'Service' }));
      
    const matchedBlogs = allData.blogs
      .filter(b => b.title?.toLowerCase().includes(q) || b.excerpt?.toLowerCase().includes(q))
      .map(b => ({ label: b.title, url: `/blog/${b.id}`, type: 'Blog' }));

    setSearchResults([...matchedPages, ...matchedServices, ...matchedBlogs].slice(0, 8)); // Max 8 results
    setShowResults(true);
  }, [searchQuery, allData]);

  const handleNavigation = (e, url) => {
    if (e) e.preventDefault();
    setIsNavigating(true);
    setShowResults(false);
    setSearchQuery('');
    setTimeout(() => {
      setIsNavigating(false);
      setIsMobileMenuOpen(false);
      navigate(url);
    }, 800);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleNavigation(null, searchResults[0].url);
    } else if (searchQuery.trim()) {
      navigate(`/services?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
      setSearchQuery('');
    }
  };

  return (
    <>
    {isNavigating && <FifaLoader />}
    <header className="ecom-header" style={{ position: 'relative' }}>
      {/* Football Animation Container */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        <motion.div
          style={{ position: 'absolute', top: '50%', marginTop: '-12px', fontSize: '24px' }}
          initial={{ left: '0%', rotate: 0 }}
          animate={{ left: '100%', rotate: 720 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          ⚽
        </motion.div>
      </div>
      
      {/* Top Bar (Nav Belt) */}
      <div className="ecom-nav-belt">
        {/* Mobile Hamburger */}
        <div className="mobile-only" style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu size={28} />
        </div>

        {/* Logo */}
        <Link to="/" className="ecom-logo-link" style={{ position: 'relative', display: 'flex', alignItems: 'center' }} onClick={(e) => handleNavigation(e, '/')}>
          <motion.img 
            src="/logo1.png" 
            alt="Diamond Pest Control Logo" 
            className="ecom-logo-img" 
            style={{ position: 'relative', zIndex: 10 }} 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.span 
            className="desktop-only" 
            style={{ fontSize: '1.3rem', fontWeight: 'bold', marginLeft: '10px', position: 'relative', zIndex: 10, display: 'inline-block' }}
            initial={{ opacity: 0, scale: 1.3, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Diamond Pest Control
          </motion.span>
        </Link>

        {/* Search Bar */}
        <div className="ecom-search-wrapper">
          <form className="ecom-search-bar" onSubmit={handleSearch} style={{ margin: 0, width: '100%' }}>
            <input 
              type="text" 
              className="ecom-search-input" 
              placeholder="Search for services, blogs, or pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => { if (searchQuery.trim()) setShowResults(true); }}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
            />
            <button type="submit" className="ecom-search-btn" aria-label="Search">
              <Search size={22} />
            </button>
          </form>

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {showResults && searchResults.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{ 
                  position: 'absolute', 
                  top: '100%', 
                  left: 0, 
                  right: 0, 
                  backgroundColor: 'white', 
                  borderRadius: '0.5rem', 
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)', 
                  marginTop: '0.5rem', 
                  zIndex: 50,
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0'
                }}
              >
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '350px', overflowY: 'auto' }}>
                  {searchResults.map((result, idx) => (
                    <li key={idx} style={{ borderBottom: idx < searchResults.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                      <Link 
                        to={result.url} 
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', textDecoration: 'none', color: '#0f172a', transition: 'background-color 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        onClick={(e) => handleNavigation(e, result.url)}
                      >
                        <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{result.label}</span>
                        <span style={{ fontSize: '0.75rem', backgroundColor: '#e2e8f0', color: '#475569', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontWeight: 600 }}>{result.type}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Tools */}
        <div className="ecom-nav-tools">
          {/* Account */}
          <Link to={user ? (user.role === 'ADMIN' ? '/dashboard' : '/user-dashboard') : '/profile'} className="ecom-nav-item" onClick={(e) => handleNavigation(e, user ? (user.role === 'ADMIN' ? '/dashboard' : '/user-dashboard') : '/profile')}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="user-avatar">{user.full_name ? user.full_name.charAt(0).toUpperCase() : <User size={16} />}</div>
                <div className="desktop-only">
                  <span className="ecom-nav-line-1">Hello, {user.full_name ? user.full_name.split(' ')[0] : 'User'}</span>
                  <span className="ecom-nav-line-2">Account & Lists <ChevronDown size={14} style={{ marginLeft: '2px' }} /></span>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="mobile-only"><User size={24} /></div>
                <div className="desktop-only">
                  <span className="ecom-nav-line-1">Hello, sign in</span>
                  <span className="ecom-nav-line-2">Account & Lists <ChevronDown size={14} style={{ marginLeft: '2px' }} /></span>
                </div>
              </div>
            )}
          </Link>

          {/* Bookings / Returns */}
          <Link to={user ? '/bookings' : '/profile'} className="ecom-nav-item desktop-only" onClick={(e) => handleNavigation(e, user ? '/bookings' : '/profile')}>
            <span className="ecom-nav-line-1">Returns</span>
            <span className="ecom-nav-line-2">& Bookings</span>
          </Link>

          {/* Book Now (Cart Equivalent) */}
          <Link to="/book" className="ecom-nav-item ecom-cart-btn" onClick={(e) => handleNavigation(e, '/book')}>
            <ShoppingCart size={22} className="desktop-only" />
            <CheckCircle size={22} className="mobile-only" />
            <span className="desktop-only" style={{ fontSize: '1rem' }}>Book Now</span>
          </Link>
        </div>
      </div>

      {/* Bottom Bar (Nav Main) */}
      <div className="ecom-nav-main">
        <div 
          className="ecom-bottom-link" 
          style={{ cursor: 'pointer' }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={20} /> All
        </div>
        {headerMenus.map(menu => (
          <a key={menu.menu_id} href={menu.url} onClick={(e) => handleNavigation(e, menu.url)} className="ecom-bottom-link">{menu.label}</a>
        ))}
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
          {headerMenus.map(menu => (
            <a key={menu.menu_id} href={menu.url} className="ecom-bottom-link" style={{ color: '#111', padding: '15px 20px', borderBottom: '1px solid #f1f5f9' }} onClick={(e) => handleNavigation(e, menu.url)}>{menu.label}</a>
          ))}
          <a href="/book" className="ecom-bottom-link" style={{ color: '#111', padding: '15px 20px', borderBottom: '1px solid #f1f5f9' }} onClick={(e) => handleNavigation(e, '/book')}>Book Now</a>
          <a href={user ? (user.role === 'ADMIN' ? '/dashboard' : '/user-dashboard') : '/profile'} className="ecom-bottom-link" style={{ color: '#111', padding: '15px 20px' }} onClick={(e) => handleNavigation(e, user ? (user.role === 'ADMIN' ? '/dashboard' : '/user-dashboard') : '/profile')}>Your Account</a>
        </div>
      )}
    </header>
    </>
  );
};

export default Header;
