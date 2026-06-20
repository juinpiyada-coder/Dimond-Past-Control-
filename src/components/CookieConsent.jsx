import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, ShieldCheck } from 'lucide-react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookie_consent');
    if (!hasConsented) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setIsVisible(false);
  };

  return (
    <>
      {/* Floating Action Button when banner is hidden */}
      <AnimatePresence>
        {!isVisible && (
          <motion.button
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => setIsVisible(true)}
            className="cookie-fab"
            title="Privacy Settings"
          >
            <Cookie size={28} className="cookie-fab-icon" />
            
            {/* Glowing dot */}
            <span className="cookie-fab-dot">
              <span className="cookie-fab-dot-ping"></span>
              <span className="cookie-fab-dot-core"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Next-Level Glassmorphic Cookie Banner */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 150, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 150, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="cookie-banner-overlay"
          >
            <div className="cookie-banner-wrapper">
              {/* Animated background gradient */}
              <div className="cookie-banner-bg-anim" />
              
              <div className="cookie-banner-content">
                
                {/* Close Button */}
                <button 
                  onClick={() => setIsVisible(false)} 
                  className="cookie-close-btn"
                >
                  <X size={20} />
                </button>

                {/* Content */}
                <div className="cookie-info-section">
                  <motion.div 
                    initial={{ rotate: -20, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="cookie-icon-container"
                  >
                    <div className="cookie-icon-glow" />
                    <div className="cookie-icon-box">
                      <Cookie size={42} className="cookie-icon-svg" />
                    </div>
                  </motion.div>

                  <div className="cookie-text-container">
                    <h3 className="cookie-title">
                      <ShieldCheck size={24} className="cookie-title-icon" /> 
                      Your Privacy Matters
                    </h3>
                    <p className="cookie-description">
                      We use strictly necessary cookies to make our site work. We'd also like to set optional cookies to help us improve it, personalize content, and provide a better experience. <span>Your choice is respected.</span>
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="cookie-actions">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleDecline}
                    className="cookie-btn-reject"
                  >
                    Reject Optional
                  </motion.button>
                  
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAccept}
                    className="cookie-btn-accept"
                  >
                    Accept All Cookies
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent;
