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
<<<<<<< HEAD
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] relative" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
=======
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] bg-slate-50 relative">
>>>>>>> e45c416b136895de83fc4dbc9e1eabb2ebde712c
        
        {/* Mobile Sidebar Toggle */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
<<<<<<< HEAD
          className="md:hidden fixed bottom-6 right-6 z-50 text-white border-none rounded-full w-14 h-14 flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.2)] cursor-pointer hover:scale-105 transition-transform"
          style={{ background: 'linear-gradient(135deg, #2A329F 0%, #1e2475 100%)' }}
=======
          className="md:hidden fixed bottom-6 right-6 z-50 bg-blue-600 text-white border-none rounded-full w-14 h-14 flex items-center justify-center shadow-lg cursor-pointer"
>>>>>>> e45c416b136895de83fc4dbc9e1eabb2ebde712c
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar */}
<<<<<<< HEAD
        <div className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''} shadow-[4px_0_24px_rgba(0,0,0,0.04)] md:shadow-none w-[280px] shrink-0 flex flex-col z-40 transition-transform duration-300 ${isSidebarOpen ? 'fixed inset-y-0 left-0 translate-x-0' : 'fixed inset-y-0 -translate-x-full md:static md:translate-x-0'}`} style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', borderRight: '1px solid rgba(255, 255, 255, 0.4)' }}>
          <div className="p-6 md:p-8 flex justify-between items-center" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
            <div>
              <h2 className="m-0 text-2xl font-extrabold" style={{ background: 'linear-gradient(135deg, #2A329F 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>My Account</h2>
              <p className="m-1 mt-1 text-slate-500 text-sm font-medium">{user.full_name}</p>
            </div>
            {isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-slate-400 hover:text-slate-700 border-none bg-transparent transition-colors">
=======
        <div className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''} bg-white shadow-md md:shadow-none w-[280px] shrink-0 flex flex-col md:border-r border-slate-100 z-40 transition-transform duration-300 ${isSidebarOpen ? 'fixed inset-y-0 left-0 translate-x-0' : 'fixed inset-y-0 -translate-x-full md:static md:translate-x-0'}`}>
          <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h2 className="m-0 text-xl text-slate-900 font-bold">My Account</h2>
              <p className="m-1 mt-0 text-slate-500 text-sm">{user.full_name}</p>
            </div>
            {isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-slate-500 hover:text-slate-800 border-none bg-transparent">
>>>>>>> e45c416b136895de83fc4dbc9e1eabb2ebde712c
                <X size={20} />
              </button>
            )}
          </div>

<<<<<<< HEAD
          <div className="p-4 flex-1 overflow-y-auto space-y-2 mt-4">
=======
          <div className="p-4 flex-1 overflow-y-auto space-y-2">
>>>>>>> e45c416b136895de83fc4dbc9e1eabb2ebde712c
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
<<<<<<< HEAD
                  className={`flex items-center gap-3 w-full px-5 py-3.5 rounded-xl cursor-pointer transition-all duration-300 text-left border-none ${isActive ? 'font-bold shadow-[0_4px_20px_rgba(42,50,159,0.15)]' : 'bg-transparent text-slate-600 font-medium hover:bg-white/60 hover:shadow-[0_2px_10px_rgba(0,0,0,0.02)]'}`}
                  style={{
                    background: isActive ? 'linear-gradient(135deg, #2A329F 0%, #3b82f6 100%)' : '',
                    color: isActive ? 'white' : '',
                    transform: isActive ? 'translateX(4px)' : 'translateX(0)'
                  }}
=======
                  className={`flex items-center gap-3 w-full p-4 rounded-lg cursor-pointer transition-all duration-200 text-left border-none ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'bg-transparent text-slate-600 font-medium hover:bg-slate-50'}`}
>>>>>>> e45c416b136895de83fc4dbc9e1eabb2ebde712c
                >
                  {item.icon}
                  {item.label}
                </button>
              )
            })}
          </div>

<<<<<<< HEAD
          <div className="p-6" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-3 w-full p-3.5 bg-white text-red-500 border border-red-100 cursor-pointer font-bold hover:bg-red-50 rounded-xl transition-all shadow-[0_2px_10px_rgba(239,68,68,0.1)] hover:shadow-[0_4px_15px_rgba(239,68,68,0.2)]"
=======
          <div className="p-6 border-t border-slate-100">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-3 bg-transparent text-red-500 border-none cursor-pointer font-medium hover:bg-red-50 rounded-lg transition-colors"
>>>>>>> e45c416b136895de83fc4dbc9e1eabb2ebde712c
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
<<<<<<< HEAD
            className="fixed inset-0 bg-slate-900/40 z-30 md:hidden backdrop-blur-sm transition-opacity"
=======
            className="fixed inset-0 bg-slate-900/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
>>>>>>> e45c416b136895de83fc4dbc9e1eabb2ebde712c
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
<<<<<<< HEAD
        <div className="flex-1 p-4 md:p-8 overflow-y-auto w-full overflow-x-hidden" style={{ background: 'transparent' }}>
          <div className="max-w-5xl mx-auto mt-4">
=======
        <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-slate-50 w-full overflow-x-hidden">
          <div className="max-w-5xl mx-auto">
>>>>>>> e45c416b136895de83fc4dbc9e1eabb2ebde712c
            {renderContent()}
          </div>
        </div>

      </div>
    </>
  );
};

export default UserDashboard;
