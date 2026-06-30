import React, { useState } from 'react';
import { User, CheckCircle, AlertCircle, Save } from 'lucide-react';
import { apiCall } from '../../utils/api';

const CustomerProfile = ({ user }) => {
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [isFocused, setIsFocused] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const userId = user.user_id || user.id;
      const result = await apiCall(`/users/${userId}`, 'PUT', { full_name: fullName });
      
      if (result && !result.error) {
        setSuccess('Profile updated successfully!');
        // Update local storage so Header picks it up
        const updatedUser = { ...user, full_name: fullName };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Minor hack to force header re-render if it listens to window events
        window.dispatchEvent(new Event('storage'));
      } else {
        throw new Error(result?.error || 'Failed to update profile');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '1rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)' }}>
          <User size={24} color="white" />
        </div>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: '#0f172a' }}>My Profile</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '1.05rem' }}>Update your personal details here.</p>
        </div>
      </div>
      
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '1.5rem', border: '1px solid white', padding: '3rem', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {error && (
            <div style={{ padding: '1.25rem', backgroundColor: 'rgba(254, 226, 226, 0.5)', color: '#dc2626', borderRadius: '1rem', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}>
              <AlertCircle size={20} /> {error}
            </div>
          )}
          
          {success && (
            <div style={{ padding: '1.25rem', backgroundColor: 'rgba(209, 250, 229, 0.5)', color: '#059669', borderRadius: '1rem', border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}>
              <CheckCircle size={20} /> {success}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#334155' }}>Full Name</label>
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={{ 
                padding: '1rem 1.25rem', 
                borderRadius: '0.75rem', 
                border: isFocused ? '2px solid #8b5cf6' : '2px solid #e2e8f0', 
                backgroundColor: isFocused ? 'white' : '#f8fafc',
                fontSize: '1.05rem',
                color: '#0f172a',
                outline: 'none',
                transition: 'all 0.2s ease',
                boxShadow: isFocused ? '0 0 0 4px rgba(139, 92, 246, 0.1)' : 'none'
              }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#334155' }}>Email Address</label>
            <input 
              type="email" 
              defaultValue={user?.email} 
              disabled
              style={{ 
                padding: '1rem 1.25rem', 
                borderRadius: '0.75rem', 
                border: '2px solid #e2e8f0', 
                backgroundColor: '#f1f5f9', 
                color: '#94a3b8', 
                fontSize: '1.05rem',
                cursor: 'not-allowed'
              }} 
            />
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={14} /> Email cannot be changed directly. Contact support to update.
            </span>
          </div>

          <button 
            onClick={handleSave}
            disabled={loading || !fullName || fullName === user?.full_name}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem', 
              background: (loading || !fullName || fullName === user?.full_name) ? '#cbd5e1' : 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '2rem', 
              fontWeight: 700, 
              fontSize: '1.05rem',
              cursor: (loading || !fullName || fullName === user?.full_name) ? 'not-allowed' : 'pointer', 
              alignSelf: 'flex-start', 
              marginTop: '1rem',
              transition: 'all 0.2s ease',
              boxShadow: (loading || !fullName || fullName === user?.full_name) ? 'none' : '0 4px 15px rgba(139, 92, 246, 0.3)'
            }}
            onMouseOver={(e) => { 
              if (!loading && fullName && fullName !== user?.full_name) {
                e.currentTarget.style.transform = 'translateY(-2px)'; 
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)';
              }
            }}
            onMouseOut={(e) => { 
              if (!loading && fullName && fullName !== user?.full_name) {
                e.currentTarget.style.transform = 'translateY(0)'; 
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
              }
            }}
          >
            <Save size={20} />
            {loading ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
