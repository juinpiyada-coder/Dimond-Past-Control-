import React, { useState, useEffect } from 'react';
import { FiSave, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { apiCall } from '../../utils/api';

const GuaranteeCardDataEntry = ({ entityId, onClose }) => {
  const [formData, setFormData] = useState({ customer_id: '', booking_id: '', warranty_period: '', treatment_date: '', treatment_type: '', enquiry_no: '' });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!entityId);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (entityId) fetchEntity();
  }, [entityId]);

  const fetchEntity = async () => {
    try {
      const data = await apiCall('/guarantee-cards/' + entityId);
      if (data && !data.error) setFormData(data);
      else setError('Failed to fetch details');
    } catch (err) {
      setError(err.message || 'Error fetching details');
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
    setError('');
    setSuccess('');
    try {
      let result;
      if (entityId) {
        result = await apiCall('/guarantee-cards/' + entityId, 'PUT', formData);
      } else {
        result = await apiCall('/guarantee-cards', 'POST', formData);
      }
      if (result && !result.error) {
        setSuccess('Saved successfully!');
        onClose();
      } else {
        throw new Error(result?.error || 'Unknown error occurred');
      }
    } catch (err) {
      setError(err.message || 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
      <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{entityId ? 'Edit Guarantee Card' : 'Create Guarantee Card'}</h2>
        <button type='button' onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FiX size={20} /></button>
      </div>
      <div style={{ padding: '2rem' }}>
        {error && <div style={{ color: '#b91c1c', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiAlertCircle /> {error}</div>}
        {success && <div style={{ color: '#15803d', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiCheck /> {success}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}><label style={{ fontWeight: 500, fontSize: '0.875rem' }}>Customer ID</label><input type='number' name='customer_id' value={formData.customer_id || ''} onChange={handleChange} required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}><label style={{ fontWeight: 500, fontSize: '0.875rem' }}>Booking ID (Optional)</label><input type='number' name='booking_id' value={formData.booking_id || ''} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}><label style={{ fontWeight: 500, fontSize: '0.875rem' }}>Warranty Period (e.g., 5 Years)</label><input type='text' name='warranty_period' value={formData.warranty_period || ''} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}><label style={{ fontWeight: 500, fontSize: '0.875rem' }}>Treatment Date</label><input type='date' name='treatment_date' value={formData.treatment_date || ''} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}><label style={{ fontWeight: 500, fontSize: '0.875rem' }}>Treatment Type</label><input type='text' name='treatment_type' value={formData.treatment_type || ''} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}><label style={{ fontWeight: 500, fontSize: '0.875rem' }}>Enquiry No.</label><input type='text' name='enquiry_no' value={formData.enquiry_no || ''} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} /></div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
            <button type='button' onClick={onClose} style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', cursor: 'pointer' }}>Cancel</button>
            <button type='submit' disabled={loading} style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', backgroundColor: '#2563eb', color: 'white', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}>
              <FiSave /> {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default GuaranteeCardDataEntry;
