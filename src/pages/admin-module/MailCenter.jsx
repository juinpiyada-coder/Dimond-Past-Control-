import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import { FiSend, FiMail, FiUser, FiAlignLeft, FiCheckCircle, FiPaperclip, FiTrash2 } from 'react-icons/fi';

const MailCenter = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    body: '',
    attachments: []
  });
  
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const result = await apiCall('/users');
      if (Array.isArray(result)) {
        setUsers(result.filter(u => u.email)); // Only users with emails
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!formData.to || !formData.subject || !formData.body) {
      setMessage({ type: 'error', text: 'All fields are required.' });
      return;
    }

    setIsSending(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await apiCall('/admin/send-email', 'POST', formData);
      if (response && response.error) {
        throw new Error(response.error);
      }
      
      if (response && response.failed > 0) {
        throw new Error('Failed to send email via SMTP. Please check your Mail server credentials in the .env file.');
      }
      
      setMessage({ type: 'success', text: 'Email sent successfully!' });
      setFormData({ ...formData, subject: '', body: '', attachments: [] }); // keep the recipient if they want to send another
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to send email.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '2.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '1rem', borderRadius: '0.75rem' }}>
          <FiMail size={28} />
        </div>
        <div>
          <h2 style={{ margin: 0, color: '#0f172a', fontSize: '1.5rem' }}>Compose Broadcast</h2>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748b' }}>Send custom notifications or newsletters directly to your users.</p>
        </div>
      </div>

      {message.text && (
        <div style={{ 
          padding: '1rem 1.5rem', 
          borderRadius: '0.5rem', 
          marginBottom: '2rem', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem',
          backgroundColor: message.type === 'success' ? '#ecfdf5' : '#fef2f2',
          color: message.type === 'success' ? '#065f46' : '#991b1b',
          border: `1px solid ${message.type === 'success' ? '#a7f3d0' : '#fecaca'}`
        }}>
          {message.type === 'success' && <FiCheckCircle size={20} />}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Recipient Field */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
            <FiUser size={16} /> Recipient User
          </label>
          <select 
            value={formData.to} 
            onChange={e => setFormData({ ...formData, to: e.target.value })}
            disabled={loadingUsers}
            style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', color: '#0f172a', backgroundColor: '#f8fafc' }}
          >
            <option value="">Select a user...</option>
            {users.map(u => (
              <option key={u.user_id} value={u.email}>{u.full_name} ({u.email})</option>
            ))}
          </select>
        </div>

        {/* Subject Field */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
            <FiAlignLeft size={16} /> Subject Line
          </label>
          <input 
            type="text" 
            placeholder="e.g. Important Update Regarding Your Account"
            value={formData.subject}
            onChange={e => setFormData({ ...formData, subject: e.target.value })}
            style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', color: '#0f172a' }}
          />
        </div>

        {/* Message Body Field */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
            <FiAlignLeft size={16} /> Message Content
          </label>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 0.5rem 0' }}>Your message will automatically be wrapped in the professional Dimond Pest Control HTML template.</p>
          <textarea 
            rows="8"
            placeholder="Write your email here..."
            value={formData.body}
            onChange={e => setFormData({ ...formData, body: e.target.value })}
            style={{ width: '100%', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', color: '#0f172a', resize: 'vertical', fontFamily: 'inherit' }}
          ></textarea>
        </div>

        {/* Attachments Field */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
            <FiPaperclip size={16} /> Attachments (PDF, Images, etc.)
          </label>
          <div style={{ border: '2px dashed #cbd5e1', padding: '1.5rem', borderRadius: '0.5rem', backgroundColor: '#f8fafc', textAlign: 'center' }}>
            <input 
              type="file" 
              multiple 
              onChange={(e) => {
                const files = Array.from(e.target.files);
                files.forEach(file => {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const base64Data = event.target.result.split(',')[1];
                    setFormData(prev => ({
                      ...prev,
                      attachments: [...prev.attachments, { name: file.name, type: file.type, data: base64Data }]
                    }));
                  };
                  reader.readAsDataURL(file);
                });
                // clear input so same file can be selected again if needed
                e.target.value = '';
              }} 
              style={{ marginBottom: '1rem' }}
            />
            {formData.attachments.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem', textAlign: 'left' }}>
                {formData.attachments.map((att, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.875rem', color: '#334155' }}>{att.name}</span>
                    <button 
                      type="button" 
                      onClick={() => setFormData(prev => ({ ...prev, attachments: prev.attachments.filter((_, i) => i !== index) }))}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button 
            type="submit" 
            disabled={isSending || !formData.to || !formData.subject || !formData.body}
            style={{ 
              backgroundColor: '#2563eb', 
              color: 'white', 
              border: 'none', 
              padding: '0.875rem 2rem', 
              borderRadius: '0.5rem', 
              cursor: (isSending || !formData.to || !formData.subject || !formData.body) ? 'not-allowed' : 'pointer', 
              fontWeight: 600, 
              fontSize: '1rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              opacity: (isSending || !formData.to || !formData.subject || !formData.body) ? 0.7 : 1,
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => { if (!isSending && formData.to && formData.subject && formData.body) e.currentTarget.style.backgroundColor = '#1d4ed8' }}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            {isSending ? 'Sending...' : 'Send Broadcast Email'}
            <FiSend size={18} />
          </button>
        </div>

      </form>
    </div>
  );
};

export default MailCenter;
