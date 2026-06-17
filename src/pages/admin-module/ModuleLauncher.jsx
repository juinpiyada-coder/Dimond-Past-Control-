import React, { useState } from 'react';
import { FiGrid, FiFileText, FiUsers, FiSettings, FiBriefcase, FiImage, FiFile, FiUserCheck, FiTool, FiShield, FiStar, FiShare2, FiMail, FiCalendar } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ModuleLauncher = ({ setActiveTab, preferences, setPreferences }) => {
  
  const modules = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiGrid size={24} />, color: '#3b82f6', bg: '#eff6ff' },
    { id: 'bookings', label: 'Bookings', icon: <FiCalendar size={24} />, color: '#8b5cf6', bg: '#f5f3ff' },
    { id: 'employee_assignments', label: 'Assignments', icon: <FiBriefcase size={24} />, color: '#10b981', bg: '#ecfdf5' },
    { id: 'service_images', label: 'Service Images', icon: <FiImage size={24} />, color: '#f59e0b', bg: '#fffbeb' },
    { id: 'invoices', label: 'Invoices', icon: <FiFile size={24} />, color: '#6366f1', bg: '#e0e7ff' },
    { id: 'customers', label: 'Customers', icon: <FiUsers size={24} />, color: '#ec4899', bg: '#fdf2f8' },
    { id: 'users', label: 'System Users', icon: <FiSettings size={24} />, color: '#64748b', bg: '#f8fafc' },
    { id: 'employees', label: 'Employees', icon: <FiUserCheck size={24} />, color: '#14b8a6', bg: '#f0fdfa' },
    { id: 'services', label: 'Services', icon: <FiTool size={24} />, color: '#f43f5e', bg: '#fff1f2' },
    { id: 'pest_types', label: 'Pest Types', icon: <FiShield size={24} />, color: '#84cc16', bg: '#ecfccb' },
    { id: 'blogs', label: 'Blogs', icon: <FiFileText size={24} />, color: '#0ea5e9', bg: '#e0f2fe' },
    { id: 'mail_center', label: 'Mail Center', icon: <FiMail size={24} />, color: '#d946ef', bg: '#fdf4ff' },
    { id: 'reviews', label: 'Reviews', icon: <FiStar size={24} />, color: '#eab308', bg: '#fefce8' },
    { id: 'referrals', label: 'Referrals', icon: <FiShare2 size={24} />, color: '#06b6d4', bg: '#cffafe' },
    { id: 'roles', label: 'Access Roles', icon: <FiShield size={24} />, color: '#334155', bg: '#f1f5f9' },
    { id: 'menus', label: 'Menu Config', icon: <FiGrid size={24} />, color: '#8b5cf6', bg: '#f3e8ff' },
    { id: 'settings', label: 'Settings', icon: <FiSettings size={24} />, color: '#0f172a', bg: '#e2e8f0' },
  ];

  const handleToggle = (key) => {
    setPreferences(prev => {
      const next = { ...prev, [key]: !prev[key] };
      toast.info(`${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} ${next[key] ? 'Enabled' : 'Disabled'}`);
      return next;
    });
  };

  return (
    <div style={{ padding: '1rem' }}>
      
      {/* Quick Preferences Panel */}
      <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '2rem', marginBottom: '2.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <h2 style={{ margin: '0 0 1.5rem 0', color: '#0f172a', fontSize: '1.25rem' }}>System Preferences & Diagnostics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '1rem', borderRadius: '0.75rem', backgroundColor: preferences.testMode ? '#fefce8' : '#f8fafc', border: `1px solid ${preferences.testMode ? '#fef08a' : '#e2e8f0'}`, transition: 'all 0.2s' }}>
            <input type="checkbox" checked={preferences.testMode} onChange={() => handleToggle('testMode')} style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }} />
            <div>
              <div style={{ fontWeight: 600, color: '#0f172a' }}>Enable Test Mode</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Simulate API responses</div>
            </div>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '1rem', borderRadius: '0.75rem', backgroundColor: preferences.fullLoader ? '#eff6ff' : '#f8fafc', border: `1px solid ${preferences.fullLoader ? '#bfdbfe' : '#e2e8f0'}`, transition: 'all 0.2s' }}>
            <input type="checkbox" checked={preferences.fullLoader} onChange={() => handleToggle('fullLoader')} style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }} />
            <div>
              <div style={{ fontWeight: 600, color: '#0f172a' }}>Full Screen Loader</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Show loader on entire screen</div>
            </div>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '1rem', borderRadius: '0.75rem', backgroundColor: preferences.showHeader ? '#f0fdf4' : '#fef2f2', border: `1px solid ${preferences.showHeader ? '#bbf7d0' : '#fecaca'}`, transition: 'all 0.2s' }}>
            <input type="checkbox" checked={preferences.showHeader} onChange={() => handleToggle('showHeader')} style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }} />
            <div>
              <div style={{ fontWeight: 600, color: '#0f172a' }}>Header Menu</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Toggle top header visibility</div>
            </div>
          </label>

        </div>
      </div>

      {/* Modules App Drawer */}
      <div>
        <h2 style={{ margin: '0 0 1.5rem 0', color: '#0f172a', fontSize: '1.5rem' }}>All Modules Launcher</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveTab(mod.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                padding: '2rem 1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '1rem',
                backgroundColor: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = mod.color;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <div style={{ width: '56px', height: '56px', borderRadius: '1rem', backgroundColor: mod.bg, color: mod.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {mod.icon}
              </div>
              <span style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.95rem' }}>{mod.label}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ModuleLauncher;
