import React, { useState } from 'react';
import { apiCall } from '../utils/api';
import { toast } from 'react-toastify';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    inquiry: ''
  });
  const [loading, setLoading] = useState(false);

  const services = [
    'Cockroach Control',
    'Termite Control',
    'Bed Bugs Control',
    'Rodent Control',
    'Mosquito Control',
    'Ant Control',
    'Wood Borer Control',
    'Other / General Inquiry'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.inquiry) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await apiCall('/contact', 'POST', formData);
      if (response && response.message) {
        toast.success(response.message);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          inquiry: ''
        });
      } else {
        toast.error(response?.error || 'Failed to send inquiry.');
      }
    } catch (error) {
      toast.error('An error occurred while sending your inquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light pb-12" style={{ paddingBottom: '60px' }}>
      {/* Header Banner */}
      <div 
        className="contact-banner" 
        style={{ 
          background: 'linear-gradient(rgba(42, 50, 159, 0.85), rgba(42, 50, 159, 0.95)), url("https://images.unsplash.com/photo-1584824388190-2e401b229ba0?q=80&w=1200&auto=format&fit=crop") center/cover', 
          padding: '80px 20px', 
          textAlign: 'center', 
          color: 'white', 
          marginBottom: '60px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '15px', fontWeight: '800' }}>Contact Us</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
          Kindly take a moment to fill in the form so that we can provide you with the best possible solution.
        </p>
      </div>

      <div className="container">
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '50px' }}>
          
          {/* Left Column: Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="contact-details-box"
            style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: 'var(--shadow-md)', borderTop: '4px solid var(--primary)' }}
          >
            <h2 style={{ marginBottom: '30px', color: 'var(--secondary)' }}>Get In Touch</h2>
            
            <div style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(42, 50, 159, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
                <MapPin size={20} />
              </div>
              <div>
                <h4 style={{ marginBottom: '5px', color: 'var(--text-dark)' }}>Visit Us</h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  Diamond Pest Control<br/>
                  23/1 Bikramgarh<br/>
                  Kolkata 700032
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(42, 50, 159, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
                <Mail size={20} />
              </div>
              <div>
                <h4 style={{ marginBottom: '5px', color: 'var(--text-dark)' }}>Email Us</h4>
                <p style={{ color: 'var(--text-muted)' }}>diamondpestcontrol3@gmail.com</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(42, 50, 159, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
                <Phone size={20} />
              </div>
              <div>
                <h4 style={{ marginBottom: '5px', color: 'var(--text-dark)' }}>Helpline</h4>
                <p style={{ color: 'var(--text-muted)' }}>+91 90519 31617 / 9836868444</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(42, 50, 159, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
                <MessageCircle size={20} />
              </div>
              <div>
                <h4 style={{ marginBottom: '5px', color: 'var(--text-dark)' }}>WhatsApp Us</h4>
                <p style={{ color: 'var(--text-muted)' }}>+91 90519 31617</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="contact-form-box"
            style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}
          >
            <h2 style={{ marginBottom: '25px', color: 'var(--secondary)' }}>Send us an Inquiry</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-dark)' }}>Your name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-dark)' }}>Your email *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-dark)' }}>Your phone *</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-dark)' }}>Select Service</label>
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="form-control"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="">Select a service...</option>
                  {services.map((srv, idx) => (
                    <option key={idx} value={srv}>{srv}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--text-dark)' }}>Inquiry... *</label>
                <textarea 
                  name="inquiry"
                  value={formData.inquiry}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                  placeholder="How can we help you?"
                  required
                  style={{ resize: 'vertical' }}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading}
                style={{ marginTop: '10px', width: '100%', padding: '15px', fontSize: '1.1rem' }}
              >
                {loading ? 'Sending...' : 'Submit via Gmail'}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
