import React, { useState, useEffect } from 'react';
import { Package, Calendar, Clock, FileText, CheckCircle, Clock as PendingIcon, XCircle, MapPin } from 'lucide-react';
import { apiCall } from '../../utils/api';
import BookingOverview from '../admin-module/BookingOverview';
import { Link } from 'react-router-dom';

const CustomerBookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await apiCall('/bookings');
      // Ensure we only show bookings belonging to the logged in customer
      const userId = user.user_id || user.id;
      const userBookings = Array.isArray(res) ? res.filter(b => b.customer_id === userId) : [];
      setBookings(userBookings);
    } catch (err) {
      setError('Failed to load bookings.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    switch(status?.toUpperCase()) {
      case 'COMPLETED': return { color: '#166534', bg: '#dcfce7', icon: <CheckCircle size={16} /> };
      case 'CANCELLED': return { color: '#991b1b', bg: '#fee2e2', icon: <XCircle size={16} /> };
      default: return { color: '#b45309', bg: '#fef3c7', icon: <PendingIcon size={16} /> }; // PENDING
    }
  };

  if (selectedBooking) {
    return <BookingOverview booking={selectedBooking} onClose={() => setSelectedBooking(null)} />;
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#2563eb', margin: 0, display: 'inline-block' }}>My Bookings</h1>
      </div>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Loading your bookings...</div>
      ) : error ? (
        <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #fca5a5' }}>{error}</div>
      ) : bookings.length === 0 ? (
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e2e8f0', padding: '3rem', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', backgroundColor: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Package size={32} color="#3b82f6" />
          </div>
          <h3 style={{ fontSize: '1.25rem', color: '#0f172a', margin: '0 0 0.5rem 0' }}>No bookings yet</h3>
          <p style={{ color: '#64748b', margin: '0 0 2rem 0' }}>When you book a pest control service, it will appear here.</p>
          <Link to="/services" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, textDecoration: 'none' }}>
            Book a Service
          </Link>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafbfc' }}>
                  <th style={{ padding: '16px 24px', color: '#475569', fontWeight: 600, fontSize: '0.9rem' }}>Booking Ref</th>
                  <th style={{ padding: '16px 24px', color: '#475569', fontWeight: 600, fontSize: '0.9rem' }}>Service</th>
                  <th style={{ padding: '16px 24px', color: '#475569', fontWeight: 600, fontSize: '0.9rem' }}>Date & Time</th>
                  <th style={{ padding: '16px 24px', color: '#475569', fontWeight: 600, fontSize: '0.9rem' }}>Amount</th>
                  <th style={{ padding: '16px 24px', color: '#475569', fontWeight: 600, fontSize: '0.9rem' }}>Status</th>
                  <th style={{ padding: '16px 24px', color: '#475569', fontWeight: 600, fontSize: '0.9rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => {
                  const statusConfig = getStatusConfig(booking.status);
                  
                  return (
                    <tr key={booking.booking_id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <td style={{ padding: '16px 24px', color: '#64748b', fontWeight: 500 }}>
                        {booking.booking_reference || `BKG-${booking.booking_id}`}
                      </td>
                      <td style={{ padding: '16px 24px', color: '#0f172a', fontWeight: 600 }}>
                        {booking.service_name || 'Pest Control Service'}
                      </td>
                      <td style={{ padding: '16px 24px', color: '#64748b', fontSize: '0.9rem' }}>
                        {booking.booking_date ? new Date(booking.booking_date).toLocaleDateString() : 'N/A'} <br />
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{booking.booking_time || 'N/A'}</span>
                      </td>
                      <td style={{ padding: '16px 24px', color: '#0f172a', fontWeight: 700 }}>
                        ₹{Number(booking.total_amount || 0).toFixed(2)}
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ 
                          padding: '4px 10px', 
                          backgroundColor: statusConfig.bg, 
                          color: statusConfig.color, 
                          borderRadius: '12px', 
                          fontSize: '0.75rem', 
                          fontWeight: 700,
                          display: 'inline-block'
                        }}>
                          {booking.status?.toUpperCase() === 'PENDING' ? 'UPCOMING' : booking.status?.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <button 
                          onClick={() => setSelectedBooking(booking)}
                          style={{ 
                            color: '#2563eb', 
                            background: 'none', 
                            border: 'none', 
                            fontWeight: 600, 
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                          }}
                          onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'}
                          onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerBookings;
