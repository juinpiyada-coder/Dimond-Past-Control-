import React from 'react';
import { Shield, CheckCircle, Award, Users, BookOpen, Star } from 'lucide-react';

const AboutUs = () => {
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

        {/* Training Sources */}
        <div>
          <h3 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: '700', marginBottom: '2rem', textAlign: 'center' }}>Our Training Sources</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
              <h4 style={{ fontSize: '1.125rem', color: '#1e293b', fontWeight: '600' }}>University Agriculture of Kalyani</h4>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
              <h4 style={{ fontSize: '1.125rem', color: '#1e293b', fontWeight: '600' }}>University Agriculture of Bidhan Chandra Biswawar</h4>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌟</div>
              <h4 style={{ fontSize: '1.125rem', color: '#1e293b', fontWeight: '600' }}>University Agriculture of New Delhi</h4>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
