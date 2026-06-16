import React, { useState, useEffect } from 'react';
import { FiSave, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { apiCall } from '../../utils/api';

const EmployeeAssignmentDataEntry = ({ entityId, onClose }) => {
  const [formData, setFormData] = useState({ booking_id: '', employee_id: '' });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!entityId);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [employeesData, setEmployeesData] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [usersRes, bookingsRes, empRes] = await Promise.all([
          apiCall('/users'),
          apiCall('/bookings'),
          apiCall('/employees')
        ]);
        
        if (Array.isArray(empRes) && Array.isArray(usersRes)) {
           const combined = empRes.map(emp => {
              const user = usersRes.find(u => u.user_id === emp.user_id);
              return {
                 employee_id: emp.employee_id,
                 full_name: user ? user.full_name : 'Unknown',
                 role: user ? user.role : 'EMPLOYEE'
              }
           });
           setEmployeesData(combined);
        }
        if (Array.isArray(bookingsRes)) {
           setBookings(bookingsRes);
        }
      } catch(e) {
        console.error('Failed to fetch options', e);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    if (entityId) fetchEntity();
  }, [entityId]);

  const fetchEntity = async () => {
    try {
      const data = await apiCall('/employee-assignments/' + entityId);
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
        result = await apiCall('/employee-assignments/' + entityId, 'PUT', formData);
      } else {
        result = await apiCall('/employee-assignments', 'POST', formData);
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
        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{entityId ? 'Edit Employee Assignment' : 'Create Employee Assignment'}</h2>
        <button type='button' onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FiX size={20} /></button>
      </div>
      <div style={{ padding: '2rem' }}>
        {error && <div style={{ color: '#b91c1c', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiAlertCircle /> {error}</div>}
        {success && <div style={{ color: '#15803d', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiCheck /> {success}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 500, fontSize: '0.875rem' }}>Booking</label>
            <select name='booking_id' value={formData.booking_id || ''} onChange={handleChange} required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', backgroundColor: 'white' }}>
              <option value="" disabled>Select a Booking</option>
              {bookings.map(b => (
                <option key={b.booking_id} value={b.booking_id}>
                  {b.booking_reference} - {b.booking_date} (Status: {b.status})
                </option>
              ))}
            </select>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: 500, fontSize: '0.875rem' }}>Employee</label>
            <select name='employee_id' value={formData.employee_id || ''} onChange={handleChange} required style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', backgroundColor: 'white' }}>
              <option value="" disabled>Select an Employee</option>
              {employeesData.map(u => (
                <option key={u.employee_id} value={u.employee_id}>
                  {u.full_name} ({u.role || 'EMPLOYEE'})
                </option>
              ))}
            </select>
          </div>

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
export default EmployeeAssignmentDataEntry;
