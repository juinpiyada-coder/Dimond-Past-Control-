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

  const [focusedInput, setFocusedInput] = useState(null);

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

  const getInputStyle = (name) => ({
    padding: '1rem 1.25rem',
    borderRadius: '0.75rem',
    border: focusedInput === name ? '2px solid #f59e0b' : '2px solid #e2e8f0',
    backgroundColor: focusedInput === name ? 'white' : '#f8fafc',
    fontSize: '1.05rem',
    color: '#0f172a',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxShadow: focusedInput === name ? '0 0 0 4px rgba(245, 158, 11, 0.1)' : 'none',
    width: '100%',
    boxSizing: 'border-box'
  });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '1rem', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)' }}>
            <MapPin size={24} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: '#0f172a' }}>My Addresses</h1>
            <p style={{ margin: 0, color: '#64748b', fontSize: '1.05rem' }}>Manage your service locations.</p>
          </div>
        </div>
        {!isFormOpen && (
          <button 
            onClick={() => openForm()} 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white', border: 'none', borderRadius: '2rem', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)', transition: 'transform 0.2s, box-shadow 0.2s' }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.4)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.3)'; }}
          >
            <Plus size={20} /> Add Address
          </button>
        )}
      </div>
      
      {isFormOpen ? (
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '1.5rem', border: '1px solid white', padding: '3rem', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)' }}>
          <h2 style={{ margin: '0 0 2rem 0', fontSize: '1.5rem', color: '#0f172a', fontWeight: 700 }}>{editingId ? 'Edit Address' : 'Add New Address'}</h2>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#334155' }}>Address Line 1</label>
              <input 
                required 
                value={formData.address_line1} 
                onChange={(e) => setFormData({...formData, address_line1: e.target.value})} 
                onFocus={() => setFocusedInput('line1')}
                onBlur={() => setFocusedInput(null)}
                style={getInputStyle('line1')} 
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#334155' }}>Address Line 2 (Optional)</label>
              <input 
                value={formData.address_line2} 
                onChange={(e) => setFormData({...formData, address_line2: e.target.value})} 
                onFocus={() => setFocusedInput('line2')}
                onBlur={() => setFocusedInput(null)}
                style={getInputStyle('line2')} 
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#334155' }}>City</label>
                <input 
                  required 
                  value={formData.city} 
                  onChange={(e) => setFormData({...formData, city: e.target.value})} 
                  onFocus={() => setFocusedInput('city')}
                  onBlur={() => setFocusedInput(null)}
                  style={getInputStyle('city')} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#334155' }}>State</label>
                <input 
                  required 
                  value={formData.state} 
                  onChange={(e) => setFormData({...formData, state: e.target.value})} 
                  onFocus={() => setFocusedInput('state')}
                  onBlur={() => setFocusedInput(null)}
                  style={getInputStyle('state')} 
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#334155' }}>ZIP / Pincode</label>
              <input 
                required 
                value={formData.pincode} 
                onChange={(e) => setFormData({...formData, pincode: e.target.value})} 
                onFocus={() => setFocusedInput('pincode')}
                onBlur={() => setFocusedInput(null)}
                style={getInputStyle('pincode')} 
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button 
                type="button" 
                onClick={() => setIsFormOpen(false)} 
                style={{ flex: 1, padding: '1rem', backgroundColor: 'transparent', color: '#64748b', border: '2px solid #cbd5e1', borderRadius: '2rem', cursor: 'pointer', fontWeight: 700, fontSize: '1.05rem', transition: 'all 0.2s ease' }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#334155'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#64748b'; }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                style={{ flex: 1, padding: '1rem', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white', border: 'none', borderRadius: '2rem', cursor: 'pointer', fontWeight: 700, fontSize: '1.05rem', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.4)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.3)'; }}
              >
                Save Address
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {addresses.length === 0 ? (
            <div 
              onClick={() => openForm()} 
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(5px)', borderRadius: '1.5rem', border: '2px dashed #cbd5e1', padding: '4rem 2rem', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'; e.currentTarget.style.borderColor = '#f59e0b'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
            >
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Plus size={32} color="#f59e0b" />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#0f172a', margin: '0 0 0.5rem 0', fontWeight: 700 }}>Add a new address</h3>
              <p style={{ margin: 0, color: '#64748b' }}>We'll use this for your service appointments.</p>
            </div>
          ) : (
            addresses.map(address => (
              <div 
                key={address.address_id} 
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '1.5rem', border: '1px solid white', padding: '2rem', position: 'relative', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 15px 30px -10px rgba(0,0,0,0.1)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 40px -10px rgba(0,0,0,0.05)'; }}
              >
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => openForm(address)} 
                    style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b', transition: 'all 0.2s' }}
                    onMouseOver={(e) => { e.currentTarget.style.background = '#f59e0b'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#f59e0b'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(address.address_id)} 
                    style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ef4444', transition: 'all 0.2s' }}
                    onMouseOver={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#ef4444'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ marginTop: '0.25rem' }}>
                    <MapPin size={24} color="#f59e0b" />
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem', color: '#0f172a', fontWeight: 700, paddingRight: '4rem' }}>{address.address_line1}</h3>
                    {address.address_line2 && <p style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.95rem' }}>{address.address_line2}</p>}
                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem', fontWeight: 500 }}>{address.city}, {address.state} {address.pincode}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerAddresses;
