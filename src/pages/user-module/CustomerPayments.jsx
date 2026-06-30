import React, { useState, useEffect } from 'react';
import { CreditCard, FileText, CheckCircle, Clock } from 'lucide-react';
import { apiCall } from '../../utils/api';

const CustomerPayments = ({ user }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        // We will fetch bookings first to find which bookings belong to the user
        // Then we fetch payments and map them.
        const [bookingsRes, paymentsRes] = await Promise.all([
          apiCall('/bookings'),
          apiCall('/payments')
        ]);

        if (Array.isArray(bookingsRes) && Array.isArray(paymentsRes)) {
          const userId = user.user_id || user.id;
          const userBookings = bookingsRes.filter(b => b.customer_id === userId);
          const bookingIds = userBookings.map(b => b.booking_id);

          // Payments usually have a booking_id or invoice_id. 
          // Assuming payment table has booking_id.
          const userPayments = paymentsRes.filter(p => bookingIds.includes(p.booking_id));
          
          // Attach booking details for display
          const enrichedPayments = userPayments.map(p => {
            const booking = userBookings.find(b => b.booking_id === p.booking_id);
            return {
              ...p,
              booking_reference: booking ? booking.booking_reference : 'Unknown',
              booking_date: booking ? booking.booking_date : 'Unknown'
            };
          });

          setPayments(enrichedPayments);
        }
      } catch (err) {
        console.error('Failed to load payment history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [user]);

  return (
    <div>
      <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '1rem', background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' }}>
          <CreditCard size={24} color="white" />
        </div>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: '#0f172a' }}>Payment History</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '1.05rem' }}>View past transactions and invoices.</p>
        </div>
      </div>
      
      {payments.length === 0 ? (
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', borderRadius: '1.5rem', border: '1px solid white', padding: '5rem 2rem', textAlign: 'center', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)' }}>
          <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.1)' }}>
            <FileText size={40} color="#ef4444" />
          </div>
          <h3 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 0.75rem 0', fontWeight: 700 }}>No payment history</h3>
          <p style={{ color: '#64748b', margin: '0', fontSize: '1.1rem' }}>You haven't made any payments yet.</p>
        </div>
      ) : (
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '1.5rem', border: '1px solid white', overflow: 'hidden', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', backgroundColor: 'rgba(248, 250, 252, 0.5)' }}>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Payment ID</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Booking Ref</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Amount</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Method</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment.payment_id || index} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ padding: '1.25rem 1.5rem', color: '#0f172a', fontWeight: 700, fontSize: '1.05rem' }}>
                      #{payment.payment_id}
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', color: '#64748b', fontWeight: 600 }}>
                      {payment.booking_reference}
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', color: '#0f172a', fontWeight: 800, fontSize: '1.1rem' }}>
                      ₹{Number(payment.amount || 0).toFixed(2)}
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <span style={{ 
                        padding: '0.35rem 0.75rem', 
                        backgroundColor: '#f1f5f9', 
                        color: '#475569', 
                        borderRadius: '0.5rem', 
                        fontSize: '0.85rem', 
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.025em'
                      }}>
                        {payment.payment_method || 'CASH'}
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <span style={{ 
                        padding: '0.35rem 0.75rem', 
                        backgroundColor: payment.payment_status === 'COMPLETED' ? '#d1fae5' : '#fef3c7', 
                        color: payment.payment_status === 'COMPLETED' ? '#059669' : '#d97706', 
                        borderRadius: '2rem', 
                        fontSize: '0.75rem', 
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        letterSpacing: '0.025em'
                      }}>
                        {payment.payment_status === 'COMPLETED' ? <CheckCircle size={14} /> : <Clock size={14} />}
                        {payment.payment_status || 'PENDING'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPayments;
