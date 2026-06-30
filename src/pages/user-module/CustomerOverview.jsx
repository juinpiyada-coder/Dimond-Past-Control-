import React from 'react';
import { Package, User, MapPin, Shield, Headphones, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerOverview = ({ onNavigate, user }) => {
  const cards = [
    { id: 'bookings', title: 'Your Bookings', description: 'Track, view, or manage your service bookings', icon: <Package size={28} color="white" />, gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
    { id: 'security', title: 'Login & Security', description: 'Edit login, name, and mobile number', icon: <Shield size={28} color="white" />, gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
    { id: 'profile', title: 'Your Profile', description: 'Manage your personal details', icon: <User size={28} color="white" />, gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' },
    { id: 'addresses', title: 'Your Addresses', description: 'Edit addresses for services', icon: <MapPin size={28} color="white" />, gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
    { id: 'payments', title: 'Payment Methods', description: 'Manage payment options', icon: <CreditCard size={28} color="white" />, gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' },
    { id: 'contact', title: 'Contact Us', description: 'Get support for your pest issues', icon: <Headphones size={28} color="white" />, gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)', link: '/contact' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '3rem', position: 'relative' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Welcome back, {user?.full_name?.split(' ')[0] || 'User'}!</h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>Manage your account settings and track your services.</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {cards.map((card, index) => {
          
          const CardContent = (
            <div 
              style={{ 
                display: 'flex', 
                flexDirection: 'column',
                padding: '2rem', 
                backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,1)', 
                borderRadius: '1.25rem', 
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01)',
                height: '100%'
              }}
              onMouseOver={(e) => { 
                e.currentTarget.style.transform = 'translateY(-6px)'; 
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'; 
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)';
              }}
              onMouseOut={(e) => { 
                e.currentTarget.style.transform = 'translateY(0)'; 
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01)'; 
                e.currentTarget.style.borderColor = 'rgba(255,255,255,1)';
              }}
            >
              <div style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: '1rem', 
                background: card.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                {card.icon}
              </div>
              <div>
                <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: '#0f172a', fontWeight: 700 }}>{card.title}</h2>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>{card.description}</p>
              </div>
            </div>
          );

          if (card.link) {
            return <Link to={card.link} key={index} style={{ textDecoration: 'none' }}>{CardContent}</Link>;
          }

          return (
            <div key={index} onClick={() => onNavigate(card.id)} style={{ height: '100%' }}>
              {CardContent}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerOverview;
