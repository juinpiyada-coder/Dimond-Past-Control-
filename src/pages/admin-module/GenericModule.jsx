import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiFileText } from 'react-icons/fi';
import { apiCall } from '../../utils/api';

import ServiceDataEntry from './ServiceDataEntry';
import ReviewDataEntry from './ReviewDataEntry';
import ReferralDataEntry from './ReferralDataEntry';
import PestTypeDataEntry from './PestTypeDataEntry';
import InvoiceDataEntry from './InvoiceDataEntry';
import EmployeeAssignmentDataEntry from './EmployeeAssignmentDataEntry';
import BookingDataEntry from './BookingDataEntry';
import BookingOverview from './BookingOverview';

const MODULE_CONFIG = {
  services: { name: 'Services', endpoint: 'services', idField: 'service_id', columns: ['service_image', 'service_name', 'base_price', 'status'], Editor: ServiceDataEntry },
  reviews: { name: 'Reviews', endpoint: 'reviews', idField: 'review_id', columns: ['review_image', 'customer_id', 'rating', 'created_at'], Editor: ReviewDataEntry },
  referrals: { name: 'Referrals', endpoint: 'referrals', idField: 'referral_id', columns: ['referral_code', 'reward_points', 'status'], Editor: ReferralDataEntry },
  pest_types: { name: 'Pest Types', endpoint: 'pest-types', idField: 'pest_id', columns: ['icon_image', 'pest_name', 'description'], Editor: PestTypeDataEntry },
  invoices: { name: 'Invoices', endpoint: 'invoices', idField: 'invoice_id', columns: ['invoice_pdf', 'invoice_number', 'total_amount', 'generated_at'], Editor: InvoiceDataEntry },
  employee_assignments: { name: 'Assignments', endpoint: 'employee-assignments', idField: 'assignment_id', columns: ['booking_id', 'employee_name'], Editor: EmployeeAssignmentDataEntry },
  bookings: { name: 'Bookings', endpoint: 'bookings', idField: 'booking_id', columns: ['booking_reference', 'customer_name', 'booking_date', 'status', 'service_image'], Editor: BookingDataEntry }
};

