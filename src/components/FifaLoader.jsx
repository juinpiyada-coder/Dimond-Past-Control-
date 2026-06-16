import React from 'react';
import { motion } from 'framer-motion';

const FifaLoader = () => {
  return (
    <div className="fifa-loader-container">
      <style>{`
        .fifa-loader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a0b2e 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        .fifa-background-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(162,28,255,0.2) 0%, rgba(0,0,0,0) 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          z-index: 1;
        }

        .fifa-logo-26 {
          position: absolute;
          font-size: 15rem;
          font-weight: 900;
          background: linear-gradient(to right, #00ff87, #60efff, #ff007f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 0.15;
          z-index: 2;
          letter-spacing: -10px;
        }

        .loader-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .soccer-ball-wrapper {
          width: 100px;
          height: 100px;
          margin-bottom: 40px;
          position: relative;
        }

        .soccer-ball {
          width: 100px;
          height: 100px;
          background-color: white;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
          box-shadow: inset -10px -10px 20px rgba(0,0,0,0.3), 0 15px 25px rgba(0,0,0,0.5);
        }

        /* Simplified CSS Soccer Ball Pattern */
        .pentagon {
          position: absolute;
          width: 30px;
          height: 30px;
          background: #111;
          clip-path: polygon(50% 0%, 100% 38%, 81% 100%, 19% 100%, 0% 38%);
        }
        .p-center { top: 35px; left: 35px; }
        .p-top { top: -10px; left: 35px; transform: scale(0.8); }
        .p-bottom-left { top: 65px; left: 5px; transform: rotate(36deg) scale(0.8); }
        .p-bottom-right { top: 65px; right: 5px; transform: rotate(-36deg) scale(0.8); }
        .p-top-left { top: 20px; left: -10px; transform: rotate(-72deg) scale(0.8); }
        .p-top-right { top: 20px; right: -10px; transform: rotate(72deg) scale(0.8); }

        .loading-text {
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-bottom: 10px;
          display: flex;
          gap: 5px;
        }

        .loading-dot {
          width: 6px;
          height: 6px;
          background-color: #00ff87;
          border-radius: 50%;
          display: inline-block;
        }

        .fifa-branding {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          letter-spacing: 2px;
          margin-top: 20px;
          text-transform: uppercase;
        }
      `}</style>

      {/* Ambient background glow */}
      <motion.div 
        className="fifa-background-glow"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />

      {/* Giant Background '26' */}
      <motion.div 
        className="fifa-logo-26"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        26
      </motion.div>

      <div className="loader-content">
        {/* Bouncing & Spinning Soccer Ball */}
        <motion.div 
          className="soccer-ball-wrapper"
          animate={{ y: [0, -60, 0] }}
          transition={{ 
            duration: 0.6, 
            repeat: Infinity, 
            ease: "easeOut" 
          }}
        >
          <motion.div 
            className="soccer-ball"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <div className="pentagon p-center"></div>
            <div className="pentagon p-top"></div>
            <div className="pentagon p-bottom-left"></div>
            <div className="pentagon p-bottom-right"></div>
            <div className="pentagon p-top-left"></div>
            <div className="pentagon p-top-right"></div>
          </motion.div>
          
          {/* Ball Shadow */}
          <motion.div 
            style={{
              width: '60px',
              height: '10px',
              background: 'rgba(0,0,0,0.5)',
              borderRadius: '50%',
              position: 'absolute',
              bottom: '-30px',
              left: '20px',
              filter: 'blur(4px)'
            }}
            animate={{ 
              scale: [1, 0.5, 1],
              opacity: [0.5, 0.2, 0.5]
            }}
            transition={{ 
              duration: 0.6, 
              repeat: Infinity, 
              ease: "easeOut" 
            }}
          />
        </motion.div>

        {/* Loading Text */}
        <div className="loading-text">
          LOADING
          <motion.div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end', paddingBottom: '4px' }}>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="loading-dot"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundColor: i === 0 ? '#00ff87' : i === 1 ? '#60efff' : '#ff007f'
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Branding */}
        <motion.div 
          className="fifa-branding"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          FIFA World Cup 2026™
        </motion.div>
      </div>
    </div>
  );
};

export default FifaLoader;
