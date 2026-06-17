import React, { useState, useEffect } from 'react';
import { CreditCard, FileText } from 'lucide-react';
import { apiCall } from '../../utils/api';
import Skeleton from '../../components/Skeleton';

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <CreditCard size={32} color="#2563eb" />
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Payment History</h1>
        </div>
      </div>
      
      {loading ? (
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem' }}><Skeleton height="20px" width="100px" /></th>
                <th style={{ padding: '1rem 1.5rem' }}><Skeleton height="20px" width="100px" /></th>
                <th style={{ padding: '1rem 1.5rem' }}><Skeleton height="20px" width="80px" /></th>
                <th style={{ padding: '1rem 1.5rem' }}><Skeleton height="20px" width="80px" /></th>
                <th style={{ padding: '1rem 1.5rem' }}><Skeleton height="20px" width="80px" /></th>
              </tr>
            </thead>
            <tbody>
              {Array(4).fill(0).map((_, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem 1.5rem' }}><Skeleton height="20px" width="60px" /></td>
                  <td style={{ padding: '1rem 1.5rem' }}><Skeleton height="20px" width="120px" /></td>
                  <td style={{ padding: '1rem 1.5rem' }}><Skeleton height="20px" width="80px" /></td>
                  <td style={{ padding: '1rem 1.5rem' }}><Skeleton height="20px" width="60px" /></td>
                  <td style={{ padding: '1rem 1.5rem' }}><Skeleton height="24px" width="80px" borderRadius="12px" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : payments.length === 0 ? (
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e2e8f0', padding: '3rem', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', backgroundColor: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <FileText size={32} color="#3b82f6" />
          </div>
          <h3 style={{ fontSize: '1.25rem', color: '#0f172a', margin: '0 0 0.5rem 0' }}>No payment history</h3>
          <p style={{ color: '#64748b', margin: '0' }}>You haven't made any payments yet.</p>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: 600 }}>Payment ID</th>
                <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: 600 }}>Booking Ref</th>
                <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: 600 }}>Amount</th>
                <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: 600 }}>Method</th>
                <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment.payment_id || index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem 1.5rem', color: '#0f172a', fontWeight: 500 }}>#{payment.payment_id}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#64748b' }}>{payment.booking_reference}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#0f172a', fontWeight: 600 }}>₹{Number(payment.amount || 0).toFixed(2)}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#64748b', textTransform: 'uppercase' }}>{payment.payment_method || 'N/A'}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      backgroundColor: payment.payment_status === 'COMPLETED' ? '#dcfce7' : '#fef3c7', 
                      color: payment.payment_status === 'COMPLETED' ? '#166534' : '#b45309', 
                      borderRadius: '9999px', 
                      fontSize: '0.75rem', 
                      fontWeight: 600 
                    }}>
                      {payment.payment_status || 'PENDING'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerPayments;
