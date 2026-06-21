import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import { FiSave, FiX, FiUser, FiBriefcase, FiCreditCard, FiCalendar, FiTruck, FiMail, FiPhone, FiLock, FiImage } from 'react-icons/fi';
import { toast } from 'react-toastify';

const EmployeeDataEntry = ({ employeeId, onClose }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    employee_code: '',
    designation: '',
    joining_date: '',
    aadhaar_number: '',
    pan_number: '',
    vehicle_number: '',
    employee_photo: ''
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (employeeId) {
      fetchEmployeeDetails();
    }
  }, [employeeId]);

  const fetchEmployeeDetails = async () => {
    setLoading(true);
    try {
      const data = await apiCall(`/employees/${employeeId}`);
      if (data && !data.error) {
        setFormData({
          full_name: data.full_name || '',
          email: data.email || '',
          phone: data.phone || '',
          password: '', // Don't fetch password
          employee_code: data.employee_code || '',
          designation: data.designation || '',
          joining_date: data.joining_date || '',
          aadhaar_number: data.aadhaar_number || '',
          pan_number: data.pan_number || '',
          vehicle_number: data.vehicle_number || '',
          employee_photo: data.employee_photo || ''
        });
      } else {
        throw new Error(data.error || 'Failed to load employee details');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
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
        setFormData(prev => ({ ...prev, employee_photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setFormData(prev => ({ ...prev, employee_photo: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (employeeId) {
        await apiCall(`/employees/${employeeId}`, 'PUT', formData);
        toast.success('Employee updated successfully!');
      } else {
        await apiCall('/employees', 'POST', formData);
        toast.success('Employee onboarded successfully!');
      }
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to save employee profile.');
    } finally {
      setSaving(false);
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

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Loading employee details...</div>;
  }

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
      
      {/* Header */}
      <div style={{ padding: '1.5rem 2rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, color: '#0f172a', fontSize: '1.5rem', fontWeight: 700 }}>
            {employeeId ? 'Edit Employee Profile' : 'Onboard New Employee'}
          </h2>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.875rem' }}>
            {employeeId ? 'Update employee identity and operations data.' : 'Create a new operational profile and link it to an account.'}
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
        
        {/* Section 1: User Account Details */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiUser color="#2563eb" /> Account Creation
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            
            <div>
              <label style={labelStyles}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <FiUser style={iconStyles} />
                <input 
                  type="text" 
                  name="full_name"
                  placeholder="Employee Name"
                  value={formData.full_name}
                  onChange={handleChange}
                  style={inputStyles}
                  required
                />
              </div>
            </div>

            <div>
              <label style={labelStyles}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <FiMail style={iconStyles} />
                <input 
                  type="email" 
                  name="email"
                  placeholder="employee@dimondpest.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyles}
                  required
                />
              </div>
            </div>

            <div>
              <label style={labelStyles}>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <FiPhone style={iconStyles} />
                <input 
                  type="text" 
                  name="phone"
                  placeholder="+91..."
                  value={formData.phone}
                  onChange={handleChange}
                  style={inputStyles}
                  required
                />
              </div>
            </div>

            <div>
              <label style={labelStyles}>Login Password {employeeId && <span style={{fontSize: '0.75rem', fontWeight: 400}}>(Leave blank to keep current)</span>}</label>
              <div style={{ position: 'relative' }}>
                <FiLock style={iconStyles} />
                <input 
                  type="password" 
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  style={inputStyles}
                  required={!employeeId}
                />
              </div>
            </div>

          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '2rem 0' }}></div>

        {/* Section 2: Employment Details */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiBriefcase color="#2563eb" /> Employment Details
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            
            <div>
              <label style={labelStyles}>Employee Code</label>
              <div style={{ position: 'relative' }}>
                <FiBriefcase style={iconStyles} />
                <input 
                  type="text" 
                  name="employee_code"
                  placeholder="e.g. DPC-EMP-001"
                  value={formData.employee_code}
                  onChange={handleChange}
                  style={inputStyles}
                  required
                />
              </div>
            </div>

            <div>
              <label style={labelStyles}>Designation / Role</label>
              <div style={{ position: 'relative' }}>
                <FiBriefcase style={iconStyles} />
                <input 
                  type="text" 
                  name="designation"
                  placeholder="e.g. Senior Technician"
                  value={formData.designation}
                  onChange={handleChange}
                  style={inputStyles}
                  required
                />
              </div>
            </div>

            <div>
              <label style={labelStyles}>Joining Date</label>
              <div style={{ position: 'relative' }}>
                <FiCalendar style={iconStyles} />
                <input 
                  type="date" 
                  name="joining_date"
                  value={formData.joining_date}
                  onChange={handleChange}
                  style={inputStyles}
                  required
                />
              </div>
            </div>

          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '2rem 0' }}></div>

        {/* Section 3: Identity & Assets */}
        <div>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiCreditCard color="#2563eb" /> Identity & Assets
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            
            <div>
              <label style={labelStyles}>Aadhaar Number</label>
              <div style={{ position: 'relative' }}>
                <FiCreditCard style={iconStyles} />
                <input 
                  type="text" 
                  name="aadhaar_number"
                  placeholder="12-digit Aadhaar"
                  value={formData.aadhaar_number}
                  onChange={handleChange}
                  style={inputStyles}
                />
              </div>
            </div>

            <div>
              <label style={labelStyles}>PAN Number</label>
              <div style={{ position: 'relative' }}>
                <FiCreditCard style={iconStyles} />
                <input 
                  type="text" 
                  name="pan_number"
                  placeholder="10-character PAN"
                  value={formData.pan_number}
                  onChange={handleChange}
                  style={inputStyles}
                />
              </div>
            </div>

            <div>
              <label style={labelStyles}>Assigned Vehicle No.</label>
              <div style={{ position: 'relative' }}>
                <FiTruck style={iconStyles} />
                <input 
                  type="text" 
                  name="vehicle_number"
                  placeholder="e.g. MH-01-AB-1234"
                  value={formData.vehicle_number}
                  onChange={handleChange}
                  style={inputStyles}
                />
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyles}>Employee Photo</label>
              <div style={{ position: 'relative', display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.5rem', border: '2px dashed #cbd5e1', borderRadius: '0.75rem', backgroundColor: '#f8fafc', transition: 'border-color 0.2s' }}>
                <div style={{ flex: 1 }}>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    id="employee_photo_upload"
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="employee_photo_upload" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#e2e8f0', color: '#334155', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem', transition: 'background-color 0.2s' }}>
                    <FiImage /> Choose Image
                  </label>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: '#64748b' }}>Max file size: 2MB. Format: JPG, PNG, WebP.</p>
                </div>
                {formData.employee_photo && (
                  <div style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '0.5rem', overflow: 'hidden', border: '2px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                    <img src={formData.employee_photo} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button type="button" onClick={handleClearImage} style={{ position: 'absolute', top: '4px', right: '4px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <FiX size={14} />
                    </button>
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
            disabled={saving}
            style={{ padding: '0.75rem 1.5rem', border: 'none', backgroundColor: '#2563eb', color: 'white', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background-color 0.2s', opacity: saving ? 0.7 : 1 }}
            onMouseOver={(e) => { if(!saving) e.currentTarget.style.backgroundColor = '#1d4ed8'; }}
            onMouseOut={(e) => { if(!saving) e.currentTarget.style.backgroundColor = '#2563eb'; }}
          >
            {saving ? 'Saving...' : <><FiSave /> {employeeId ? 'Update Employee' : 'Save Employee'}</>}
          </button>
        </div>

      </form>
    </div>
  );
};

export default EmployeeDataEntry;
