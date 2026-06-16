import os

base_path = "src/pages/admin-module"
os.makedirs(base_path, exist_ok=True)

def template(component_name, entity_name, endpoint, initial_state, form_fields):
    return f"""import React, {{ useState, useEffect }} from 'react';
import {{ FiSave, FiX, FiCheck, FiAlertCircle }} from 'react-icons/fi';
import {{ apiCall }} from '../../utils/api';

const {component_name} = ({{ entityId, onClose }}) => {{
  const [formData, setFormData] = useState({initial_state});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!entityId);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {{
    if (entityId) fetchEntity();
  }}, [entityId]);

  const fetchEntity = async () => {{
    try {{
      const data = await apiCall(`/{endpoint}/${{entityId}}`);
      if (data && !data.error) setFormData(data);
      else setError('Failed to fetch details');
    }} catch (err) {{
      setError(err.message || 'Error fetching details');
    }} finally {{
      setFetching(false);
    }}
  }};

  const handleChange = (e) => {{
    const {{ name, value }} = e.target;
    setFormData(prev => ({{ ...prev, [name]: value }}));
  }};

  const handleImageChange = (e, fieldName) => {{
    const file = e.target.files[0];
    if (file) {{
      const reader = new FileReader();
      reader.onloadend = () => {{
        setFormData(prev => ({{ ...prev, [fieldName]: reader.result }}));
      }};
      reader.readAsDataURL(file);
    }}
  }};

  const handleSubmit = async (e) => {{
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {{
      let result;
      if (entityId) {{
        result = await apiCall(`/{endpoint}/${{entityId}}`, 'PUT', formData);
      }} else {{
        result = await apiCall('/{endpoint}', 'POST', formData);
      }}
      if (result && !result.error) {{
        setSuccess('Saved successfully!');
        setTimeout(() => onClose(), 1500);
      }} else {{
        throw new Error(result?.error || 'Unknown error occurred');
      }}
    }} catch (err) {{
      setError(err.message || 'Failed to save');
    }} finally {{
      setLoading(false);
    }}
  }};

  if (fetching) return <div style={{{{ padding: '3rem', textAlign: 'center' }}}}>Loading...</div>;

  return (
    <div style={{{{ backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}}}>
      <div style={{{{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}}}>
        <h2 style={{{{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}}}>{{entityId ? 'Edit {entity_name}' : 'Create {entity_name}'}}</h2>
        <button onClick={{onClose}} style={{{{ background: 'none', border: 'none', cursor: 'pointer' }}}}><FiX size={{20}} /></button>
      </div>
      <div style={{{{ padding: '2rem' }}}}>
        {{error && <div style={{{{ color: '#b91c1c', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}}}><FiAlertCircle /> {{error}}</div>}}
        {{success && <div style={{{{ color: '#15803d', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}}}><FiCheck /> {{success}}</div>}}
        <form onSubmit={{handleSubmit}} style={{{{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}}}>
          {form_fields}
          <div style={{{{ display: 'flex', gap: '1rem', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}}}>
            <button type="button" onClick={{onClose}} style={{{{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', cursor: 'pointer' }}}}>Cancel</button>
            <button type="submit" disabled={{loading}} style={{{{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', backgroundColor: '#2563eb', color: 'white', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}}}>
              <FiSave /> {{loading ? 'Saving...' : 'Save'}}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}};
export default {component_name};
"""

def build_field(f_type, name, label, required=False):
    req_str = "required" if required else ""
    if f_type == "textarea":
        return f"""<div style={{{{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}}}>
            <label style={{{{ fontWeight: 500, fontSize: '0.875rem' }}}}>{label}</label>
            <textarea name="{name}" value={{formData.{name}}} onChange={{handleChange}} {req_str} style={{{{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }}}} rows="4"></textarea>
          </div>"""
    elif f_type == "file":
        return f"""<div style={{{{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}}}>
            <label style={{{{ fontWeight: 500, fontSize: '0.875rem' }}}}>{label} (Upload)</label>
            <input type="file" accept="image/*,application/pdf" onChange={{(e) => handleImageChange(e, '{name}')}} style={{{{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }}}} />
            {{formData.{name} && typeof formData.{name} === 'string' && formData.{name}.startsWith('data:image') && <img src={{formData.{name}}} alt="Preview" style={{{{ maxWidth: '200px', marginTop: '0.5rem' }}}} />}}
          </div>"""
    elif f_type == "select-status":
        return f"""<div style={{{{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}}}>
            <label style={{{{ fontWeight: 500, fontSize: '0.875rem' }}}}>{label}</label>
            <select name="{name}" value={{formData.{name}}} onChange={{handleChange}} style={{{{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }}}}>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>"""
    elif f_type == "select-booking-status":
        return f"""<div style={{{{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}}}>
            <label style={{{{ fontWeight: 500, fontSize: '0.875rem' }}}}>{label}</label>
            <select name="{name}" value={{formData.{name}}} onChange={{handleChange}} style={{{{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }}}}>
              <option value="PENDING">PENDING</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="ASSIGNED">ASSIGNED</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>"""
    else:
        return f"""<div style={{{{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}}}>
            <label style={{{{ fontWeight: 500, fontSize: '0.875rem' }}}}>{label}</label>
            <input type="{f_type}" name="{name}" value={{formData.{name} || ''}} onChange={{handleChange}} {req_str} style={{{{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }}}} />
          </div>"""

