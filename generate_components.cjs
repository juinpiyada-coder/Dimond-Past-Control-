const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, 'src', 'pages', 'admin-module');

function template(componentName, entityName, endpoint, initialState, formFields) {
  return "import React, { useState, useEffect } from 'react';\n" +
  "import { FiSave, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';\n" +
  "import { apiCall } from '../../utils/api';\n\n" +
  "const " + componentName + " = ({ entityId, onClose }) => {\n" +
  "  const [formData, setFormData] = useState(" + initialState + ");\n" +
  "  const [loading, setLoading] = useState(false);\n" +
  "  const [fetching, setFetching] = useState(!!entityId);\n" +
  "  const [error, setError] = useState('');\n" +
  "  const [success, setSuccess] = useState('');\n\n" +
  "  useEffect(() => {\n" +
  "    if (entityId) fetchEntity();\n" +
  "  }, [entityId]);\n\n" +
  "  const fetchEntity = async () => {\n" +
  "    try {\n" +
  "      const data = await apiCall('/" + endpoint + "/' + entityId);\n" +
  "      if (data && !data.error) setFormData(data);\n" +
  "      else setError('Failed to fetch details');\n" +
  "    } catch (err) {\n" +
  "      setError(err.message || 'Error fetching details');\n" +
  "    } finally {\n" +
  "      setFetching(false);\n" +
  "    }\n" +
  "  };\n\n" +
  "  const handleChange = (e) => {\n" +
  "    const { name, value } = e.target;\n" +
  "    setFormData(prev => ({ ...prev, [name]: value }));\n" +
  "  };\n\n" +
  "  const handleImageChange = (e, fieldName) => {\n" +
  "    const file = e.target.files[0];\n" +
  "    if (file) {\n" +
  "      const reader = new FileReader();\n" +
  "      reader.onloadend = () => {\n" +
  "        setFormData(prev => ({ ...prev, [fieldName]: reader.result }));\n" +
  "      };\n" +
  "      reader.readAsDataURL(file);\n" +
  "    }\n" +
  "  };\n\n" +
  "  const handleSubmit = async (e) => {\n" +
  "    e.preventDefault();\n" +
  "    setLoading(true);\n" +
  "    setError('');\n" +
  "    setSuccess('');\n" +
  "    try {\n" +
  "      let result;\n" +
  "      if (entityId) {\n" +
  "        result = await apiCall('/" + endpoint + "/' + entityId, 'PUT', formData);\n" +
  "      } else {\n" +
  "        result = await apiCall('/" + endpoint + "', 'POST', formData);\n" +
  "      }\n" +
  "      if (result && !result.error) {\n" +
  "        setSuccess('Saved successfully!');\n" +
  "        setTimeout(() => onClose(), 1500);\n" +
  "      } else {\n" +
  "        throw new Error(result?.error || 'Unknown error occurred');\n" +
  "      }\n" +
  "    } catch (err) {\n" +
  "      setError(err.message || 'Failed to save');\n" +
  "    } finally {\n" +
  "      setLoading(false);\n" +
  "    }\n" +
  "  };\n\n" +
  "  if (fetching) return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading...</div>;\n\n" +
  "  return (\n" +
  "    <div style={{ backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>\n" +
  "      <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>\n" +
  "        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{entityId ? 'Edit " + entityName + "' : 'Create " + entityName + "'}</h2>\n" +
  "        <button type='button' onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FiX size={20} /></button>\n" +
  "      </div>\n" +
  "      <div style={{ padding: '2rem' }}>\n" +
  "        {error && <div style={{ color: '#b91c1c', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiAlertCircle /> {error}</div>}\n" +
  "        {success && <div style={{ color: '#15803d', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiCheck /> {success}</div>}\n" +
  "        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>\n" +
  "          " + formFields + "\n" +
  "          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>\n" +
  "            <button type='button' onClick={onClose} style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', cursor: 'pointer' }}>Cancel</button>\n" +
  "            <button type='submit' disabled={loading} style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', backgroundColor: '#2563eb', color: 'white', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}>\n" +
  "              <FiSave /> {loading ? 'Saving...' : 'Save'}\n" +
  "            </button>\n" +
  "          </div>\n" +
  "        </form>\n" +
  "      </div>\n" +
  "    </div>\n" +
  "  );\n" +
  "};\n" +
  "export default " + componentName + ";\n";
}

