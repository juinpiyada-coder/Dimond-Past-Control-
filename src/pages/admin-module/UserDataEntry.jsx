import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import { FiSave, FiX, FiUser, FiMail, FiPhone, FiLock, FiShield, FiActivity, FiImage } from 'react-icons/fi';
import { toast } from 'react-toastify';

const UserDataEntry = ({ userId, onClose }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password_hash: '',
    role_id: '2', // Default to Customer
    status: 'ACTIVE',
    profile_image: ''
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!userId);

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
          password_hash: '', // Keep empty
          password_hash: '', // Keep empty
          role_id: data.role_id?.toString() || '2',
          status: data.status || 'ACTIVE',
          profile_image: data.profile_image || ''
        });
      } else {
        toast.error('Failed to fetch user details');
      }
    } catch (err) {
      toast.error(err.message || 'Error fetching user');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profile_image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setFormData(prev => ({ ...prev, profile_image: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { ...formData };
      if (userId && !payload.password_hash) {
        delete payload.password_hash;
      }

      if (userId) {
        await apiCall(`/users/${userId}`, 'PUT', payload);
        toast.success('User profile updated successfully!');
      } else {
        await apiCall('/users', 'POST', payload);
        toast.success('New user provisioned successfully!');
      }
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to save user profile.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    borderRadius: '0.5rem',
    border: '1px solid #cbd5e1',
    outline: 'none',
    fontSize: '0.95rem',
    color: '#0f172a',
    backgroundColor: '#f8fafc',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const iconStyles = {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94a3b8'
  };

  const labelStyles = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#475569',
    marginBottom: '0.5rem'
  };

  if (fetching) {
    return <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Loading user details...</div>;
  }

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
      
      {/* Header */}
      <div style={{ padding: '1.5rem 2rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, color: '#0f172a', fontSize: '1.5rem', fontWeight: 700 }}>
            {userId ? 'Edit User Identity' : 'Provision New User'}
          </h2>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.875rem' }}>
            {userId ? 'Modify access levels and contact details.' : 'Create a new customer or administrative account.'}
          </p>
        </div>
        <button 
          onClick={onClose}
          style={{ background: 'white', border: '1px solid #cbd5e1', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer', color: '#64748b', transition: 'all 0.2s' }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#fef2f2'; e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = '#fecaca'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
        
        {/* Section 1: Contact Identity */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiUser color="#2563eb" /> Primary Identity
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            
            <div>
              <label style={labelStyles}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <FiUser style={iconStyles} />
                <input 
                  type="text" 
                  name="full_name"
                  placeholder="John Doe"
                  value={formData.full_name}
                  onChange={handleChange}
                  style={inputStyles}
                  required
                />
              </div>
            </div>

            <div>
              <label style={labelStyles}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <FiMail style={iconStyles} />
                <input 
                  type="email" 
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyles}
                />
              </div>
            </div>

            <div>
              <label style={labelStyles}>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <FiPhone style={iconStyles} />
                <input 
                  type="text" 
                  name="phone"
                  placeholder="+91..."
                  value={formData.phone}
                  onChange={handleChange}
                  style={inputStyles}
                  required
                />
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyles}>Profile Image</label>
              <div style={{ position: 'relative', display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.5rem', border: '2px dashed #cbd5e1', borderRadius: '0.75rem', backgroundColor: '#f8fafc', transition: 'border-color 0.2s' }}>
                <div style={{ flex: 1 }}>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    id="profile_image_upload"
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="profile_image_upload" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#e2e8f0', color: '#334155', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem', transition: 'background-color 0.2s' }}>
                    <FiImage /> Choose Image
                  </label>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: '#64748b' }}>Max file size: 2MB. Format: JPG, PNG, WebP.</p>
                </div>
                {formData.profile_image && (
                  <div style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '0.5rem', overflow: 'hidden', border: '2px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                    <img src={formData.profile_image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button type="button" onClick={handleClearImage} style={{ position: 'absolute', top: '4px', right: '4px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <FiX size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '2rem 0' }}></div>

        {/* Section 2: Security & Access */}
        <div>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiShield color="#2563eb" /> Security & Access
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            
            <div>
              <label style={labelStyles}>System Role</label>
              <div style={{ position: 'relative' }}>
                <FiShield style={iconStyles} />
                <select 
                  name="role_id"
                  value={formData.role_id}
                  onChange={handleChange}
                  style={{...inputStyles, appearance: 'none'}}
                >
                  <option value="1">Administrator</option>
                  <option value="2">Customer</option>
                  <option value="3">Employee</option>
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyles}>Account Status</label>
              <div style={{ position: 'relative' }}>
                <FiActivity style={iconStyles} />
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  style={{...inputStyles, appearance: 'none'}}
                >
                  <option value="ACTIVE">Active (Allowed to Login)</option>
                  <option value="BLOCKED">Blocked (Suspended)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyles}>Login Password {userId && <span style={{fontSize: '0.75rem', fontWeight: 400}}>(Leave blank to keep)</span>}</label>
              <div style={{ position: 'relative' }}>
                <FiLock style={iconStyles} />
                <input 
                  type="password" 
                  name="password_hash"
                  placeholder="********"
                  value={formData.password_hash}
                  onChange={handleChange}
                  style={inputStyles}
                  required={!userId}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
          <button 
            type="button" 
            onClick={onClose}
            style={{ padding: '0.75rem 1.5rem', border: '1px solid #cbd5e1', backgroundColor: 'white', color: '#475569', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', transition: 'background-color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: '0.75rem 1.5rem', border: 'none', backgroundColor: '#2563eb', color: 'white', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background-color 0.2s', opacity: loading ? 0.7 : 1 }}
            onMouseOver={(e) => { if(!loading) e.currentTarget.style.backgroundColor = '#1d4ed8'; }}
            onMouseOut={(e) => { if(!loading) e.currentTarget.style.backgroundColor = '#2563eb'; }}
          >
            {loading ? 'Saving...' : <><FiSave /> {userId ? 'Update User' : 'Provision User'}</>}
          </button>
        </div>

      </form>
    </div>
  );
};

export default UserDataEntry;
