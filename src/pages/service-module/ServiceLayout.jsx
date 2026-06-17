import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceLayout = ({ serviceName, title, description, image, features }) => {
  return (
    <div className="service-details-page">
      <div className="page-header" style={{ padding: '60px 0', backgroundColor: 'var(--secondary)' }}>
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ color: 'var(--text-light)', fontSize: '3rem', marginBottom: '10px' }}>
            {serviceName} Treatment
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ color: 'var(--primary)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Professional Extermination & Prevention
          </motion.p>
        </div>
      </div>

      <div className="container section-padding">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '50px', alignItems: 'flex-start' }}>
          
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} style={{ minHeight: '400px', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', backgroundColor: '#f1f5f9' }}>
            <img src={image} alt={serviceName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h2 className="section-title text-left" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
              {title}
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '30px' }}>
              {description}
            </p>
            
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--secondary)', marginBottom: '15px' }}>Why Choose This Service?</h3>
              <ul className="checklist" style={{ listStyle: 'none', padding: 0 }}>
                {features.map((feature, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', color: 'var(--text-dark)' }}>
                    <CheckCircle className="check-icon" size={20} style={{ color: 'var(--primary)' }} /> 
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Link to={`/book?pest=${encodeURIComponent(serviceName)}`} className="btn btn-secondary" style={{ padding: '15px 40px', fontSize: '1.2rem', width: '100%', display: 'inline-block', textAlign: 'center' }}>
              Book This Service Now <ArrowRight size={20} style={{ display: 'inline', marginLeft: '10px', verticalAlign: 'middle' }} />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServiceLayout;