modules = [
  {
    "name": "ServiceDataEntry",
    "entity": "Service",
    "endpoint": "services",
    "initial": "{ pest_id: '', service_name: '', description: '', duration_hours: '', base_price: '', status: 'ACTIVE', service_image: '' }",
    "fields": [
      build_field('number', 'pest_id', 'Pest ID', True),
      build_field('text', 'service_name', 'Service Name', True),
      build_field('textarea', 'description', 'Description'),
      build_field('number', 'duration_hours', 'Duration (Hours)'),
      build_field('number', 'base_price', 'Base Price'),
      build_field('select-status', 'status', 'Status'),
      build_field('file', 'service_image', 'Service Image')
    ]
  },
  {
    "name": "ServiceImageDataEntry",
    "entity": "Service Image",
    "endpoint": "service-images",
    "initial": "{ booking_id: '', employee_id: '', image_category: 'BEFORE', image_data: '' }",
    "fields": [
      build_field('number', 'booking_id', 'Booking ID', True),
      build_field('number', 'employee_id', 'Employee ID', True),
      build_field('text', 'image_category', 'Category (BEFORE/AFTER)'),
      build_field('file', 'image_data', 'Image Data')
    ]
  },
  {
    "name": "ReviewDataEntry",
    "entity": "Review",
    "endpoint": "reviews",
    "initial": "{ booking_id: '', customer_id: '', rating: '5', review_text: '', review_image: '' }",
    "fields": [
      build_field('number', 'booking_id', 'Booking ID', True),
      build_field('number', 'customer_id', 'Customer ID', True),
      build_field('number', 'rating', 'Rating (1-5)'),
      build_field('textarea', 'review_text', 'Review Text'),
      build_field('file', 'review_image', 'Review Image')
    ]
  },
  {
    "name": "ReferralDataEntry",
    "entity": "Referral",
    "endpoint": "referrals",
    "initial": "{ referrer_user_id: '', referred_user_id: '', referral_code: '', reward_points: '0', status: 'PENDING' }",
    "fields": [
      build_field('number', 'referrer_user_id', 'Referrer User ID', True),
      build_field('number', 'referred_user_id', 'Referred User ID'),
      build_field('text', 'referral_code', 'Referral Code'),
      build_field('number', 'reward_points', 'Reward Points'),
      build_field('text', 'status', 'Status (PENDING/COMPLETED)')
    ]
  },
  {
    "name": "PestTypeDataEntry",
    "entity": "Pest Type",
    "endpoint": "pest-types",
    "initial": "{ pest_name: '', description: '', icon_image: '' }",
    "fields": [
      build_field('text', 'pest_name', 'Pest Name', True),
      build_field('textarea', 'description', 'Description'),
      build_field('file', 'icon_image', 'Icon Image')
    ]
  },
  {
    "name": "InvoiceDataEntry",
    "entity": "Invoice",
    "endpoint": "invoices",
    "initial": "{ booking_id: '', invoice_number: '', gst_amount: '', total_amount: '', invoice_pdf: '' }",
    "fields": [
      build_field('number', 'booking_id', 'Booking ID', True),
      build_field('text', 'invoice_number', 'Invoice Number'),
      build_field('number', 'gst_amount', 'GST Amount'),
      build_field('number', 'total_amount', 'Total Amount'),
      build_field('file', 'invoice_pdf', 'Invoice PDF')
    ]
  },
  {
    "name": "EmployeeAssignmentDataEntry",
    "entity": "Employee Assignment",
    "endpoint": "employee-assignments",
    "initial": "{ booking_id: '', employee_id: '' }",
    "fields": [
      build_field('number', 'booking_id', 'Booking ID', True),
      build_field('number', 'employee_id', 'Employee ID', True)
    ]
  },
  {
    "name": "BookingDataEntry",
    "entity": "Booking",
    "endpoint": "bookings",
    "initial": "{ customer_id: '', service_id: '', address_id: '', booking_reference: '', booking_date: '', booking_time: '', notes: '', status: 'PENDING', total_amount: '' }",
    "fields": [
      build_field('number', 'customer_id', 'Customer ID', True),
      build_field('number', 'service_id', 'Service ID', True),
      build_field('number', 'address_id', 'Address ID', True),
      build_field('text', 'booking_reference', 'Booking Reference'),
      build_field('date', 'booking_date', 'Booking Date'),
      build_field('time', 'booking_time', 'Booking Time'),
      build_field('textarea', 'notes', 'Notes'),
      build_field('select-booking-status', 'status', 'Status'),
      build_field('number', 'total_amount', 'Total Amount')
    ]
  }
]

for m in modules:
    content = template(m["name"], m["entity"], m["endpoint"], m["initial"], "\n".join(m["fields"]))
    with open(f"{base_path}/{m['name']}.jsx", "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {m['name']}.jsx")
