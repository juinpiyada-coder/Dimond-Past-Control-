import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Bug } from 'lucide-react';
import { motion } from 'framer-motion';
import { apiCall } from '../utils/api';

const AllServices = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const staticServices = [
    { service_name: "Cockroaches", service_image: "/cockroach_control.png", description: "Complete eradication of cockroaches with targeted gel baiting and odorless sprays.", base_price: 999 },
    { service_name: "Termites", service_image: "/termite_control.png", description: "Advanced drill-fill-seal anti-termite treatments for pre and post-construction.", base_price: 4500 },
    { service_name: "Bed Bugs", service_image: "/bed_bug_control.png", description: "Intensive multi-step treatment to eliminate bed bugs from all hiding places.", base_price: 1499 },
    { service_name: "Rodents", service_image: "/rodent_control.png", description: "Professional trapping and baiting to manage rats and mice securely.", base_price: 1200 },
    { service_name: "Mosquitoes", service_image: "/mosquito_control.png", description: "Comprehensive indoor and outdoor thermal fogging for mosquito control.", base_price: 1299 },
    { service_name: "Ants", service_image: "/ant_control.png", description: "Targeted ant bait application to destroy colonies at their source.", base_price: 899 },
    { service_name: "Wood Borer", service_image: "/wood_borer_control.png", description: "Specialized chemical injection to preserve furniture from wood borers.", base_price: 1599 }
  ];

  useEffect(() => {
    apiCall('/services')
      .then(data => {
        if (Array.isArray(data)) {
          setServices(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch services", err);
        setLoading(false);
      });
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="all-services-page">
      {/* Header */}
      <div className="page-header" style={{ padding: '60px 0', backgroundColor: 'var(--secondary)' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: 'var(--text-light)', fontSize: '3rem', marginBottom: '10px' }}
          >
            All Pest Control Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ color: 'var(--primary)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}
          >
            Comprehensive solutions for every pest problem
          </motion.p>
        </div>
      </div>

      <div className="container section-padding">
        {[...staticServices, ...services].length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <h2>No services found</h2>
            <p>Please check back later.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
            {[...staticServices, ...services].map((service, index) => (
              <motion.div 
                key={service.service_id || index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', 
                  gap: '50px', 
                  alignItems: 'center',
                  direction: index % 2 === 1 ? 'rtl' : 'ltr'
                }}
              >
                {/* Image Column */}
                <motion.div variants={fadeInUp} style={{ minHeight: '350px', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {service.service_image ? (
                    <img 
                      src={service.service_image} 
                      alt={service.service_name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ textAlign: 'center', color: '#94a3b8', direction: 'ltr' }}>
                      <Bug size={80} style={{ opacity: 0.3, marginBottom: '20px' }} />
                      <h3>No Image Available</h3>
                    </div>
                  )}
                </motion.div>

                {/* Details Column */}
                <motion.div variants={fadeInUp} style={{ direction: 'ltr' }}>
                  <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--text-dark)' }}>
                    {service.service_name}
                  </h2>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '30px' }}>
                    {service.description || "Comprehensive pest control treatment ensuring a safe environment."}
                  </p>
                  
                  <div style={{ marginBottom: '30px' }}>
                    <ul className="checklist" style={{ listStyle: 'none', padding: 0 }}>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}><CheckCircle style={{ color: 'var(--primary)' }} size={20} /> Thorough Inspection of the Property</li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}><CheckCircle style={{ color: 'var(--primary)' }} size={20} /> Safe & Eco-Friendly Treatments</li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}><CheckCircle style={{ color: 'var(--primary)' }} size={20} /> Long-lasting Prevention Strategies</li>
                    </ul>
                  </div>

                  <div style={{ padding: '20px', backgroundColor: 'rgba(255, 238, 0, 0.1)', borderRadius: '12px', border: '1px solid rgba(255, 238, 0, 0.3)', marginBottom: '30px', display: 'inline-block', width: '100%', maxWidth: '300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <Shield size={24} style={{ color: 'var(--secondary)' }} />
                      <h3 style={{ margin: 0, color: 'var(--secondary)', fontSize: '1.1rem' }}>Base Price</h3>
                    </div>
                    <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-dark)', margin: 0 }}>
                      ₹{Number(service.base_price || 0).toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <button 
                      onClick={() => navigate(`/book?pest=${encodeURIComponent(service.service_name)}`)}
                      className="btn btn-secondary" 
                      style={{ padding: '12px 30px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      Book Service <ArrowRight size={20} />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllServices;
