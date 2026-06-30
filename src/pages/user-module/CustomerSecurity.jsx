import React, { useState } from 'react';
import { Shield, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { apiCall } from '../../utils/api';

const CustomerSecurity = ({ user }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [focusedInput, setFocusedInput] = useState(null);

  const handleUpdatePassword = async () => {
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const userId = user.user_id || user.id;
      const result = await apiCall(`/users/${userId}`, 'PUT', { password_hash: password });
      
      if (result && !result.error) {
        setSuccess('Password updated successfully!');
        setPassword('');
        setConfirmPassword('');
      } else {
        throw new Error(result?.error || 'Failed to update password');
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
        <div style={{ width: '48px', height: '48px', borderRadius: '1rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}>
          <Shield size={24} color="white" />
        </div>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: '#0f172a' }}>Login & Security</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '1.05rem' }}>Update your password and secure your account.</p>
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
            <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#334155' }}>New Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              style={{ 
                padding: '1rem 1.25rem', 
                borderRadius: '0.75rem', 
                border: focusedInput === 'password' ? '2px solid #10b981' : '2px solid #e2e8f0', 
                backgroundColor: focusedInput === 'password' ? 'white' : '#f8fafc',
                fontSize: '1.05rem',
                color: '#0f172a',
                outline: 'none',
                transition: 'all 0.2s ease',
                boxShadow: focusedInput === 'password' ? '0 0 0 4px rgba(16, 185, 129, 0.1)' : 'none'
              }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#334155' }}>Confirm New Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setFocusedInput('confirm')}
              onBlur={() => setFocusedInput(null)}
              style={{ 
                padding: '1rem 1.25rem', 
                borderRadius: '0.75rem', 
                border: focusedInput === 'confirm' ? '2px solid #10b981' : '2px solid #e2e8f0', 
                backgroundColor: focusedInput === 'confirm' ? 'white' : '#f8fafc',
                fontSize: '1.05rem',
                color: '#0f172a',
                outline: 'none',
                transition: 'all 0.2s ease',
                boxShadow: focusedInput === 'confirm' ? '0 0 0 4px rgba(16, 185, 129, 0.1)' : 'none'
              }} 
            />
          </div>

          <button 
            onClick={handleUpdatePassword}
            disabled={loading || !password || !confirmPassword}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem', 
              background: (loading || !password || !confirmPassword) ? '#cbd5e1' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '2rem', 
              fontWeight: 700, 
              fontSize: '1.05rem',
              cursor: (loading || !password || !confirmPassword) ? 'not-allowed' : 'pointer', 
              alignSelf: 'flex-start', 
              marginTop: '1rem',
              transition: 'all 0.2s ease',
              boxShadow: (loading || !password || !confirmPassword) ? 'none' : '0 4px 15px rgba(16, 185, 129, 0.3)'
            }}
            onMouseOver={(e) => { 
              if (!loading && password && confirmPassword) {
                e.currentTarget.style.transform = 'translateY(-2px)'; 
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
              }
            }}
            onMouseOut={(e) => { 
              if (!loading && password && confirmPassword) {
                e.currentTarget.style.transform = 'translateY(0)'; 
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
              }
            }}
          >
            <Lock size={20} />
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSecurity;
