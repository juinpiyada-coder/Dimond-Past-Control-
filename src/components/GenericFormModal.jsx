import React, { useState, useEffect } from 'react';
import { apiCall } from '../utils/api';

const GenericFormModal = ({ isOpen, onClose, entity, schema, initialData, onSuccess }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const defaultData = {};
      schema.forEach(field => {
        if (!field.auto_increment) {
          defaultData[field.name] = '';
        }
      });
      setFormData(defaultData);
    }
    setError('');
  }, [initialData, schema, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const isEdit = !!initialData;
      const primaryKeyField = schema.find(f => f.primary)?.name;
      
      let url = entity.endpoint;
      let method = 'POST';

      if (isEdit && primaryKeyField) {
        url = `${entity.endpoint}/${initialData[primaryKeyField]}`;
        method = 'PUT';
      }

      // Filter out auto-increment fields for payload
      const payload = { ...formData };
      schema.forEach(f => {
        if (f.auto_increment) delete payload[f.name];
      });

      await apiCall(url, method, payload);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to save data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', 
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', 
        width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto'
      }}>
        <h2 style={{ marginTop: 0 }}>{initialData ? 'Edit' : 'Add New'} {entity.name}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {schema.map(field => {
            if (field.auto_increment) return null;

            return (
              <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  {field.name.replace(/_/g, ' ')} {field.required && <span style={{color: 'red'}}>*</span>}
                </label>
                
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                    style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
                  >
                    <option value="">Select...</option>
                    {field.options?.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === 'text' && (field.name.includes('content') || field.name.includes('description') || field.name.includes('notes')) ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                    rows="4"
                    style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc', resize: 'vertical' }}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                    style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
                  />
                )}
              </div>
            );
          })}
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={onClose} style={{
              padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', backgroundColor: 'white'
            }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} style={{
              padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer', 
              backgroundColor: '#4f46e5', color: 'white'
            }}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenericFormModal;
