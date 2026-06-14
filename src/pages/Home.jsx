import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, ThumbsUp, ArrowRight, Bug, Home as HomeIcon, CheckCircle2, Star, ChevronDown, ChevronUp, PhoneCall, Quote } from 'lucide-react';


const Home = () => {
  const [openFaq, setOpenFaq] = useState(1);

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  const testimonials = [
    {
      name: "Angan Chakraborty",
      text: "Excellent!! From start to finish, the communication was excellent, and they addressed all my concerns promptly. I highly recommend their services to anyone in need of reliable pest control solutions. Services of 'Diamond Pest Control' is only a phone-call away. Cordial and effective services rendered by it is an experience in itself. Dependability is its asset."
    },
    {
      name: "AJIT Yadav",
      text: "Exceptional service! Diamond Pest Control Pvt Ltd exceeded my expectations. Their team was professional, knowledgeable, and efficient in handling my pest issues. From start to finish, the communication was excellent, and they addressed all my concerns promptly. I highly recommend their services."
    },
    {
      name: "Rinky Chowdhury",
      text: "I recently booked their services for bedbugs. We had to take two sittings, however their service is absolutely satisfactory. They have provided very good relief from this serious concern we had been facing having a child at home. They are punctual and very fast at replying. I am very much happy with their performance. Thank you ! Would surely recommend"
    }
  ];

  const faqs = [
    {
      question: "1. What pests do you treat?",
      answer: "We handle a wide range of pests, including ants, rodents, cockroaches, termites, and more."
    },
    {
      question: "2. How often are treatments needed?",
      answer: "The frequency of treatments depends on the type of pest and the severity of the infestation. We provide customized maintenance plans tailored to your needs."
    },
    {
      question: "3. Are your treatments safe for pets and children?",
      answer: "Yes, we use eco-friendly and industry-approved chemicals that are safe for your family, children, and pets."
    },
    {
      question: "4. What can I expect during a treatment?",
      answer: "Our technicians will perform a thorough inspection, apply targeted treatments to affected areas, and provide recommendations to prevent future infestations."
    },
    {
      question: "5. Do you offer warranties or guarantees?",
      answer: "Yes, we ensure complete pest removal and offer warranties on our long-term protection packages. If pests return, so do we!"
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <span className="hero-subtitle">Kolkata's Biggest Pest Control Company</span>
          <h1>Welcome To Diamond Pest Control</h1>
          <p>The most trusted and reliable company providing the best pest control solutions in India. We are constantly pushing the envelope with innovations in the niche industry. Today, we take pride in identifying ourselves as the pioneers of the pest management industry.</p>
          <div className="hero-actions">
            <Link to="/book" className="btn btn-primary">Book Now</Link>
            <Link to="/contact" className="btn btn-secondary"><PhoneCall size={18} /> Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="intro-section section-padding container">
        <div className="intro-grid">
          <div className="intro-text">
            <h4 className="section-subtitle">Pest Control Professional</h4>
            <h2 className="section-title text-left">Welcome To Diamond Pest Control</h2>
            <p>Are you tired of dealing with cockroaches, termites, bed bugs, or rodents? Don't worry, Diamond Pest Control is here to help. We provide safe, affordable, and effective pest control services to protect your home, office, and surroundings from unwanted pests.</p>
            <p>Our team of trained professionals uses modern equipment and eco-friendly products to ensure complete pest removal without harming your family, pets, or the environment. Whether you're facing a small problem or a major infestation, we're ready to provide fast and reliable solutions.</p>
            <p>We understand that every customer and every property is different. That's why we offer customized pest control plans designed to suit your specific needs. From one-time treatments to regular maintenance services, we make sure your space stays pest-free all year round.</p>
            <div className="intro-actions">
              <Link to="/contact" className="btn btn-primary"><PhoneCall size={18} /> Call Now</Link>
              <Link to="/pricing" className="btn btn-secondary">Get a quote</Link>
            </div>
          </div>
          <div className="intro-image">
            <img src="/WhatsApp-Image-2026-05-21-at-4.46.12-PM.jpeg" alt="Diamond Pest Control professional" className="featured-image" />
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="who-we-are bg-light section-padding">
        <div className="container intro-grid">
          <div className="intro-image">
            <div className="image-placeholder secondary-bg">
              <ThumbsUp size={100} className="placeholder-icon" />
            </div>
          </div>
          <div className="intro-text">
            <h4 className="section-subtitle">WHO WE ARE</h4>
            <h2 className="section-title text-left">The Trusted Authority in Pest Control</h2>
            <p>At our company, we believe every home and business deserves a safe, clean, and pest-free environment. With years of industry experience, our expert team provides reliable and effective pest control solutions tailored to your needs. From termites and rodents to mosquitoes and cockroaches, we use advanced methods and eco-friendly treatments to protect your property with long-lasting results.</p>
            <ul className="checklist">
              <li><CheckCircle2 className="check-icon" /> Exceed your expectations</li>
              <li><CheckCircle2 className="check-icon" /> Deliver 100% satisfaction</li>
              <li><CheckCircle2 className="check-icon" /> Professional Expert</li>
              <li><CheckCircle2 className="check-icon" /> Premium support 24/7</li>
            </ul>
            <Link to="/about" className="btn btn-primary mt-4">Discover more</Link>
          </div>
        </div>
      </section>

      {/* Our Achievement Banner */}
      <section className="achievements-banner">
        <div className="container">
          <h4 className="section-subtitle white">OUR ACHIEVEMENT</h4>
          <h2>Celebrating Excellence in Pest Control</h2>
          <div className="achievement-stats">
            <div className="stat-box">
              <h3>5000+</h3>
              <p>Happy Clients</p>
            </div>
            <div className="stat-box">
              <h3>15+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat-box">
              <h3>100%</h3>
              <p>Safe Chemicals</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="services-snippet section-padding">
        <div className="container">
          <h4 className="section-subtitle text-center">WHAT WE OFFER</h4>
          <h2 className="section-title text-center">Eliminate Unwanted Pests</h2>
          <div className="services-grid">
            <div className="service-card">
              <Bug size={40} className="service-icon" />
              <h3>Cockroaches</h3>
              <p>Complete eradication of cockroach infestations.</p>
            </div>
            <div className="service-card">
              <HomeIcon size={40} className="service-icon" />
              <h3>Termites</h3>
              <p>Protect your property's structure from termite damage.</p>
            </div>
            <div className="service-card">
              <Bug size={40} className="service-icon" />
              <h3>Bed Bugs</h3>
              <p>Sleep peacefully with our specialized bed bug treatments.</p>
            </div>
            <div className="service-card">
              <Bug size={40} className="service-icon" />
              <h3>Rodents</h3>
              <p>Effective trapping and exclusion of rats and mice.</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link to="/services" className="btn btn-secondary">View All Services <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us bg-light section-padding">
        <div className="container">
          <div className="why-choose-grid">
            <div className="why-choose-text">
              <h4 className="section-subtitle">Why Choose Us</h4>
              <h2 className="section-title text-left">Diamond Pest Control</h2>
              <div className="feature-list">
                <div className="feature-item">
                  <Shield className="feature-list-icon" />
                  <div>
                    <h4>Experienced Professionals</h4>
                    <p>Our skilled pest control technicians use modern equipment and proven methods to deliver reliable results.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <ThumbsUp className="feature-list-icon" />
                  <div>
                    <h4>Safe & Eco-Friendly Solutions</h4>
                    <p>We use industry-approved chemicals and treatments that are safe for families, pets, and the environment.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <Star className="feature-list-icon" />
                  <div>
                    <h4>Affordable Pricing</h4>
                    <p>Transparent pricing with no hidden charges. Customized pest control packages for every budget.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <Clock className="feature-list-icon" />
                  <div>
                    <h4>Quick Response Time</h4>
                    <p>We provide fast scheduling and emergency pest control support when you need it most.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <Shield className="feature-list-icon" />
                  <div>
                    <h4>Long-Term Protection</h4>
                    <p>Our preventive treatments help keep pests away for the long term.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="why-choose-checklist-box">
              <h3>We Guarantee Quality</h3>
              <ul className="checklist">
                <li><CheckCircle2 className="check-icon" /> Exceed your expectations</li>
                <li><CheckCircle2 className="check-icon" /> Deliver 100% satisfaction</li>
                <li><CheckCircle2 className="check-icon" /> Professional Expert</li>
                <li><CheckCircle2 className="check-icon" /> Premium support 24/7</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials section-padding">
        <div className="container">
          <h4 className="section-subtitle text-center">TESTIMONIALS</h4>
          <h2 className="section-title text-center">WHAT OUR CLIENT SAYS</h2>
          
          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div key={idx} className="testimonial-card">
                <Quote size={40} className="quote-icon" />
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <h4>{t.name}</h4>
                  <span>Pest control service in kolkata</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section bg-light section-padding">
        <div className="container faq-container">
          <div className="faq-header">
            <h4 className="section-subtitle">Frequently Asked</h4>
            <h2 className="section-title text-left">Have Any Question?</h2>
            <h3 className="sub-heading">Professional Residential And Commercial pest control service</h3>
            <p>Diamond Pest Control: Your ultimate pest solution. We offer expert residential and commercial pest control services. Our skilled technicians use safe and effective methods to eliminate infestations. Enjoy peace of mind with our comprehensive protection plans.</p>
            <div className="mt-4">
              <Link to="/contact" className="btn btn-primary">Contact Us</Link>
            </div>
          </div>
          
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${openFaq === index ? 'active' : ''}`}>
                <button className="faq-question" onClick={() => toggleFaq(index)}>
                  {faq.question}
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <div className="faq-answer">
                  <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
                </div>
              </div>
            ))}
            <div className="faq-footer-help mt-4">
              <h4>Still have questions?</h4>
              <Link to="/contact" className="btn btn-secondary mt-2">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
