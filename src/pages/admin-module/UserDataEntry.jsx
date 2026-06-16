import React, { useState, useEffect } from 'react';
import { FiSave, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { apiCall } from '../../utils/api';

const UserDataEntry = ({ userId, onClose }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password_hash: '',
    role_id: '2', // Default to Customer (1=Admin, 2=Customer, 3=Employee)
    status: 'ACTIVE'
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!userId);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      const data = await apiCall(`/users/${userId}`);
      if (data && !data.error) {
        setFormData({
          full_name: data.full_name || '',
          email: data.email || '',
          phone: data.phone || '',
          password_hash: '', // Leave empty when editing to not overwrite unless provided
          role_id: data.role_id?.toString() || '2',
          status: data.status || 'ACTIVE'
        });
      } else {
        setError('Failed to fetch user details');
      }
    } catch (err) {
      setError(err.message || 'Error fetching user');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (!formData.full_name || !formData.phone) {
      setError('Full Name and Phone are required.');
      setLoading(false);
      return;
    }
    if (!userId && !formData.password_hash) {
      setError('Password is required for new users.');
      setLoading(false);
      return;
    }

    try {
      const payload = { ...formData };
      
      // Don't send empty password if editing
      if (userId && !payload.password_hash) {
        delete payload.password_hash;
      }

      let result;
      if (userId) {
        result = await apiCall(`/users/${userId}`, 'PUT', payload);
      } else {
        result = await apiCall('/users', 'POST', payload);
      }

      if (result && !result.error) {
        setSuccess(userId ? 'User updated successfully!' : 'User created successfully!');
        setTimeout(() => {
          onClose(); // Auto close after success
        }, 1500);
      } else {
        throw new Error(result?.error || 'Unknown error occurred');
      }
    } catch (err) {
      setError(err.message || 'Failed to save user');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '3rem', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        <p style={{ color: '#64748b' }}>Loading user details...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: '#0f172a', fontSize: '1.25rem', fontWeight: 600 }}>
          {userId ? 'Edit User' : 'Create New User'}
        </h2>
        <button 
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0.5rem', borderRadius: '0.5rem' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <FiX size={20} />
        </button>
      </div>

      <div style={{ padding: '2rem' }}>
        {error && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #f87171', color: '#b91c1c', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiAlertCircle /> {error}
          </div>
        )}
        
        {success && (
          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #4ade80', color: '#15803d', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiCheck /> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#334155', fontWeight: 500, fontSize: '0.875rem' }}>Full Name *</label>
            <input 
              type="text" 
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none', transition: 'border-color 0.2s' }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#334155', fontWeight: 500, fontSize: '0.875rem' }}>Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#334155', fontWeight: 500, fontSize: '0.875rem' }}>Phone *</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none' }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#334155', fontWeight: 500, fontSize: '0.875rem' }}>Role</label>
            <select 
              name="role_id"
              value={formData.role_id}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none', backgroundColor: 'white' }}
            >
              <option value="1">Admin</option>
              <option value="2">Customer</option>
              <option value="3">Employee</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#334155', fontWeight: 500, fontSize: '0.875rem' }}>Status</label>
            <select 
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none', backgroundColor: 'white' }}
            >
              <option value="ACTIVE">Active</option>
              <option value="BLOCKED">Blocked</option>
            </select>
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#334155', fontWeight: 500, fontSize: '0.875rem' }}>
              Password {userId ? '(Leave blank to keep current password)' : '*'}
            </label>
            <input 
              type="password" 
              name="password_hash"
              value={formData.password_hash}
              onChange={handleChange}
              placeholder="Enter password..."
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none' }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', marginTop: '1rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
            <button 
              type="button"
              onClick={onClose}
              style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', backgroundColor: 'white', color: '#475569', fontWeight: 500, cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', backgroundColor: '#2563eb', color: 'white', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
            >
              <FiSave /> {loading ? 'Saving...' : 'Save User'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UserDataEntry;
