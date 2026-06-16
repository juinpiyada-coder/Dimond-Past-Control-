import React, { useRef, useState, useEffect } from 'react';
import { FiDownload, FiX, FiImage } from 'react-icons/fi';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { apiCall } from '../../utils/api';

const BookingOverview = ({ booking, onClose }) => {
  const printRef = useRef();
  const [images, setImages] = useState([]);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await apiCall('/service-images');
        if (Array.isArray(res)) {
          const bookingImages = res.filter(img => img.booking_id === booking.booking_id);
          setImages(bookingImages);
        }
      } catch (err) {
        console.error('Failed to load images', err);
      }
    };

    const fetchCustomer = async () => {
      try {
        const res2 = await apiCall('/users/' + booking.customer_id);
        if (res2 && !res2.error) {
           setCustomer(res2);
        }
      } catch (err) {
        console.error('Failed to load customer', err);
      }
    };

    if (booking?.booking_id) {
      fetchImages();
    }
    if (booking?.customer_id) {
      fetchCustomer();
    }
  }, [booking]);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;
    
    // Set a solid white background explicitly before capturing
    const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Booking_${booking.booking_reference || booking.booking_id}.pdf`);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '2rem' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '1rem', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header Actions */}
        <div style={{ padding: '1rem 2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 10 }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>Booking Overview</h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleDownloadPdf} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>
              <FiDownload /> Download PDF
            </button>
            <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
              <FiX size={24} />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div ref={printRef} style={{ padding: '3rem', backgroundColor: '#ffffff', color: '#000000' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #e2e8f0', paddingBottom: '2rem', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '2.5rem', color: '#2563eb', fontWeight: 800 }}>Diamond</h1>
              <p style={{ margin: 0, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', fontWeight: 600 }}>Pest Control Services</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#0f172a' }}>BOOKING OVERVIEW</h2>
              <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontWeight: 500 }}>Ref: {booking.booking_reference || `BKG-${booking.booking_id}`}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #f1f5f9' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#475569', textTransform: 'uppercase' }}>Customer Details</h3>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, color: '#0f172a' }}>Name: {customer ? customer.full_name : 'Loading...'}</p>
              <p style={{ margin: '0 0 0.5rem 0', color: '#64748b' }}>Customer ID: {booking.customer_id}</p>
              <p style={{ margin: 0, color: '#64748b' }}>Address ID: {booking.address_id}</p>
            </div>
            <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #f1f5f9' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#475569', textTransform: 'uppercase' }}>Booking Details</h3>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, color: '#0f172a' }}>Date: {booking.booking_date ? new Date(booking.booking_date).toLocaleDateString() : 'N/A'}</p>
              <p style={{ margin: '0 0 0.5rem 0', color: '#64748b' }}>Time: {booking.booking_time || 'N/A'}</p>
              <p style={{ margin: 0, color: '#64748b' }}>Status: <strong style={{ color: booking.status === 'COMPLETED' ? '#166534' : booking.status === 'CANCELLED' ? '#991b1b' : '#b45309' }}>{booking.status}</strong></p>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Service Details</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ textAlign: 'left', padding: '1rem 0', color: '#475569' }}>Description</th>
                  <th style={{ textAlign: 'right', padding: '1rem 0', color: '#475569' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1.5rem 0', fontWeight: 500, color: '#0f172a' }}>
                    Service ID #{booking.service_id}
                    <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem', fontWeight: 'normal' }}>Standard pest control service booking.</div>
                  </td>
                  <td style={{ padding: '1.5rem 0', textAlign: 'right', fontWeight: 500, color: '#0f172a' }}>₹{Number(booking.total_amount || 0).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: '300px', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#64748b' }}>Subtotal</span>
                <span style={{ fontWeight: 500 }}>₹{Number(booking.total_amount || 0).toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
                <span>Total</span>
                <span>₹{Number(booking.total_amount || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {booking.notes && (
            <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#475569', fontSize: '0.875rem', textTransform: 'uppercase' }}>Booking Notes</h4>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>{booking.notes}</p>
            </div>
          )}

          {images.length > 0 && (
            <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#475569', fontSize: '0.875rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiImage /> Attached Photos</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {images.map(img => (
                  <div key={img.service_image_id} style={{ border: '1px solid #e2e8f0', borderRadius: '0.5rem', overflow: 'hidden' }}>
                    <div style={{ backgroundColor: '#f8fafc', padding: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
                      {img.image_category || 'UPLOADED PHOTO'}
                    </div>
                    {img.image_data && img.image_data.startsWith('data:image') ? (
                      <img src={img.image_data} alt="Service Area" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    ) : (
                      <div style={{ padding: '1rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.75rem' }}>Image format not supported for preview</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: '4rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>
            <p>Thank you for choosing Diamond Pest Control Services.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingOverview;
