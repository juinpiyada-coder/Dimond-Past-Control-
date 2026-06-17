import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Edit2, Trash2 } from 'lucide-react';
import { apiCall } from '../../utils/api';

const CustomerAddresses = ({ user }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    fetchAddresses();
  }, [user]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await apiCall('/addresses');
      if (Array.isArray(res)) {
        const userId = user.user_id || user.id;
        const userAddresses = res.filter(a => a.user_id === userId);
        setAddresses(userAddresses);
      }
    } catch (err) {
      console.error('Failed to load addresses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        user_id: user.user_id || user.id
      };

      if (editingId) {
        await apiCall(`/addresses/${editingId}`, 'PUT', payload);
      } else {
        await apiCall('/addresses', 'POST', payload);
      }
      
      setIsFormOpen(false);
      fetchAddresses();
    } catch (err) {
      alert('Failed to save address: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this address?')) return;
    try {
      await apiCall(`/addresses/${id}`, 'DELETE');
      fetchAddresses();
    } catch (err) {
      alert('Failed to delete address: ' + err.message);
    }
  };

  const openForm = (address = null) => {
    if (address) {
      setEditingId(address.address_id);
      setFormData({
        address_line1: address.address_line1 || '',
        address_line2: address.address_line2 || '',
        city: address.city || '',
        state: address.state || '',
        pincode: address.pincode || ''
      });
    } else {
      setEditingId(null);
      setFormData({ address_line1: '', address_line2: '', city: '', state: '', pincode: '' });
    }
    setIsFormOpen(true);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <MapPin size={32} color="#2563eb" />
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>My Addresses</h1>
        </div>
        {!isFormOpen && (
          <button onClick={() => openForm()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
            <Plus size={20} /> Add Address
          </button>
        )}
      </div>
      
      {isFormOpen ? (
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e2e8f0', padding: '2rem' }}>
          <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem' }}>{editingId ? 'Edit Address' : 'Add New Address'}</h2>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Address Line 1</label>
              <input required value={formData.address_line1} onChange={(e) => setFormData({...formData, address_line1: e.target.value})} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Address Line 2 (Optional)</label>
              <input value={formData.address_line2} onChange={(e) => setFormData({...formData, address_line2: e.target.value})} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>City</label>
                <input required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>State</label>
                <input required value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>ZIP / Pincode</label>
              <input required value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" onClick={() => setIsFormOpen(false)} style={{ flex: 1, padding: '0.75rem', backgroundColor: 'transparent', border: '1px solid #cbd5e1', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button type="submit" style={{ flex: 1, padding: '0.75rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>Save Address</button>
            </div>
          </form>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {addresses.length === 0 ? (
            <div onClick={() => openForm()} style={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '2px dashed #cbd5e1', padding: '3rem', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={32} color="#94a3b8" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.125rem', color: '#64748b', margin: 0 }}>Add a new address</h3>
            </div>
          ) : (
            addresses.map(address => (
              <div key={address.address_id} style={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e2e8f0', padding: '1.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => openForm(address)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(address.address_id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={16} /></button>
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#0f172a' }}>{address.address_line1}</h3>
                {address.address_line2 && <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>{address.address_line2}</p>}
                <p style={{ margin: 0, color: '#64748b' }}>{address.city}, {address.state} {address.pincode}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerAddresses;