const GenericModule = ({ moduleKey }) => {
  const config = MODULE_CONFIG[moduleKey];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewState, setViewState] = useState('grid');
  const [editingId, setEditingId] = useState(null);
  const [overviewItem, setOverviewItem] = useState(null);

  useEffect(() => {
    setViewState('grid');
    if (config) {
      fetchData();
    }
  }, [moduleKey]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      let res = await apiCall(`/${config.endpoint}`);
      if (!Array.isArray(res)) res = [];

      // Enrich Bookings module with User Names and Images
      if (moduleKey === 'bookings' && res.length > 0) {
        try {
          const [usersRes, imagesRes] = await Promise.all([
            apiCall('/users'),
            apiCall('/service-images')
          ]);
          
          const users = Array.isArray(usersRes) ? usersRes : [];
          const images = Array.isArray(imagesRes) ? imagesRes : [];

          res = res.map(booking => {
            const user = users.find(u => u.user_id === booking.customer_id);
            const image = images.find(img => img.booking_id === booking.booking_id);
            
            return {
              ...booking,
              customer_name: user ? user.full_name : 'Unknown',
              service_image: image ? image.image_data : null
            };
          });
        } catch (enrichErr) {
          console.error("Failed to enrich bookings with users/images", enrichErr);
        }
      }

      // Enrich Assignments module with Employee Names
      if (moduleKey === 'employee_assignments' && res.length > 0) {
        try {
          const [usersRes, empRes] = await Promise.all([
            apiCall('/users'),
            apiCall('/employees')
          ]);
          const users = Array.isArray(usersRes) ? usersRes : [];
          const emps = Array.isArray(empRes) ? empRes : [];
          
          res = res.map(assignment => {
            const emp = emps.find(e => e.employee_id === assignment.employee_id);
            const user = emp ? users.find(u => u.user_id === emp.user_id) : null;
            return {
              ...assignment,
              employee_name: user ? user.full_name : `ID: ${assignment.employee_id}`
            };
          });
        } catch (enrichErr) {
          console.error("Failed to enrich assignments with employee names", enrichErr);
        }
      }

      setData(res);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      await apiCall(`/${config.endpoint}/${id}`, 'DELETE');
      fetchData();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  if (!config) return <div>Invalid module</div>;

  if (viewState === 'editor') {
    const EditorComponent = config.Editor;
    return <EditorComponent entityId={editingId} onClose={() => { setEditingId(null); setViewState('grid'); fetchData(); }} />;
  }

  if (viewState === 'overview' && moduleKey === 'bookings' && overviewItem) {
    return <BookingOverview booking={overviewItem} onClose={() => { setViewState('grid'); setOverviewItem(null); }} />;
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ margin: 0, color: '#0f172a', fontSize: '2.25rem', fontWeight: 700 }}>{config.name} Management</h1>
          <p style={{ color: '#64748b', margin: '0.5rem 0 0 0', fontSize: '1rem' }}>Manage records for {config.name.toLowerCase()}.</p>
        </div>
        <button 
          onClick={() => { setEditingId(null); setViewState('editor'); }}
          style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '0.875rem 1.75rem', borderRadius: '0.75rem', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <FiPlus size={18} /> Add New {config.name}
        </button>
      </div>

      {error && data.length === 0 ? (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #f87171', color: '#b91c1c', padding: '1rem' }}>{error}</div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '1rem', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: 600 }}>ID</th>
                {config.columns.map(col => (
                  <th key={col} style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: 600, textTransform: 'capitalize' }}>
                    {col.replace(/_/g, ' ')}
                  </th>
                ))}
                <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item[config.idField]} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{item[config.idField]}</td>
                  {config.columns.map(col => {
                    const value = item[col];
                    
                    // Render Image if column implies an image or value is an image URL
                    const isImageColumn = col.toLowerCase().includes('image') || col.toLowerCase().includes('icon') || col.toLowerCase().includes('logo') || col.toLowerCase().includes('picture');
                    const isImageUrl = typeof value === 'string' && (value.startsWith('data:image') || value.includes('/image') || value.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i));
                    
                    if (isImageColumn || isImageUrl) {
                      let imgSrc = value;
                      if (typeof value === 'string' && value.startsWith('/api/')) {
                        const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
                        const origin = baseUrl ? baseUrl.replace('/api', '') : 'http://localhost:8000';
                        imgSrc = origin + value;
                      }
                      
                      return (
                        <td key={col} style={{ padding: '0.5rem 1.5rem' }}>
                          {value ? (
                            <img 
                              src={imgSrc} 
                              alt="Preview" 
                              style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '0.375rem', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }} 
                              onError={(e) => { e.target.onerror = null; e.target.src = '/logo1.png'; }} 
                            />
                          ) : (
                            <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>No Image</span>
                          )}
                        </td>
                      );
                    }

                    if (typeof value === 'string') {
                      if (value.startsWith('data:application/pdf')) {
                        return (
                          <td key={col} style={{ padding: '0.5rem 1.5rem' }}>
                            <span style={{ padding: '0.25rem 0.5rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600 }}>PDF</span>
                          </td>
                        );
                      }
                    }
                    return (
                      <td key={col} style={{ padding: '1rem 1.5rem', color: '#64748b' }}>
                        {String(value || '')}
                      </td>
                    );
                  })}
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      {moduleKey === 'bookings' && (
                        <button onClick={() => { setOverviewItem(item); setViewState('overview'); }} title="View Overview" style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #e2e8f0', background: '#eff6ff', color: '#2563eb', cursor: 'pointer' }}><FiFileText size={16} /></button>
                      )}
                      <button onClick={() => { setEditingId(item[config.idField]); setViewState('editor'); }} title="Edit" style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', cursor: 'pointer' }}><FiEdit2 size={16} /></button>
                      <button onClick={() => handleDelete(item[config.idField])} title="Delete" style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #e2e8f0', background: '#fef2f2', color: '#ef4444', cursor: 'pointer' }}><FiTrash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.length === 0 && !loading && (
                <tr>
                  <td colSpan={config.columns.length + 2} style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default GenericModule;
