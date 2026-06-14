import React from 'react';
import { Download, Calendar, MapPin, CheckCircle, Clock } from 'lucide-react';


const Bookings = () => {
  const bookings = [
    {
      id: 'BKG-7829',
      service: 'Termite Treatment',
      date: '2026-06-20',
      time: 'Morning (8 AM - 12 PM)',
      status: 'upcoming',
      price: '$150'
    },
    {
      id: 'BKG-6412',
      service: 'Cockroach Eradication',
      date: '2026-05-12',
      time: 'Afternoon (12 PM - 4 PM)',
      status: 'completed',
      price: '$85'
    }
  ];

  return (
    <div className="bookings-page">
      <div className="container section-padding">
        <h1 className="section-title">My Bookings</h1>
        
        <div className="bookings-list">
          {bookings.map(booking => (
            <div key={booking.id} className={`booking-card ${booking.status}`}>
              <div className="booking-header">
                <div className="booking-id">
                  <h3>{booking.service}</h3>
                  <span className="id-badge">#{booking.id}</span>
                </div>
                <div className={`status-badge ${booking.status}`}>
                  {booking.status === 'completed' ? <CheckCircle size={16} /> : <Clock size={16} />}
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </div>
              </div>
              
              <div className="booking-body">
                <div className="booking-info">
                  <p><Calendar size={18} /> {booking.date} | {booking.time}</p>
                  <p><MapPin size={18} /> 123 Clean Street, NY</p>
                </div>
                <div className="booking-price">
                  <h4>{booking.price}</h4>
                  {booking.status === 'completed' && (
                    <button className="btn btn-secondary btn-sm">
                      <Download size={16} /> Invoice
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
