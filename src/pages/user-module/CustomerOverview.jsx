import React from 'react';
import { Package, User, MapPin, Shield, Headphones, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerOverview = ({ onNavigate, user }) => {
  const cards = [
    { id: 'bookings', title: 'Your Bookings', description: 'Track, view, or manage your service bookings', icon: <Package size={32} color="#2563eb" /> },
    { id: 'security', title: 'Login & Security', description: 'Edit login, name, and mobile number', icon: <Shield size={32} color="#2563eb" /> },
    { id: 'profile', title: 'Your Profile', description: 'Manage your personal details', icon: <User size={32} color="#2563eb" /> },
    { id: 'addresses', title: 'Your Addresses', description: 'Edit addresses for services', icon: <MapPin size={32} color="#2563eb" /> },
    { id: 'payments', title: 'Payment Methods', description: 'Manage payment options', icon: <CreditCard size={32} color="#2563eb" /> },
    { id: 'contact', title: 'Contact Us', description: 'Get support for your pest issues', icon: <Headphones size={32} color="#2563eb" />, link: '/contact' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', marginBottom: '2rem' }}>Overview</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {cards.map((card, index) => {
          
          const CardContent = (
            <div 
              style={{ 
                display: 'flex', 
                gap: '1rem', 
                padding: '1.5rem', 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0', 
                borderRadius: '0.5rem', 
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
              onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
              onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
            >
              <div style={{ padding: '0.5rem' }}>{card.icon}</div>
              <div>
                <h2 style={{ margin: '0 0 0.25rem 0', fontSize: '1.125rem', color: '#0f172a', fontWeight: 600 }}>{card.title}</h2>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>{card.description}</p>
              </div>
            </div>
          );

          if (card.link) {
            return <Link to={card.link} key={index} style={{ textDecoration: 'none' }}>{CardContent}</Link>;
          }

          return (
            <div key={index} onClick={() => onNavigate(card.id)}>
              {CardContent}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default CustomerOverview;
