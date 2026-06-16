import React, { useState, useEffect } from 'react';
import { Camera, Calendar, Clock, CreditCard, ChevronRight, CheckCircle, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/api';

const BookService = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [formData, setFormData] = useState({
    service_id: '',
    date: '',
    time: '',
    paymentMethod: '',
    image_data: null
  });

  useEffect(() => {
    // Check authentication
    const loggedInUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (!loggedInUser) {
      navigate('/profile');
      return;
    }
    setUser(loggedInUser);

    // Fetch live services
    const fetchServices = async () => {
      try {
        const res = await apiCall('/services');
        const servicesArray = Array.isArray(res) ? res : [];
        setServices(servicesArray);

        // Pre-select service if passed in URL
        const params = new URLSearchParams(window.location.search);
        const pestName = params.get('pest');
        if (pestName && servicesArray.length > 0) {
          const matchedService = servicesArray.find(s => s.service_name.toLowerCase() === pestName.toLowerCase());
          if (matchedService) {
            setFormData(prev => ({ ...prev, service_id: matchedService.service_id }));
            setStep(2); // Skip Step 1 and go directly to Schedule
          }
        }
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoadingServices(false);
      }
    };
    
    fetchServices();
  }, [navigate]);

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        if (width > 800) {
          height = Math.round((height * 800) / width);
          width = 800;
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
        setFormData({ ...formData, image_data: compressedBase64 });
      };
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const selectedService = services.find(s => s.service_id === formData.service_id);
      
      const payload = {
        customer_id: user.user_id || user.id,
        service_id: formData.service_id,
        address_id: 1, // Placeholder until address selection is built
        booking_reference: `DPC-${Math.floor(100000 + Math.random() * 900000)}`,
        booking_date: formData.date,
        booking_time: formData.time,
        status: 'PENDING',
        total_amount: selectedService ? selectedService.base_price : 0,
        notes: `Payment Method: ${formData.paymentMethod}`
      };

      const result = await apiCall('/bookings', 'POST', payload);
      
      if (result && !result.error) {
        if (formData.image_data && result.id) {
          await apiCall('/service-images', 'POST', {
            booking_id: result.id,
            employee_id: 1,
            image_category: 'BEFORE',
            image_data: formData.image_data
          });
        }
        // Redirect directly to the payment section
        navigate(`/payment?booking_id=${result.id}`);
      } else {
        throw new Error(result?.error || 'Failed to create booking');
      }
    } catch (err) {
      setSubmitError(err.message || 'An error occurred while booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null; // Prevent flicker while redirecting

  return (
    <div className="book-service-page">
      <div className="page-header">
        <div className="container">
          <h1>Book a Service</h1>
          <p>Get rid of pests in 3 simple steps.</p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="booking-container">
          {/* Progress Bar */}
          <div className="booking-progress">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1. Select Service</div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2. Schedule</div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3. Payment</div>
          </div>

          {submitError && (
            <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid #fca5a5' }}>
              {submitError}
            </div>
          )}

          <form className="booking-form" onSubmit={handleSubmit}>
            {/* Step 1: Select Service */}
            {step === 1 && (
              <div className="form-step">
                <h2>Select Service Type</h2>
                
                {loadingServices ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Loading available services...</div>
                ) : services.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No services available at the moment.</div>
                ) : (
                  <div className="pest-selection-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {services.map(service => (
                      <div 
                        key={service.service_id} 
                        style={{
                          padding: '1.5rem',
                          border: formData.service_id === service.service_id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                          backgroundColor: formData.service_id === service.service_id ? '#eff6ff' : 'white',
                          transition: 'all 0.2s',
                          textAlign: 'center'
                        }}
                        onClick={() => setFormData({...formData, service_id: service.service_id})}
                      >
                        {service.service_image && service.service_image.startsWith('data:image') && (
                           <img src={service.service_image} alt={service.service_name} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '50%', marginBottom: '1rem', border: '2px solid #e2e8f0' }} />
                        )}
                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', color: '#0f172a' }}>{service.service_name}</h3>
                        <div style={{ fontWeight: 600, color: '#2563eb' }}>₹{Number(service.base_price || 0).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="form-actions" style={{ marginTop: '2rem' }}>
                  <button type="button" className="btn btn-primary" onClick={handleNext} disabled={!formData.service_id}>
                    Next Step <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <div className="form-step">
                <h2>Schedule Your Service</h2>
                
                <div className="form-group">
                  <label><Calendar size={18} /> Choose Date</label>
                  <input type="date" required className="form-control" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                </div>
                
                <div className="form-group">
                  <label><Clock size={18} /> Choose Time Slot</label>
                  <select required className="form-control" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})}>
                    <option value="">Select a time slot</option>
                    <option value="08:00">Morning (8 AM - 12 PM)</option>
                    <option value="12:00">Afternoon (12 PM - 4 PM)</option>
                    <option value="16:00">Evening (4 PM - 8 PM)</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label><Camera size={18} /> Upload Photo of Infested Area (Optional)</label>
                  <div style={{ border: '2px dashed #cbd5e1', padding: '2rem', textAlign: 'center', borderRadius: '0.5rem', marginTop: '0.5rem', backgroundColor: '#f8fafc' }}>
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginBottom: '1rem' }} />
                    <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>Upload a photo so our technicians know what to expect. Image will be compressed automatically.</p>
                    {formData.image_data && (
                      <div style={{ marginTop: '1rem' }}>
                        <img src={formData.image_data} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label style={{ color: '#64748b', fontSize: '0.875rem' }}><ShieldAlert size={16} /> Service address will default to your primary profile address.</label>
                </div>

                <div className="form-actions space-between">
                  <button type="button" className="btn btn-secondary" onClick={handlePrev}>Back</button>
                  <button type="button" className="btn btn-primary" onClick={handleNext} disabled={!formData.date || !formData.time}>
                    Next Step <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="form-step">
                <h2>Payment Details</h2>
                
                <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#475569' }}>Order Summary</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
                    <span>Total to Pay:</span>
                    <span>₹{services.find(s => s.service_id === formData.service_id) ? Number(services.find(s => s.service_id === formData.service_id).base_price || 0).toFixed(2) : '0.00'}</span>
                  </div>
                </div>

                <div className="payment-options">
                  <label className={`payment-option ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value="upi" onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} />
                    UPI (Google Pay, PhonePe)
                  </label>
                  <label className={`payment-option ${formData.paymentMethod === 'cards' ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value="cards" onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} />
                    Credit / Debit Card
                  </label>
                  <label className={`payment-option ${formData.paymentMethod === 'cash' ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value="cash" onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} />
                    Pay with Cash After Service
                  </label>
                </div>

                <div className="form-actions space-between">
                  <button type="button" className="btn btn-secondary" disabled={isSubmitting} onClick={handlePrev}>Back</button>
                  <button type="submit" className="btn btn-primary" disabled={!formData.paymentMethod || isSubmitting}>
                    {isSubmitting ? 'Processing Booking...' : 'Confirm Booking & Pay'}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <div className="form-step text-center success-step">
                <CheckCircle size={64} className="success-icon" style={{ margin: '0 auto', color: '#10b981' }} />
                <h2 style={{ marginTop: '1rem' }}>Booking Confirmed!</h2>
                <p>Your pest control service has been successfully scheduled for {new Date(formData.date).toLocaleDateString()}.</p>
                <button type="button" className="btn btn-primary mt-4" onClick={() => window.location.href='/user-dashboard'}>
                  Go to My Dashboard
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookService;
