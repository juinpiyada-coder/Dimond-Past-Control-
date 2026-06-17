import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import { FiSave, FiSettings, FiGlobe, FiBell, FiShield, FiDatabase } from 'react-icons/fi';
import { toast } from 'react-toastify';

const SettingsModule = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Settings Form State
  const [formData, setFormData] = useState({
    companyName: 'Diamond Pest Control',
    supportEmail: 'support@diamondpest.com',
    supportPhone: '+91 9000000000',
    address: '123 Business Avenue, Tech Hub, 400001',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    enableNotifications: true,
    enableAutoAssign: false,
    maintenanceMode: false,
    backupFrequency: 'daily'
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await apiCall('/settings');
      if (data) {
        setFormData(prev => ({
          ...prev,
          ...data,
          enableNotifications: data.enableNotifications === 'true',
          enableAutoAssign: data.enableAutoAssign === 'true',
          maintenanceMode: data.maintenanceMode === 'true',
          enable_fifa_loader: data.enable_fifa_loader === 'true'
        }));
      }
    } catch (err) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
      ...formData,
      enableNotifications: formData.enableNotifications ? 'true' : 'false',
      enableAutoAssign: formData.enableAutoAssign ? 'true' : 'false',
      maintenanceMode: formData.maintenanceMode ? 'true' : 'false',
      enable_fifa_loader: formData.enable_fifa_loader ? 'true' : 'false'
    };

    try {
      await apiCall('/settings', 'PUT', payload);
      toast.success('System settings updated successfully!');
    } catch (err) {
      toast.error('Failed to save settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputStyles = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #cbd5e1',
    outline: 'none',
    fontSize: '0.95rem',
    color: '#0f172a',
    backgroundColor: '#f8fafc',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const labelStyles = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#475569',
    marginBottom: '0.5rem'
  };

  const sectionHeaderStyles = {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: '1.5rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
        Loading system settings...
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', minHeight: '600px' }}>
      
      {/* Settings Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#f8fafc', borderRight: '1px solid #e2e8f0', padding: '2rem 1rem' }}>
        <h3 style={{ margin: '0 0 1.5rem 1rem', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Settings Menu</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <button
            onClick={() => setActiveTab('general')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', width: '100%', border: 'none', background: activeTab === 'general' ? '#eff6ff' : 'transparent', color: activeTab === 'general' ? '#2563eb' : '#475569', fontWeight: activeTab === 'general' ? 600 : 500, borderRadius: '0.5rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
          >
            <FiSettings size={18} /> General Settings
          </button>
          
          <button
            onClick={() => setActiveTab('regional')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', width: '100%', border: 'none', background: activeTab === 'regional' ? '#eff6ff' : 'transparent', color: activeTab === 'regional' ? '#2563eb' : '#475569', fontWeight: activeTab === 'regional' ? 600 : 500, borderRadius: '0.5rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
          >
            <FiGlobe size={18} /> Regional & Localization
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', width: '100%', border: 'none', background: activeTab === 'notifications' ? '#eff6ff' : 'transparent', color: activeTab === 'notifications' ? '#2563eb' : '#475569', fontWeight: activeTab === 'notifications' ? 600 : 500, borderRadius: '0.5rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
          >
            <FiBell size={18} /> Alerts & Notifications
          </button>

          <button
            onClick={() => setActiveTab('system')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', width: '100%', border: 'none', background: activeTab === 'system' ? '#eff6ff' : 'transparent', color: activeTab === 'system' ? '#2563eb' : '#475569', fontWeight: activeTab === 'system' ? 600 : 500, borderRadius: '0.5rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
          >
            <FiDatabase size={18} /> System & Data
          </button>
        </div>
      </div>

      {/* Settings Content */}
      <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        <form onSubmit={handleSave}>
          
          {activeTab === 'general' && (
            <div>
              <h2 style={sectionHeaderStyles}><FiSettings color="#2563eb" /> General Configuration</h2>
              <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '600px' }}>
                <div>
                  <label style={labelStyles}>Company Name</label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} style={inputStyles} />
                </div>
                <div>
                  <label style={labelStyles}>Support Email Address</label>
                  <input type="email" name="supportEmail" value={formData.supportEmail} onChange={handleChange} style={inputStyles} />
                </div>
                <div>
                  <label style={labelStyles}>Support Phone Number</label>
                  <input type="text" name="supportPhone" value={formData.supportPhone} onChange={handleChange} style={inputStyles} />
                </div>
                <div>
                  <label style={labelStyles}>Headquarters Address</label>
                  <textarea name="address" value={formData.address} onChange={handleChange} style={{...inputStyles, minHeight: '100px', resize: 'vertical'}} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'regional' && (
            <div>
              <h2 style={sectionHeaderStyles}><FiGlobe color="#2563eb" /> Regional Preferences</h2>
              <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '600px' }}>
                <div>
                  <label style={labelStyles}>System Timezone</label>
                  <select name="timezone" value={formData.timezone} onChange={handleChange} style={{...inputStyles, appearance: 'none'}}>
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="UTC">UTC (Universal Coordinated Time)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyles}>Base Currency</label>
                  <select name="currency" value={formData.currency} onChange={handleChange} style={{...inputStyles, appearance: 'none'}}>
                    <option value="INR">INR (₹) - Indian Rupee</option>
                    <option value="USD">USD ($) - US Dollar</option>
                    <option value="EUR">EUR (€) - Euro</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 style={sectionHeaderStyles}><FiBell color="#2563eb" /> Notification Rules</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '600px' }}>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '0.75rem', backgroundColor: formData.enableNotifications ? '#f0fdf4' : 'white' }}>
                  <input type="checkbox" name="enableNotifications" checked={formData.enableNotifications} onChange={handleChange} style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }} />
                  <div>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>Global System Notifications</div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Send email and SMS alerts for new bookings and cancellations.</div>
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '0.75rem', backgroundColor: formData.enableAutoAssign ? '#eff6ff' : 'white' }}>
                  <input type="checkbox" name="enableAutoAssign" checked={formData.enableAutoAssign} onChange={handleChange} style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }} />
                  <div>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>Auto-Assign Technicians</div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Automatically route new bookings to available technicians.</div>
                  </div>
                </label>

              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div>
              <h2 style={sectionHeaderStyles}><FiDatabase color="#2563eb" /> System Operations</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '1rem', border: '1px solid #fecaca', borderRadius: '0.75rem', backgroundColor: formData.maintenanceMode ? '#fef2f2' : 'white' }}>
                  <input type="checkbox" name="maintenanceMode" checked={formData.maintenanceMode} onChange={handleChange} style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }} />
                  <div>
                    <div style={{ fontWeight: 600, color: '#991b1b' }}>Enable Maintenance Mode</div>
                    <div style={{ fontSize: '0.875rem', color: '#b91c1c' }}>Suspends customer access to the portal for upgrades. Admins only.</div>
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '1rem', border: '1px solid #bfdbfe', borderRadius: '0.75rem', backgroundColor: formData.enable_fifa_loader ? '#eff6ff' : 'white' }}>
                  <input type="checkbox" name="enable_fifa_loader" checked={formData.enable_fifa_loader} onChange={handleChange} style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }} />
                  <div>
                    <div style={{ fontWeight: 600, color: '#1e3a8a' }}>Enable Global FIFA Loader</div>
                    <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>Replaces the default router loading screen with the custom animated FifaLoader.</div>
                  </div>
                </label>

                <div>
                  <label style={labelStyles}>Automated Backup Frequency</label>
                  <select name="backupFrequency" value={formData.backupFrequency} onChange={handleChange} style={{...inputStyles, appearance: 'none'}}>
                    <option value="hourly">Hourly Backups</option>
                    <option value="daily">Daily Backups</option>
                    <option value="weekly">Weekly Backups</option>
                  </select>
                </div>

              </div>
            </div>
          )}

          <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-start' }}>
            <button 
              type="submit" 
              disabled={saving}
              style={{ padding: '0.75rem 2rem', border: 'none', backgroundColor: '#0f172a', color: 'white', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background-color 0.2s', opacity: saving ? 0.7 : 1 }}
              onMouseOver={(e) => { if(!saving) e.currentTarget.style.backgroundColor = '#1e293b'; }}
              onMouseOut={(e) => { if(!saving) e.currentTarget.style.backgroundColor = '#0f172a'; }}
            >
              {saving ? 'Saving Changes...' : <><FiSave /> Save Configuration</>}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default SettingsModule;
