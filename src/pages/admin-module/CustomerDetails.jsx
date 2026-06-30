import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import { FiX, FiUser, FiMail, FiPhone, FiCalendar, FiActivity, FiBriefcase, FiCreditCard } from 'react-icons/fi';
import { toast } from 'react-toastify';

const CustomerDetails = ({ customerId, onClose }) => {
  const [customer, setCustomer] = useState(null);
  const [guaranteeCards, setGuaranteeCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (customerId) {
      fetchCustomerDetails();
    }
  }, [customerId]);

  const fetchCustomerDetails = async () => {
    try {
      // Fetch user profile and guarantee cards
      const [data, cardsData] = await Promise.all([
        apiCall(`/users/${customerId}`),
        apiCall('/guarantee-cards')
      ]);

      if (data && !data.error) {
        setCustomer(data);
      } else {
        toast.error('Failed to fetch customer profile.');
      }

      if (Array.isArray(cardsData)) {
        setGuaranteeCards(cardsData.filter(card => card.customer_id === customerId));
      }
    } catch (err) {
      toast.error(err.message || 'Error fetching customer data.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>Loading customer profile...</div>;
  }

  if (!customer) {
    return <div style={{ textAlign: 'center', padding: '4rem', color: '#ef4444' }}>Customer not found.</div>;
  }

  const cardStyle = {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const iconContainerStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
      
      {/* Header */}
      <div style={{ padding: '2rem', backgroundColor: '#0f172a', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 700, border: '4px solid #1e293b' }}>
            {customer.full_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={{ margin: 0, color: 'white', fontSize: '1.75rem', fontWeight: 700 }}>{customer.full_name}</h2>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <span style={{ backgroundColor: customer.status === 'ACTIVE' ? '#065f46' : '#991b1b', color: customer.status === 'ACTIVE' ? '#a7f3d0' : '#fecaca', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <FiActivity /> {customer.status}
              </span>
              <span style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <FiUser /> Customer
              </span>
              <span style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <FiCalendar /> Joined {new Date(customer.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer', color: 'white', transition: 'all 0.2s' }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: '2rem' }}>
        <h3 style={{ margin: '0 0 1.5rem 0', color: '#1e293b', fontSize: '1.25rem' }}>Client Profile</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          
          <div style={cardStyle}>
            <div style={iconContainerStyle}><FiMail size={24} /></div>
            <div>
              <div style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 500 }}>Email Address</div>
              <div style={{ color: '#0f172a', fontWeight: 600, marginTop: '0.25rem' }}>{customer.email || 'Not Provided'}</div>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={iconContainerStyle}><FiPhone size={24} /></div>
            <div>
              <div style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 500 }}>Phone Number</div>
              <div style={{ color: '#0f172a', fontWeight: 600, marginTop: '0.25rem' }}>{customer.phone}</div>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{...iconContainerStyle, backgroundColor: '#fef3c7', color: '#d97706'}}><FiBriefcase size={24} /></div>
            <div>
              <div style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 500 }}>Total Bookings</div>
              <div style={{ color: '#0f172a', fontWeight: 600, marginTop: '0.25rem' }}>
                <span style={{ fontSize: '0.875rem', color: '#94a3b8', fontStyle: 'italic' }}>Historical data coming soon</span>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{...iconContainerStyle, backgroundColor: '#dcfce7', color: '#16a34a'}}><FiCreditCard size={24} /></div>
            <div>
              <div style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 500 }}>Total Spent</div>
              <div style={{ color: '#0f172a', fontWeight: 600, marginTop: '0.25rem' }}>
                <span style={{ fontSize: '0.875rem', color: '#94a3b8', fontStyle: 'italic' }}>Financial data coming soon</span>
              </div>
            </div>
          </div>

        </div>

        {/* Guarantee Cards Section */}
        <h3 style={{ margin: '2rem 0 1.5rem 0', color: '#1e293b', fontSize: '1.25rem', borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>Guarantee Cards</h3>
        {guaranteeCards.length === 0 ? (
          <div style={{ color: '#64748b', fontStyle: 'italic' }}>No guarantee cards found for this customer.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {guaranteeCards.map(card => (
              <div key={card.card_id} style={{ ...cardStyle, borderLeft: '4px solid #10b981', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{card.treatment_type || 'Termite Control'}</div>
                  <span style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600 }}>
                    {card.warranty_period}
                  </span>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#475569' }}>
                  <strong>Date:</strong> {card.treatment_date ? new Date(card.treatment_date).toLocaleDateString() : 'N/A'}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#475569' }}>
                  <strong>Enquiry No:</strong> {card.enquiry_no || 'N/A'}
                </div>
                {card.booking_id && (
                  <div style={{ fontSize: '0.875rem', color: '#475569' }}>
                    <strong>Booking ID:</strong> {card.booking_id}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default CustomerDetails;
