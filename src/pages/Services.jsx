import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldAlert, Clock, Bug } from 'lucide-react';
import { motion } from 'framer-motion';
import Skeleton from '../components/Skeleton';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    if (apiUrl) {
      fetch(`${apiUrl}/services`)
        .then(r => r.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setServices(data);
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
    <div className="services-page relative">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Pest Control Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', opacity: 0.9 }}
          >
            Trusted pest control designed for homes and businesses. We combine expert strategies with proven techniques. Safe, eco-friendly solutions that deliver lasting protection.
          </motion.p>
        </div>
      </div>

      {/* Strategy Section */}
      <section className="section-padding bg-light">
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>

            <motion.div
              style={{ flex: '1 1 500px' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="section-title text-left">
                We Work With Clients On Strategy
              </motion.h2>
              <motion.p variants={fadeInUp} style={{ marginBottom: '20px', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                At Diamond Pest Control, we believe effective pest management goes beyond treatment—it starts with the right strategy. Our team partners closely with every client to understand their unique challenges, environment, and long-term goals. Together, we design tailored strategies that focus on prevention, safety, and sustainability.
              </motion.p>
              <motion.p variants={fadeInUp} style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Whether it’s protecting homes, ensuring compliance for businesses, or safeguarding large facilities, we provide actionable insights and structured plans that deliver measurable results. With our consultative approach, you don’t just get a service—you gain a trusted partner committed to your success.
              </motion.p>
            </motion.div>

            <motion.div
              style={{ flex: '1 1 400px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} style={{ padding: '25px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', textAlign: 'center' }}>
                <Leaf style={{ color: '#16a34a', width: '40px', height: '40px', margin: '0 auto 15px' }} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#166534' }}>Eco friendly technologies</h3>
                <p style={{ color: '#15803d', fontSize: '0.9rem' }}>Safe for families, pets, and the environment</p>
              </motion.div>

              <motion.div variants={fadeInUp} style={{ padding: '25px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', textAlign: 'center' }}>
                <Clock style={{ color: '#2563eb', width: '40px', height: '40px', margin: '0 auto 15px' }} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#1e40af' }}>Fast Pest Removal</h3>
                <p style={{ color: '#1d4ed8', fontSize: '0.9rem' }}>Quick solutions when you need them most</p>
              </motion.div>

              <motion.div variants={fadeInUp} style={{ padding: '25px', backgroundColor: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '12px', textAlign: 'center', gridColumn: '1 / -1' }}>
                <ShieldAlert style={{ color: '#ea580c', width: '40px', height: '40px', margin: '0 auto 15px' }} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#9a3412' }}>One-time extermination</h3>
                <p style={{ color: '#c2410c', fontSize: '0.9rem' }}>Effective treatment without long-term contracts</p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Services Grid (Backend Connected) */}
      <section className="section-padding">
        <div className="container">
          <h2 className="section-title">Our Services</h2>

          {loading ? (
            <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' }}>
              {Array(6).fill(0).map((_, idx) => (
                <div key={idx} style={{ backgroundColor: 'var(--bg-white)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
                  <Skeleton height="200px" borderRadius="0" />
                  <div style={{ padding: '30px 25px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    <Skeleton height="24px" width="60%" />
                    <Skeleton height="16px" width="90%" />
                    <Skeleton height="16px" width="80%" />
                    <Skeleton height="40px" width="140px" borderRadius="8px" style={{ marginTop: '15px' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="services-grid"
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.service_id || index}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  style={{ backgroundColor: 'var(--bg-white)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}
                >
                  {/* Real Backend Connect Image */}
                  <div style={{ height: '200px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {service.service_image ? (
                      <img
                        src={service.service_image}
                        alt={service.service_name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                        <Bug size={48} style={{ opacity: 0.5, marginBottom: '10px' }} />
                        <span style={{ display: 'block', fontSize: '0.9rem' }}>Image coming soon</span>
                      </div>
                    )}
                  </div>

                  <div style={{ padding: '30px 25px', display: 'flex', flexDirection: 'column', flexGrow: 1, backgroundColor: 'var(--primary)', textAlign: 'center', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--text-dark)', marginBottom: '15px', fontWeight: 700 }}>{service.service_name}</h3>
                    <p style={{ color: 'var(--text-dark)', marginBottom: '25px', flexGrow: 1, lineHeight: 1.6, fontSize: '1.05rem', fontWeight: 400 }}>
                      {service.description || "Comprehensive pest control treatment ensuring a safe environment."}
                    </p>
                    <Link
                      to={`/service/${encodeURIComponent(service.service_name)}`}
                      className="btn btn-secondary"
                      style={{ marginTop: 'auto', padding: '12px 30px', fontSize: '1.1rem' }}
                    >
                      Read more
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;
