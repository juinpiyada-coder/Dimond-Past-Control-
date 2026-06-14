import React, { useState } from 'react';
import { Camera, Calendar, Clock, CreditCard, ChevronRight, CheckCircle } from 'lucide-react';


const BookService = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pestType: '',
    date: '',
    time: '',
    photos: null,
    paymentMethod: ''
  });

  const pestTypes = ['Cockroach', 'Termite', 'Bed Bug', 'Rodent', 'Mosquito', 'Ants', 'General Pest Control'];

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(4); // Success step
  };

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
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1. Details</div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2. Schedule & Photos</div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3. Payment</div>
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            {/* Step 1: Pest Type */}
            {step === 1 && (
              <div className="form-step">
                <h2>Select Pest Type</h2>
                <div className="pest-selection-grid">
                  {pestTypes.map(pest => (
                    <div 
                      key={pest} 
                      className={`pest-option ${formData.pestType === pest ? 'selected' : ''}`}
                      onClick={() => setFormData({...formData, pestType: pest})}
                    >
                      {pest}
                    </div>
                  ))}
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-primary" onClick={handleNext} disabled={!formData.pestType}>
                    Next Step <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Date, Time & Photos */}
            {step === 2 && (
              <div className="form-step">
                <h2>Schedule & Upload</h2>
                
                <div className="form-group">
                  <label><Calendar size={18} /> Choose Date</label>
                  <input type="date" className="form-control" onChange={(e) => setFormData({...formData, date: e.target.value})} />
                </div>
                
                <div className="form-group">
                  <label><Clock size={18} /> Choose Time</label>
                  <select className="form-control" onChange={(e) => setFormData({...formData, time: e.target.value})}>
                    <option value="">Select a time slot</option>
                    <option value="morning">Morning (8 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 8 PM)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label><Camera size={18} /> Upload Photos of Infestation (Optional)</label>
                  <div className="photo-upload-area">
                    <input type="file" multiple className="file-input" />
                    <p>Drag & drop or click to upload</p>
                  </div>
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
                <div className="payment-options">
                  <label className={`payment-option ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value="upi" onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} />
                    UPI (Google Pay, PhonePe)
                  </label>
                  <label className={`payment-option ${formData.paymentMethod === 'cards' ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value="cards" onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} />
                    Credit / Debit Card
                  </label>
                  <label className={`payment-option ${formData.paymentMethod === 'netbanking' ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value="netbanking" onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} />
                    Net Banking
                  </label>
                </div>

                <div className="form-actions space-between">
                  <button type="button" className="btn btn-secondary" onClick={handlePrev}>Back</button>
                  <button type="submit" className="btn btn-primary" disabled={!formData.paymentMethod}>
                    Confirm Booking & Pay
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <div className="form-step text-center success-step">
                <CheckCircle size={64} className="success-icon" />
                <h2>Booking Confirmed!</h2>
                <p>Your service for {formData.pestType} has been scheduled for {formData.date}.</p>
                <button type="button" className="btn btn-primary mt-4" onClick={() => window.location.href='/bookings'}>
                  View My Bookings
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
