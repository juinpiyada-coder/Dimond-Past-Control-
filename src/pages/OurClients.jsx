import React from 'react';
import { motion } from 'framer-motion';

const OurClients = () => {
  const clients = [
    { name: "Biswa Bangla", image: "/Clients/Biswa bangla .webp" },
    { name: "Axis Bank", image: "/Clients/axis bank.webp" },
    { name: "Bandhan Bank", image: "/Clients/bandhan bank .webp" },
    { name: "Bank of India", image: "/Clients/bank of india.webp" },
    { name: "Bank of Maharashtra", image: "/Clients/bank of maharasta.webp" },
    { name: "Coal India", image: "/Clients/coal india.webp" },
    { name: "Indian Railway", image: "/Clients/indianrailway.webp" },
    { name: "PNB Bank", image: "/Clients/pnb bank.webp" },
    { name: "SBI Bank", image: "/Clients/sbi bank .webp" }
  ];

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header" style={{ padding: '60px 0', backgroundColor: 'var(--secondary)', textAlign: 'center' }}>
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ color: 'var(--text-light)', fontSize: '3rem', marginBottom: '10px' }}>
            Our Clients
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ color: 'var(--primary)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Trusted by the Best
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container section-padding">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2rem', color: '#1e293b', marginBottom: '20px' }}>Proud to Serve</h2>
          <p style={{ fontSize: '1.2rem', color: '#64748b', lineHeight: '1.8' }}>
            We're proud to serve a wide range of clients—from homeowners and property managers to commercial businesses and industrial facilities. Our commitment to safety, reliability, and long-term protection has earned us the trust of hundreds of satisfied clients.
          </p>
        </div>

        {/* Clients Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          alignItems: 'center',
          justifyItems: 'center'
        }}>
          {clients.map((client, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 15px 30px rgba(0,0,0,0.1)" }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '150px',
                border: '1px solid #e2e8f0'
              }}
            >
              <img 
                src={client.image} 
                alt={client.name} 
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurClients;
