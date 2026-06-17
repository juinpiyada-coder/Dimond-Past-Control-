import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FiFacebook, FiTwitter, FiYoutube, FiLinkedin } from 'react-icons/fi';
import { MenuContext } from '../../App';

const Footer = () => {
  const menus = useContext(MenuContext);
  const footerMenus = menus.filter(m => m.menu_location === 'FOOTER' && m.is_active === 1).sort((a, b) => a.order_index - b.order_index);
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <img src="/logo1.png" alt="Diamond Pest Control Logo" className="logo-img-footer" style={{ height: '60px', marginBottom: '1rem', objectFit: 'contain' }} />
          </div>
          <p className="footer-text" style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem', color: '#cbd5e1' }}>
            <strong>Diamond Pest Control – Complete Protection for Your Home & Business.</strong><br/><br/>
            Trusted Pest Control Services You Can Rely On. Welcome to Diamond Pest Control — your trusted partner for safe, effective, and long-lasting pest management solutions.
          </p>
          <div className="social-links" style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" className="social-icon" style={{ color: 'white', backgroundColor: '#334155', padding: '0.5rem', borderRadius: '50%', display: 'flex' }}><FiFacebook size={18} /></a>
            <a href="#" className="social-icon" style={{ color: 'white', backgroundColor: '#334155', padding: '0.5rem', borderRadius: '50%', display: 'flex' }}><FiTwitter size={18} /></a>
            <a href="#" className="social-icon" style={{ color: 'white', backgroundColor: '#334155', padding: '0.5rem', borderRadius: '50%', display: 'flex' }}><FiYoutube size={18} /></a>
            <a href="#" className="social-icon" style={{ color: 'white', backgroundColor: '#334155', padding: '0.5rem', borderRadius: '50%', display: 'flex' }}><FiLinkedin size={18} /></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle" style={{ color: '#facc15', fontSize: '1.125rem', marginBottom: '1.25rem' }}>Company</h4>
          <ul className="footer-links" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><Link to="/about" style={{ color: '#e2e8f0', textDecoration: 'none' }}>About Us</Link></li>
            <li><Link to="/blog" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Blogs</Link></li>
            {footerMenus.map(menu => (
              <li key={menu.menu_id}><Link to={menu.url} style={{ color: '#e2e8f0', textDecoration: 'none' }}>{menu.label}</Link></li>
            ))}
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle" style={{ color: '#facc15', fontSize: '1.125rem', marginBottom: '1.25rem' }}>Help</h4>
          <ul className="footer-links" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><a href="mailto:diamondpestcontrol3@gmail.com" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Email Us</a></li>
            <li><Link to="/faq" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Help & FAQ</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle" style={{ color: '#facc15', fontSize: '1.125rem', marginBottom: '1.25rem' }}>Connect With Us</h4>
          <ul className="footer-contact" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: '#e2e8f0' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}><MapPin size={20} style={{ marginTop: '2px', color: '#facc15' }} /> <span>23/1 Bikramgarh, Kolkata 700032</span></li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Phone size={20} style={{ color: '#facc15' }} /> <span>+91 90519 31617</span></li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Mail size={20} style={{ color: '#facc15' }} /> <span>diamondpestcontrol3@gmail.com</span></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom" style={{ borderTop: '1px solid #334155', padding: '1.5rem 0', marginTop: '3rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.875rem' }}>Copyright © 2026 Diamond Pest Control Pvt, All rights reserved. Powered by Globeforge</p>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem' }}>
            <Link to="/terms" style={{ color: '#94a3b8', textDecoration: 'none' }}>Term of use</Link>
            <Link to="/privacy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/cookie" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
