import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import { FiSave, FiX, FiShield, FiTag, FiFileText } from 'react-icons/fi';
import { toast } from 'react-toastify';

const RoleDataEntry = ({ roleId, onClose }) => {
  const [formData, setFormData] = useState({
    role_code: '',
    role_name: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!roleId);

  useEffect(() => {
    if (roleId) {
      fetchRole();
    }
  }, [roleId]);

  const fetchRole = async () => {
    try {
      const data = await apiCall(`/roles/${roleId}`);
      if (data && !data.error) {
        setFormData({
          role_code: data.role_code || '',
          role_name: data.role_name || '',
          description: data.description || ''
        });
      } else {
        toast.error('Failed to fetch role details');
      }
    } catch (err) {
      toast.error(err.message || 'Error fetching role');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (roleId) {
        await apiCall(`/roles/${roleId}`, 'PUT', formData);
        toast.success('System role updated successfully!');
      } else {
        await apiCall('/roles', 'POST', formData);
        toast.success('New system role created successfully!');
      }
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to save role configuration.');
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

  const textareaStyles = {
    ...inputStyles,
    padding: '0.75rem 1rem 0.75rem 1rem', // No left padding needed since no icon inside textarea
    minHeight: '120px',
    resize: 'vertical'
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
    return <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Loading role details...</div>;
  }

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
      
      {/* Header */}
      <div style={{ padding: '1.5rem 2rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, color: '#0f172a', fontSize: '1.5rem', fontWeight: 700 }}>
            {roleId ? 'Edit System Role' : 'Create New Role'}
          </h2>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.875rem' }}>
            {roleId ? 'Modify role access and definitions.' : 'Define a new access role within the system.'}
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
        
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiShield color="#2563eb" /> Role Definition
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            
            <div>
              <label style={labelStyles}>Role Code *</label>
              <div style={{ position: 'relative' }}>
                <FiTag style={iconStyles} />
                <input 
                  type="text" 
                  name="role_code"
                  placeholder="e.g. SUPER_ADMIN"
                  value={formData.role_code}
                  onChange={handleChange}
                  style={{ ...inputStyles, textTransform: 'uppercase' }}
                  required
                />
              </div>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>Must be uppercase without spaces.</p>
            </div>

            <div>
              <label style={labelStyles}>Role Display Name *</label>
              <div style={{ position: 'relative' }}>
                <FiShield style={iconStyles} />
                <input 
                  type="text" 
                  name="role_name"
                  placeholder="e.g. Super Administrator"
                  value={formData.role_name}
                  onChange={handleChange}
                  style={inputStyles}
                  required
                />
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ ...labelStyles, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FiFileText /> Description
              </label>
              <div style={{ position: 'relative' }}>
                <textarea 
                  name="description"
                  placeholder="Briefly describe the permissions and scope of this role..."
                  value={formData.description}
                  onChange={handleChange}
                  style={textareaStyles}
                ></textarea>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
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
            {loading ? 'Saving...' : <><FiSave /> {roleId ? 'Update Role' : 'Create Role'}</>}
          </button>
        </div>

      </form>
    </div>
  );
};

export default RoleDataEntry;
