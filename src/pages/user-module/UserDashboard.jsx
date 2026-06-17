import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, User, MapPin, Shield, Headphones, CreditCard, LogOut, Grid, Menu, X } from 'lucide-react';

import CustomerOverview from './CustomerOverview';
import CustomerBookings from './CustomerBookings';
import CustomerProfile from './CustomerProfile';
import CustomerSecurity from './CustomerSecurity';
import CustomerAddresses from './CustomerAddresses';
import CustomerPayments from './CustomerPayments';
import FifaLoader from '../../components/FifaLoader';

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') || 'overview';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  // Sync tab state when URL changes (if navigated via internal link)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [window.location.search]);

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/'; 
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <Grid size={20} /> },
    { id: 'bookings', label: 'My Bookings', icon: <Package size={20} /> },
    { id: 'security', label: 'Login & Security', icon: <Shield size={20} /> },
    { id: 'profile', label: 'My Profile', icon: <User size={20} /> },
    { id: 'addresses', label: 'My Addresses', icon: <MapPin size={20} /> },
    { id: 'payments', label: 'Payment Methods', icon: <CreditCard size={20} /> }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'overview': return <CustomerOverview onNavigate={setActiveTab} user={user} />;
      case 'bookings': return <CustomerBookings user={user} />;
      case 'profile': return <CustomerProfile user={user} />;
      case 'security': return <CustomerSecurity user={user} />;
      case 'addresses': return <CustomerAddresses user={user} />;
      case 'payments': return <CustomerPayments user={user} />;
      default: return <CustomerOverview onNavigate={setActiveTab} user={user} />;
    }
  };

  return (
    <>
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', backgroundColor: '#f8fafc' }}>
        
        {/* Mobile Sidebar Toggle */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100, backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(37,99,235,0.3)', cursor: 'pointer' }}
          className="hide-desktop"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar */}
        <div style={{ 
          width: '280px', 
          backgroundColor: 'white', 
          borderRight: '1px solid #e2e8f0', 
          display: 'flex', 
          flexDirection: 'column',
          position: window.innerWidth < 768 ? 'fixed' : 'relative',
          transform: window.innerWidth < 768 && !isSidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 0.3s ease',
          zIndex: 50,
          height: 'calc(100vh - 80px)', // adjust based on header height
          top: 0
        }}>
          <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid #f1f5f9' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a', fontWeight: 700 }}>My Account</h2>
            <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.875rem' }}>{user.full_name}</p>
          </div>

          <div style={{ padding: '1rem', flex: 1, overflowY: 'auto' }}>
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    width: '100%',
                    padding: '1rem',
                    marginBottom: '0.5rem',
                    backgroundColor: isActive ? '#eff6ff' : 'transparent',
                    color: isActive ? '#2563eb' : '#475569',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: isActive ? 600 : 500,
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                >
                  {item.icon}
                  {item.label}
                </button>
              )
            })}
          </div>

          <div style={{ padding: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
            <button
              onClick={handleLogout}
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', padding: '0.75rem', backgroundColor: 'transparent', color: '#ef4444', border: 'none', cursor: 'pointer', fontWeight: 500 }}
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {renderContent()}
          </div>
        </div>

      </div>
    </>
  );
};

export default UserDashboard;
