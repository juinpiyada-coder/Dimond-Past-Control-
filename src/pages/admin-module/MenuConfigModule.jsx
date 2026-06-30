import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiLink, FiSave, FiX } from 'react-icons/fi';
import { apiCall } from '../../utils/api';
import { toast } from 'react-toastify';

const MenuConfigModule = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  
  const [formData, setFormData] = useState({
    menu_location: 'HEADER',
    label: '',
    url: '',
    order_index: 0,
    is_active: 1
  });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const data = await apiCall('/menus');
      setMenus(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error('Failed to load menu configurations');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (menu) => {
    setEditingMenu(menu.menu_id);
    setFormData({
      menu_location: menu.menu_location,
      label: menu.label,
      url: menu.url,
      order_index: menu.order_index,
      is_active: menu.is_active
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu link?')) return;
    try {
      await apiCall(`/menus/${id}`, 'DELETE');
      toast.success('Menu link deleted');
      fetchMenus();
    } catch (err) {
      toast.error('Failed to delete menu');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMenu) {
        await apiCall(`/menus/${editingMenu}`, 'PUT', formData);
        toast.success('Menu updated successfully');
      } else {
        await apiCall('/menus', 'POST', formData);
        toast.success('New menu created');
      }
      setEditingMenu(null);
      setFormData({ menu_location: 'HEADER', label: '', url: '', order_index: 0, is_active: 1 });
      fetchMenus();
    } catch (err) {
      toast.error('Failed to save menu configuration');
    }
  };

  const renderGrid = (location) => {
    const locationMenus = menus.filter(m => m.menu_location === location);

    return (
      <div style={{ backgroundColor: 'white', borderRadius: '1rem', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>{location} Links</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.875rem' }}>Order</th>
              <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.875rem' }}>Label</th>
              <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.875rem' }}>URL Path</th>
              <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.875rem' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.875rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {locationMenus.map((menu) => (
              <tr key={menu.menu_id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem 1.5rem', color: '#64748b' }}>{menu.order_index}</td>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#0f172a' }}>{menu.label}</td>
                <td style={{ padding: '1rem 1.5rem', color: '#2563eb' }}><FiLink size={12} style={{marginRight: '0.5rem'}}/>{menu.url}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ backgroundColor: menu.is_active ? '#dcfce7' : '#fef2f2', color: menu.is_active ? '#166534' : '#991b1b', padding: '0.25rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600 }}>
                    {menu.is_active ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button onClick={() => handleEdit(menu)} style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #e2e8f0', backgroundColor: 'white', color: '#64748b', cursor: 'pointer' }}><FiEdit2 size={16} /></button>
                    <button onClick={() => handleDelete(menu.menu_id)} style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #e2e8f0', backgroundColor: '#fef2f2', color: '#ef4444', cursor: 'pointer' }}><FiTrash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {locationMenus.length === 0 && (
              <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No menu links defined for {location}.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
      
      {/* Existing Menus */}
      <div>
        <h2 style={{ margin: '0 0 2rem 0', color: '#0f172a', fontSize: '1.5rem', fontWeight: 700 }}>Frontend Menu Configurator</h2>
        {loading ? <div style={{ textAlign: 'center', padding: '3rem' }}>Loading configurations...</div> : (
          <>
            {renderGrid('HEADER')}
            {renderGrid('FOOTER')}
          </>
        )}
      </div>

      {/* Editor Form */}
      <div>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', position: 'sticky', top: '90px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.125rem' }}>{editingMenu ? 'Edit Link' : 'Add New Link'}</h3>
            {editingMenu && (
              <button onClick={() => { setEditingMenu(null); setFormData({ menu_location: 'HEADER', label: '', url: '', order_index: 0, is_active: 1 }); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><FiX size={20} /></button>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Menu Location</label>
              <select name="menu_location" value={formData.menu_location} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none' }}>
                <option value="HEADER">Main Header Navigation</option>
                <option value="FOOTER">Footer Links</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Display Label</label>
              <input type="text" name="label" value={formData.label} onChange={handleChange} required placeholder="e.g. Our Services" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>URL Path</label>
              <input type="text" name="url" value={formData.url} onChange={handleChange} required placeholder="e.g. /services" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Sort Order Index</label>
              <input type="number" name="order_index" value={formData.order_index} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none' }} />
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>Lower numbers appear first (e.g. 1, 2, 3)</p>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '0.5rem' }}>
              <input type="checkbox" name="is_active" checked={formData.is_active === 1} onChange={handleChange} style={{ width: '1.125rem', height: '1.125rem' }} />
              <span style={{ fontWeight: 600, color: '#0f172a' }}>Link is Active (Visible)</span>
            </label>

            <button type="submit" style={{ marginTop: '1rem', padding: '0.875rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <FiSave /> {editingMenu ? 'Save Changes' : 'Add to Menu'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MenuConfigModule;
