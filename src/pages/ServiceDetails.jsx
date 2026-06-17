import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Bug } from 'lucide-react';
import { motion } from 'framer-motion';
import Skeleton from '../components/Skeleton';
import { fetchCached } from '../utils/api';

const ServiceDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    if (apiUrl) {
      fetchCached(`${apiUrl}/services`)
        .then(data => {
          let foundService = null;
          if (Array.isArray(data) && data.length > 0) {
            foundService = data.find(s => s.service_name.toLowerCase() === decodeURIComponent(name).toLowerCase());
          }
          if (foundService) {
            setService(foundService);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch services", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [name]);

  if (loading) {
    return (
      <div className="service-details-page">
        <div className="page-header" style={{ padding: '60px 0', backgroundColor: 'var(--secondary)' }}>
          <div className="container">
            <Skeleton height="48px" width="40%" style={{ marginBottom: '10px' }} />
            <Skeleton height="20px" width="30%" />
          </div>
        </div>
        <div className="container section-padding">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '50px' }}>
            <Skeleton height="400px" borderRadius="12px" />
            <div>
              <Skeleton height="40px" width="80%" style={{ marginBottom: '20px' }} />
              <Skeleton height="16px" width="100%" style={{ marginBottom: '10px' }} />
              <Skeleton height="16px" width="100%" style={{ marginBottom: '10px' }} />
              <Skeleton height="16px" width="90%" style={{ marginBottom: '30px' }} />
              <Skeleton height="24px" width="50%" style={{ marginBottom: '20px' }} />
              <Skeleton height="150px" borderRadius="12px" style={{ marginBottom: '30px' }} />
              <Skeleton height="50px" width="100%" borderRadius="8px" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="page container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>Service not found</h2>
        <p>We couldn't find the service you're looking for.</p>
        <Link to="/services" className="btn btn-primary" style={{ marginTop: '20px' }}>Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="service-details-page">
      <style>{`
        .service-details-header {
          padding: 60px 0;
          background-color: var(--secondary);
        }
        .service-details-title {
          color: var(--text-light);
          font-size: 3rem;
          margin-bottom: 10px;
        }
        .service-details-subtitle {
          color: var(--primary);
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .service-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
          gap: 50px;
          align-items: flex-start;
        }
        .service-details-image {
          min-height: 400px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          background-color: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .service-details-h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          .service-details-header {
            padding: 40px 0;
          }
          .service-details-title {
            font-size: 2rem;
          }
          .service-details-subtitle {
            font-size: 1rem;
          }
          .service-details-grid {
            gap: 30px;
          }
          .service-details-image {
            min-height: 250px;
          }
          .service-details-h2 {
            font-size: 1.8rem;
          }
        }
      `}</style>
      {/* Header */}
      <div className="page-header service-details-header">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="service-details-title"
          >
            {service.service_name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="service-details-subtitle"
          >
            Professional Extermination & Prevention
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container section-padding">
        <div className="service-details-grid">
          
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="service-details-image"
          >
            {service.service_image ? (
              <img 
                src={service.service_image} 
                alt={service.service_name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                <Bug size={80} style={{ opacity: 0.3, marginBottom: '20px' }} />
                <h3>No Image Available</h3>
              </div>
            )}
          </motion.div>

          {/* Details Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="section-title text-left service-details-h2">
              Comprehensive {service.service_name} Solutions
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '30px' }}>
              {service.description}
            </p>
            
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--secondary)', marginBottom: '15px' }}>Why Choose This Service?</h3>
              <ul className="checklist">
                <li><CheckCircle className="check-icon" size={20} /> Thorough Inspection of the Property</li>
                <li><CheckCircle className="check-icon" size={20} /> Safe & Eco-Friendly Treatments</li>
                <li><CheckCircle className="check-icon" size={20} /> Long-lasting Prevention Strategies</li>
                <li><CheckCircle className="check-icon" size={20} /> 100% Satisfaction Guarantee</li>
              </ul>
            </div>

            <div style={{ padding: '30px', backgroundColor: 'rgba(255, 238, 0, 0.1)', borderRadius: '12px', border: '1px solid rgba(255, 238, 0, 0.3)', marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <Shield size={32} style={{ color: 'var(--secondary)' }} />
                <h3 style={{ margin: 0, color: 'var(--secondary)' }}>Base Pricing Starts At</h3>
              </div>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-dark)', margin: 0 }}>
                ₹{Number(service.base_price || 0).toFixed(2)}
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>*Final price may vary based on inspection.</p>
            </div>

            <button 
              onClick={() => navigate(`/book?pest=${encodeURIComponent(service.service_name)}`)}
              className="btn btn-secondary" 
              style={{ padding: '15px 40px', fontSize: '1.2rem', width: '100%' }}
            >
              Book This Service Now <ArrowRight size={20} />
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