function buildField(type, name, label, required = false) {
  let reqStr = required ? "required" : "";
  if (type === 'textarea') {
    return "<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>" +
           "<label style={{ fontWeight: 500, fontSize: '0.875rem' }}>" + label + "</label>" +
           "<textarea name='" + name + "' value={formData." + name + " || ''} onChange={handleChange} " + reqStr + " style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} rows='4'></textarea>" +
           "</div>";
  } else if (type === 'file') {
    return "<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>" +
           "<label style={{ fontWeight: 500, fontSize: '0.875rem' }}>" + label + " (Upload)</label>" +
           "<input type='file' accept='image/*,application/pdf' onChange={(e) => handleImageChange(e, '" + name + "')} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />" +
           "{formData." + name + " && typeof formData." + name + " === 'string' && formData." + name + ".startsWith('data:image') && <img src={formData." + name + "} alt='Preview' style={{ maxWidth: '200px', marginTop: '0.5rem' }} />}" +
           "</div>";
  } else if (type === 'select-status') {
    return "<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>" +
           "<label style={{ fontWeight: 500, fontSize: '0.875rem' }}>" + label + "</label>" +
           "<select name='" + name + "' value={formData." + name + " || ''} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }}>" +
           "<option value='ACTIVE'>ACTIVE</option><option value='INACTIVE'>INACTIVE</option>" +
           "</select></div>";
  } else if (type === 'select-booking-status') {
    return "<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>" +
           "<label style={{ fontWeight: 500, fontSize: '0.875rem' }}>" + label + "</label>" +
           "<select name='" + name + "' value={formData." + name + " || ''} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }}>" +
           "<option value='PENDING'>PENDING</option><option value='CONFIRMED'>CONFIRMED</option><option value='ASSIGNED'>ASSIGNED</option><option value='IN_PROGRESS'>IN_PROGRESS</option><option value='COMPLETED'>COMPLETED</option><option value='CANCELLED'>CANCELLED</option>" +
           "</select></div>";
  } else {
    return "<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>" +
           "<label style={{ fontWeight: 500, fontSize: '0.875rem' }}>" + label + "</label>" +
           "<input type='" + type + "' name='" + name + "' value={formData." + name + " || ''} onChange={handleChange} " + reqStr + " style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />" +
           "</div>";
  }
}

const modules = [
  { name: 'ServiceDataEntry', entity: 'Service', endpoint: 'services', initial: "{ pest_id: '', service_name: '', description: '', duration_hours: '', base_price: '', status: 'ACTIVE', service_image: '' }", fields: [ buildField('number', 'pest_id', 'Pest ID', true), buildField('text', 'service_name', 'Service Name', true), buildField('textarea', 'description', 'Description'), buildField('number', 'duration_hours', 'Duration (Hours)'), buildField('number', 'base_price', 'Base Price'), buildField('select-status', 'status', 'Status'), buildField('file', 'service_image', 'Service Image') ] },
  { name: 'ServiceImageDataEntry', entity: 'Service Image', endpoint: 'service-images', initial: "{ booking_id: '', employee_id: '', image_category: 'BEFORE', image_data: '' }", fields: [ buildField('number', 'booking_id', 'Booking ID', true), buildField('number', 'employee_id', 'Employee ID', true), buildField('text', 'image_category', 'Category (BEFORE/AFTER)'), buildField('file', 'image_data', 'Image Data') ] },
  { name: 'ReviewDataEntry', entity: 'Review', endpoint: 'reviews', initial: "{ booking_id: '', customer_id: '', rating: '5', review_text: '', review_image: '' }", fields: [ buildField('number', 'booking_id', 'Booking ID', true), buildField('number', 'customer_id', 'Customer ID', true), buildField('number', 'rating', 'Rating (1-5)'), buildField('textarea', 'review_text', 'Review Text'), buildField('file', 'review_image', 'Review Image') ] },
  { name: 'ReferralDataEntry', entity: 'Referral', endpoint: 'referrals', initial: "{ referrer_user_id: '', referred_user_id: '', referral_code: '', reward_points: '0', status: 'PENDING' }", fields: [ buildField('number', 'referrer_user_id', 'Referrer User ID', true), buildField('number', 'referred_user_id', 'Referred User ID'), buildField('text', 'referral_code', 'Referral Code'), buildField('number', 'reward_points', 'Reward Points'), buildField('text', 'status', 'Status (PENDING/COMPLETED)') ] },
  { name: 'PestTypeDataEntry', entity: 'Pest Type', endpoint: 'pest-types', initial: "{ pest_name: '', description: '', icon_image: '' }", fields: [ buildField('text', 'pest_name', 'Pest Name', true), buildField('textarea', 'description', 'Description'), buildField('file', 'icon_image', 'Icon Image') ] },
  { name: 'InvoiceDataEntry', entity: 'Invoice', endpoint: 'invoices', initial: "{ booking_id: '', invoice_number: '', gst_amount: '', total_amount: '', invoice_pdf: '' }", fields: [ buildField('number', 'booking_id', 'Booking ID', true), buildField('text', 'invoice_number', 'Invoice Number'), buildField('number', 'gst_amount', 'GST Amount'), buildField('number', 'total_amount', 'Total Amount'), buildField('file', 'invoice_pdf', 'Invoice PDF') ] },
  { name: 'EmployeeAssignmentDataEntry', entity: 'Employee Assignment', endpoint: 'employee-assignments', initial: "{ booking_id: '', employee_id: '' }", fields: [ buildField('number', 'booking_id', 'Booking ID', true), buildField('number', 'employee_id', 'Employee ID', true) ] },
  { name: 'BookingDataEntry', entity: 'Booking', endpoint: 'bookings', initial: "{ customer_id: '', service_id: '', address_id: '', booking_reference: '', booking_date: '', booking_time: '', notes: '', status: 'PENDING', total_amount: '' }", fields: [ buildField('number', 'customer_id', 'Customer ID', true), buildField('number', 'service_id', 'Service ID', true), buildField('number', 'address_id', 'Address ID', true), buildField('text', 'booking_reference', 'Booking Reference'), buildField('date', 'booking_date', 'Booking Date'), buildField('time', 'booking_time', 'Booking Time'), buildField('textarea', 'notes', 'Notes'), buildField('select-booking-status', 'status', 'Status'), buildField('number', 'total_amount', 'Total Amount') ] }
];

modules.forEach(m => {
  const content = template(m.name, m.entity, m.endpoint, m.initial, m.fields.join(''));
  fs.writeFileSync(path.join(basePath, m.name + '.jsx'), content);
  console.log('Created ' + m.name);
});
