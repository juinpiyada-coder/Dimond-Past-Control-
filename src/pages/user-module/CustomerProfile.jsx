import React, { useState } from 'react';
import { User, CheckCircle, AlertCircle } from 'lucide-react';
import { apiCall } from '../../utils/api';

const CustomerProfile = ({ user }) => {
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <User size={32} color="#2563eb" />
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>My Profile</h1>
      </div>
      
      <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e2e8f0', padding: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '500px' }}>
          
          {error && (
            <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '0.5rem', border: '1px solid #fca5a5', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={18} /> {error}
            </div>
          )}
          
          {success && (
            <div style={{ padding: '1rem', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '0.5rem', border: '1px solid #86efac', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={18} /> {success}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Full Name</label>
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', fontSize: '1rem' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Email Address</label>
            <input 
              type="email" 
              defaultValue={user?.email} 
              disabled
              style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', color: '#94a3b8', fontSize: '1rem' }} 
            />
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Email cannot be changed directly. Contact support to update.</span>
          </div>

          <button 
            onClick={handleSave}
            disabled={loading || !fullName}
            style={{ 
              padding: '0.75rem 1.5rem', 
              backgroundColor: loading ? '#93c5fd' : '#2563eb', 
              color: 'white', 
              border: 'none', 
              borderRadius: '0.5rem', 
              fontWeight: 600, 
              cursor: loading ? 'not-allowed' : 'pointer', 
              alignSelf: 'flex-start', 
              marginTop: '1rem' 
            }}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
