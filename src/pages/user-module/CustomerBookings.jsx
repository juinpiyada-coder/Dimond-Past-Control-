import React, { useState, useEffect } from 'react';
import { Package, Calendar, Clock, FileText, CheckCircle, Clock as PendingIcon, XCircle, MapPin, Search } from 'lucide-react';
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
      case 'COMPLETED': return { color: '#059669', bg: '#d1fae5', icon: <CheckCircle size={14} /> };
      case 'CANCELLED': return { color: '#dc2626', bg: '#fee2e2', icon: <XCircle size={14} /> };
      default: return { color: '#d97706', bg: '#fef3c7', icon: <PendingIcon size={14} /> }; // PENDING
    }
  };

  if (selectedBooking) {
    return <BookingOverview booking={selectedBooking} onClose={() => setSelectedBooking(null)} />;
  }

  return (
    <div>
      <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>My Bookings</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>Track all your current and past pest control services.</p>
        </div>
      </div>
      
      {error ? (
        <div style={{ backgroundColor: 'rgba(254, 226, 226, 0.5)', backdropFilter: 'blur(10px)', color: '#dc2626', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 500 }}>
          <XCircle size={24} /> {error}
        </div>
      ) : bookings.length === 0 ? (
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', borderRadius: '1.5rem', border: '1px solid white', padding: '5rem 2rem', textAlign: 'center', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)' }}>
          <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.1)' }}>
            <Package size={40} color="#3b82f6" />
          </div>
          <h3 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 0.75rem 0', fontWeight: 700 }}>No bookings found</h3>
          <p style={{ color: '#64748b', margin: '0 0 2.5rem 0', fontSize: '1.1rem', maxWidth: '400px', marginInline: 'auto' }}>You haven't scheduled any pest control services yet. Ready to protect your home?</p>
          <Link 
            to="/services" 
            style={{ 
              display: 'inline-block', 
              padding: '0.875rem 2rem', 
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '2rem', 
              fontWeight: 600, 
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)'; }}
          >
            Book a Service Now
          </Link>
        </div>
      ) : (
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '1.5rem', border: '1px solid white', overflow: 'hidden', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', backgroundColor: 'rgba(248, 250, 252, 0.5)' }}>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Booking Ref</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Service</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date & Time</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Amount</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => {
                  const statusConfig = getStatusConfig(booking.status);
                  
                  return (
                    <tr key={booking.booking_id} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <td style={{ padding: '1.25rem 1.5rem', color: '#64748b', fontWeight: 600, fontSize: '0.95rem' }}>
                        {booking.booking_reference || `BKG-${booking.booking_id}`}
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', color: '#0f172a', fontWeight: 700, fontSize: '1.05rem' }}>
                        {booking.service_name || 'Pest Control Service'}
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', fontWeight: 500, marginBottom: '0.25rem' }}>
                          <Calendar size={14} color="#94a3b8" /> {booking.booking_date ? new Date(booking.booking_date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem' }}>
                          <Clock size={14} color="#cbd5e1" /> {booking.booking_time || 'N/A'}
                        </div>
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', color: '#0f172a', fontWeight: 800, fontSize: '1.1rem' }}>
                        ₹{Number(booking.total_amount || 0).toFixed(2)}
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem' }}>
                        <span style={{ 
                          padding: '0.35rem 0.75rem', 
                          backgroundColor: statusConfig.bg, 
                          color: statusConfig.color, 
                          borderRadius: '2rem', 
                          fontSize: '0.75rem', 
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          letterSpacing: '0.025em'
                        }}>
                          {statusConfig.icon}
                          {booking.status?.toUpperCase() === 'PENDING' ? 'UPCOMING' : booking.status?.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                        <button 
                          onClick={() => setSelectedBooking(booking)}
                          style={{ 
                            padding: '0.5rem 1rem',
                            backgroundColor: 'rgba(37, 99, 235, 0.1)',
                            color: '#2563eb', 
                            border: 'none', 
                            borderRadius: '0.5rem',
                            fontWeight: 600, 
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            transition: 'all 0.2s'
                          }}
                          onMouseOver={e => { e.currentTarget.style.backgroundColor = '#2563eb'; e.currentTarget.style.color = 'white'; }}
                          onMouseOut={e => { e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.1)'; e.currentTarget.style.color = '#2563eb'; }}
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
