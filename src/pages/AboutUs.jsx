import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, Award, Users, BookOpen, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const trainingItems = [
    { name: 'University Agriculture of Kalyani', image: '/about-us/kalyani-univercity.png' },
    { name: 'University Agriculture of Bidhan Chandra', image: '/about-us/University AgricultureofBidhanChandraBiswawar-univercity.png' },
    { name: 'University Agriculture of New Delhi', image: '/about-us/University Agriculture of New Delhi.png' },
    { name: 'FSSAI', image: '/Clients/fssai.png' }
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % trainingItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [trainingItems.length]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % trainingItems.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + trainingItems.length) % trainingItems.length);

  return (
    <div className="page" style={{ padding: '4rem 0', backgroundColor: '#f8fafc' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="section-title" style={{ fontSize: '2.5rem', color: '#0f172a', fontWeight: '800', marginBottom: '1rem' }}>About Us</h1>
          <h2 style={{ fontSize: '1.5rem', color: '#2563eb', fontWeight: '600' }}>Your Trusted Pest Control Partner</h2>
        </div>

        {/* Introduction */}
        <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', marginBottom: '3rem' }}>
          <p style={{ fontSize: '1.125rem', color: '#475569', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Welcome to our pest control company, your reliable partner for safe, effective, and affordable pest management solutions. With years of industry experience, we specialize in protecting homes, offices, restaurants, warehouses, and commercial properties from harmful pests and infestations.
          </p>
          <div style={{ padding: '1.5rem', backgroundColor: '#eff6ff', borderLeft: '4px solid #2563eb', borderRadius: '0.5rem' }}>
            <p style={{ margin: 0, fontSize: '1.125rem', color: '#1e3a8a', fontWeight: '500', fontStyle: 'italic' }}>
              "Our mission is simple — to provide high-quality pest control services that ensure a clean, healthy, and pest-free environment for every customer."
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div style={{ marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: '700', marginBottom: '2rem', textAlign: 'center' }}>Why Choose Us?</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              { text: 'Experienced & Trained Technicians', icon: <Users size={24} color="#16a34a" /> },
              { text: 'Safe & Eco-Friendly Chemicals', icon: <Shield size={24} color="#16a34a" /> },
              { text: 'Affordable Pricing', icon: <Award size={24} color="#16a34a" /> },
              { text: 'Fast Response & On-Time Service', icon: <CheckCircle size={24} color="#16a34a" /> },
              { text: 'Advanced Pest Control Methods', icon: <BookOpen size={24} color="#16a34a" /> },
              { text: '100% Customer Satisfaction Focus', icon: <Star size={24} color="#16a34a" /> }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ padding: '0.75rem', backgroundColor: '#dcfce7', borderRadius: '50%' }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: '1.125rem', fontWeight: '600', color: '#334155' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Promise */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '0 1rem' }}>
          <p style={{ fontSize: '1.125rem', color: '#475569', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            We believe in building long-term trust with our clients through honest service, professional behavior, and effective pest control results. Our team continuously works to maintain a clean, healthy, and pest-free environment for every customer.
          </p>
          <p style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: '600' }}>
            If you are looking for reliable pest control services in Kolkata, choose <span style={{ color: '#2563eb' }}>Diamond Pest Control</span> for professional protection and peace of mind.
          </p>
        </div>

        {/* Training Sources Carousel */}
        <div style={{ marginTop: '5rem' }}>
          <h3 style={{ fontSize: '2.5rem', color: '#0f172a', fontWeight: '800', marginBottom: '3rem', textAlign: 'center' }}>Our Certifications & Training</h3>
          <div style={{ position: 'relative', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', maxWidth: '800px', margin: '0 auto' }}>
            <button onClick={handlePrev} style={{ position: 'absolute', left: 10, zIndex: 20, background: 'white', border: 'none', borderRadius: '50%', padding: '0.75rem', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              <ChevronLeft size={28} color="#2563eb" />
            </button>
            
            {trainingItems.map((item, index) => {
              let offset = index - activeIndex;
              if (offset > 2) offset -= 4;
              else if (offset < -1) offset += 4;
              
              return (
                <motion.div
                  key={index}
                  animate={{
                    x: offset * 240,
                    scale: offset === 0 ? 1 : (offset === 2 ? 0.6 : 0.8),
                    opacity: offset === 0 ? 1 : (offset === 2 ? 0 : 0.5),
                    zIndex: offset === 0 ? 10 : (offset === 2 ? 1 : 5)
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    position: 'absolute',
                    width: '320px',
                    height: '300px',
                    backgroundColor: 'white',
                    borderRadius: '1.5rem',
                    boxShadow: offset === 0 ? '0 25px 50px -12px rgba(37,99,235,0.25)' : '0 4px 6px -1px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    cursor: 'pointer',
                    border: offset === 0 ? '2px solid #2563eb' : '1px solid #e2e8f0'
                  }}
                >
                  <img src={item.image} alt={item.name} style={{ maxHeight: '140px', maxWidth: '100%', marginBottom: '1.5rem', objectFit: 'contain' }} />
                  <h4 style={{ fontSize: '1.1rem', color: '#1e293b', fontWeight: '700', textAlign: 'center', lineHeight: '1.4' }}>{item.name}</h4>
                </motion.div>
              );
            })}
            
            <button onClick={handleNext} style={{ position: 'absolute', right: 10, zIndex: 20, background: 'white', border: 'none', borderRadius: '50%', padding: '0.75rem', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              <ChevronRight size={28} color="#2563eb" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
