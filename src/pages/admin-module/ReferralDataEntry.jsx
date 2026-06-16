import React, { useState, useEffect } from 'react';
import { FiSave, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { apiCall } from '../../utils/api';

const ReferralDataEntry = ({ entityId, onClose }) => {
  const [formData, setFormData] = useState({ referrer_user_id: '', referred_user_id: '', referral_code: '', reward_points: '0', status: 'PENDING' });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!entityId);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (entityId) fetchEntity();
  }, [entityId]);

  const fetchEntity = async () => {
    try {
      const data = await apiCall('/referrals/' + entityId);
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

  const handleImageChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [fieldName]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      let result;
      if (entityId) {
        result = await apiCall('/referrals/' + entityId, 'PUT', formData);
      } else {
        result = await apiCall('/referrals', 'POST', formData);
      }
      if (result && !result.error) {
        setSuccess('Saved successfully!');
        setTimeout(() => onClose(), 1500);
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
        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{entityId ? 'Edit Referral' : 'Create Referral'}</h2>
        <button type='button' onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FiX size={20} /></button>
      </div>
      <div style={{ padding: '2rem' }}>
        {error && <div style={{ color: '#b91c1c', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiAlertCircle /> {error}</div>}
        {success && <div style={{ color: '#15803d', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiCheck /> {success}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}><label style={{ fontWeight: 500, fontSize: '0.875rem' }}>Referrer User ID</label><input type='number' name='referrer_user_id' value={formData.referrer_user_id || ''} onChange={handleChange} required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} /></div><div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}><label style={{ fontWeight: 500, fontSize: '0.875rem' }}>Referred User ID</label><input type='number' name='referred_user_id' value={formData.referred_user_id || ''} onChange={handleChange}  style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} /></div><div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}><label style={{ fontWeight: 500, fontSize: '0.875rem' }}>Referral Code</label><input type='text' name='referral_code' value={formData.referral_code || ''} onChange={handleChange}  style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} /></div><div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}><label style={{ fontWeight: 500, fontSize: '0.875rem' }}>Reward Points</label><input type='number' name='reward_points' value={formData.reward_points || ''} onChange={handleChange}  style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} /></div><div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}><label style={{ fontWeight: 500, fontSize: '0.875rem' }}>Status (PENDING/COMPLETED)</label><input type='text' name='status' value={formData.status || ''} onChange={handleChange}  style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} /></div>
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
export default ReferralDataEntry;
