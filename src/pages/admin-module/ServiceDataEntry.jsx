import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import { FiSave, FiX, FiTool, FiClock, FiDollarSign, FiImage, FiFileText, FiTag } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ServiceDataEntry = ({ entityId, onClose }) => {
  const [formData, setFormData] = useState({
    pest_id: '',
    service_name: '',
    description: '',
    duration_hours: '',
    base_price: '',
    status: 'ACTIVE',
    service_image: ''
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!entityId);
  const [pestTypes, setPestTypes] = useState([]);

  useEffect(() => {
    fetchPestTypes();
    if (entityId) {
      fetchService();
    }
  }, [entityId]);

  const fetchPestTypes = async () => {
    try {
      const data = await apiCall('/pest-types');
      if (Array.isArray(data)) {
        setPestTypes(data);
      }
    } catch (err) {
      console.error("Failed to load pest types", err);
    }
  };

  const fetchService = async () => {
    try {
      const data = await apiCall(`/services/${entityId}`);
      if (data && !data.error) {
        setFormData({
          pest_id: data.pest_id || '',
          service_name: data.service_name || '',
          description: data.description || '',
          duration_hours: data.duration_hours || '',
          base_price: data.base_price || '',
          status: data.status || 'ACTIVE',
          service_image: data.service_image || ''
        });
      } else {
        toast.error('Failed to fetch service details');
      }
    } catch (err) {
      toast.error(err.message || 'Error fetching service');
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
        setFormData(prev => ({ ...prev, service_image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (entityId) {
        await apiCall(`/services/${entityId}`, 'PUT', formData);
        toast.success('Service updated successfully!');
      } else {
        await apiCall('/services', 'POST', formData);
        toast.success('New service created successfully!');
      }
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to save service.');
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
    padding: '0.75rem 1rem',
    minHeight: '100px',
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
    return <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Loading service details...</div>;
  }

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
      
      {/* Header */}
      <div style={{ padding: '1.5rem 2rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, color: '#0f172a', fontSize: '1.5rem', fontWeight: 700 }}>
            {entityId ? 'Edit Service' : 'Create Service'}
          </h2>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.875rem' }}>
            {entityId ? 'Modify service pricing and details.' : 'Define a new pest control service offering.'}
          </p>
        </div>
        <button 
          onClick={onClose}
          type="button"
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
            <FiTool color="#2563eb" /> Core Service Details
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            
            <div>
              <label style={labelStyles}>Service Name *</label>
              <div style={{ position: 'relative' }}>
                <FiTool style={iconStyles} />
                <input 
                  type="text" 
                  name="service_name"
                  placeholder="e.g. Premium Cockroach Control"
                  value={formData.service_name}
                  onChange={handleChange}
                  style={inputStyles}
                  required
                />
              </div>
            </div>

            <div>
              <label style={labelStyles}>Target Pest Type</label>
              <div style={{ position: 'relative' }}>
                <FiTag style={iconStyles} />
                <select 
                  name="pest_id"
                  value={formData.pest_id}
                  onChange={handleChange}
                  style={{ ...inputStyles, appearance: 'none' }}
                >
                  <option value="">-- Select Pest Type (Optional) --</option>
                  {pestTypes.map(pest => (
                    <option key={pest.pest_id} value={pest.pest_id}>{pest.pest_name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ ...labelStyles, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FiFileText /> Service Description
              </label>
              <div style={{ position: 'relative' }}>
                <textarea 
                  name="description"
                  placeholder="Describe the treatment process and benefits..."
                  value={formData.description}
                  onChange={handleChange}
                  style={textareaStyles}
                ></textarea>
              </div>
            </div>

          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '2rem 0' }}></div>

        <div>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiDollarSign color="#2563eb" /> Pricing & Operations
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            
            <div>
              <label style={labelStyles}>Base Price (₹) *</label>
              <div style={{ position: 'relative' }}>
                <FiDollarSign style={iconStyles} />
                <input 
                  type="number" 
                  step="0.01"
                  name="base_price"
                  placeholder="0.00"
                  value={formData.base_price}
                  onChange={handleChange}
                  style={inputStyles}
                  required
                />
              </div>
            </div>

            <div>
              <label style={labelStyles}>Duration (Hours) *</label>
              <div style={{ position: 'relative' }}>
                <FiClock style={iconStyles} />
                <input 
                  type="number" 
                  step="0.5"
                  name="duration_hours"
                  placeholder="2.0"
                  value={formData.duration_hours}
                  onChange={handleChange}
                  style={inputStyles}
                  required
                />
              </div>
            </div>

            <div>
              <label style={labelStyles}>Status</label>
              <div style={{ position: 'relative' }}>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  style={{ ...inputStyles, appearance: 'none', paddingLeft: '1rem' }}
                >
                  <option value="ACTIVE">Active (Available)</option>
                  <option value="INACTIVE">Inactive (Hidden)</option>
                </select>
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyles}>Service Banner Image</label>
              <div style={{ position: 'relative', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ ...inputStyles, paddingLeft: '1rem', cursor: 'pointer' }}
                  />
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>Max file size: 2MB. Format: JPG, PNG, WebP.</p>
                </div>
                {formData.service_image && (
                  <div style={{ width: '80px', height: '80px', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <img 
                      src={
                        formData.service_image.startsWith('/api/') 
                          ? (import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') : 'http://localhost:8000') + formData.service_image 
                          : formData.service_image
                      } 
                      alt="Preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      onError={(e) => { e.target.onerror = null; e.target.src = '/logo1.png'; }}
                    />
                  </div>
                )}
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
            {loading ? 'Saving...' : <><FiSave /> {entityId ? 'Update Service' : 'Save Service'}</>}
          </button>
        </div>

      </form>
    </div>
  );
};

export default ServiceDataEntry;
