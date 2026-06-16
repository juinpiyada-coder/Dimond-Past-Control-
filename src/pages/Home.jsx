import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Video, Grid, User, ShoppingCart, MapPin, Search, Menu, X, ArrowRight, Bug, Activity, Shield, Clock, ThumbsUp, Star, ChevronDown, CheckCircle2, PhoneCall, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { GiRat, GiAnt } from 'react-icons/gi';
import { FaBug, FaBugs, FaMosquito, FaLocust } from 'react-icons/fa6';
import { FaBed } from 'react-icons/fa';
import { mockServices } from '../utils/mockData';

const Home = () => {
  const [services, setServices] = useState(mockServices);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Force hide loader after 300ms no matter what
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    if (apiUrl) {
      fetch(`${apiUrl}/services`)
        .then(r => r.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setServices(data);
          }
          clearTimeout(timer);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch services", err);
          clearTimeout(timer);
          setLoading(false);
        });
    }

    return () => clearTimeout(timer);
  }, []);

  const pestCategories = [
    { name: "Cockroaches", icon: <FaBugs size={24} color="#666" /> },
    { name: "Termites", icon: <FaBug size={24} color="#666" /> },
    { name: "Bed Bugs", icon: <FaBed size={24} color="#666" /> },
    { name: "Rodents", icon: <GiRat size={24} color="#666" /> },
    { name: "Mosquitoes", icon: <FaMosquito size={24} color="#666" /> },
    { name: "Ants", icon: <GiAnt size={24} color="#666" /> },
    { name: "Wood Borer", icon: <FaLocust size={24} color="#666" /> },
  ];

  
  const [openFaq, setOpenFaq] = useState(1);

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  const testimonials = [
    { name: "Angan Chakraborty", text: "Excellent!! From start to finish, the communication was excellent, and they addressed all my concerns promptly. I highly recommend their services to anyone in need of reliable pest control solutions. Services of 'Diamond Pest Control' is only a phone-call away. Cordial and effective services rendered by it is an experience in itself. Dependability is its asset." },
    { name: "AJIT Yadav", text: "Exceptional service! Diamond Pest Control Pvt Ltd exceeded my expectations. Their team was professional, knowledgeable, and efficient in handling my pest issues. From start to finish, the communication was excellent, and they addressed all my concerns promptly. I highly recommend their services." },
    { name: "Rinky Chowdhury", text: "I recently booked their services for bedbugs. We had to take two sittings, however their service is absolutely satisfactory. They have provided very good relief from this serious concern we had been facing having a child at home. They are punctual and very fast at replying. I am very much happy with their performance. Thank you ! Would surely recommend" }
  ];

  const faqs = [
    { question: "1. What pests do you treat?", answer: "We handle a wide range of pests, including ants, rodents, cockroaches, termites, and more." },
    { question: "2. How often are treatments needed?", answer: "The frequency of treatments depends on the type of pest and the severity of the infestation. We provide customized maintenance plans tailored to your needs." },
    { question: "3. Are your treatments safe for pets and children?", answer: "Yes, we use eco-friendly and industry-approved chemicals that are safe for your family, children, and pets." },
    { question: "4. What can I expect during a treatment?", answer: "Our technicians will perform a thorough inspection, apply targeted treatments to affected areas, and provide recommendations to prevent future infestations." },
    { question: "5. Do you offer warranties or guarantees?", answer: "Yes, we ensure complete pest removal and offer warranties on our long-term protection packages. If pests return, so do we!" }
  ];

  const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
  const fadeInLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } };
  const fadeInRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } };
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };

  return (
    <div className="fk-home-container">
      {/* Sidebar Overlay */}
      <div 
        className={`fk-sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div className={`fk-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="fk-sidebar-header">
          <div className="fk-sidebar-avatar"><User size={24} /></div>
          <div>
            <div style={{ fontWeight: 'bold' }}>Hello, User</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Login / Sign Up</div>
          </div>
          <X 
            size={24} 
            style={{ marginLeft: 'auto', cursor: 'pointer' }} 
            onClick={() => setIsSidebarOpen(false)} 
          />
        </div>
        <ul className="fk-sidebar-menu">
          <li className="fk-sidebar-menu-item" style={{ background: '#f0f0f0', color: '#666', fontSize: '0.9rem', padding: '10px 20px' }}>
            PEST CATEGORIES
          </li>
          {pestCategories.map((cat, idx) => (
            <Link key={idx} to={`/service/${encodeURIComponent(cat.name)}`} className="fk-sidebar-menu-item" onClick={() => setIsSidebarOpen(false)}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px' }}>
                {React.cloneElement(cat.icon, { size: 20, color: "#878787" })}
              </div> 
              {cat.name} Treatment
            </Link>
          ))}
          <li className="fk-sidebar-menu-item" style={{ background: '#f0f0f0', color: '#666', fontSize: '0.9rem', padding: '10px 20px' }}>
            QUICK LINKS
          </li>
          <Link to="/about" className="fk-sidebar-menu-item" onClick={() => setIsSidebarOpen(false)}>
            <Activity size={20} color="#878787" /> About Us
          </Link>
          <Link to="/contact" className="fk-sidebar-menu-item" onClick={() => setIsSidebarOpen(false)}>
            <Shield size={20} color="#878787" /> Customer Support
          </Link>
        </ul>
      </div>

      {/* Top Bar / Location (Flipkart style) */}
      <div style={{ background: 'var(--primary, #FFEE00)', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }} className="fk-hide-default">
        <Menu size={24} color="#111" onClick={() => setIsSidebarOpen(true)} style={{ cursor: 'pointer' }} />
        <div style={{ flexGrow: 1, background: 'rgba(255,255,255,0.9)', padding: '8px 12px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={16} color="#666" />
          <span style={{ fontSize: '0.85rem', color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Kolkata, West Bengal
          </span>
        </div>
      </div>

      {/* Category Ribbon */}
      <div className="fk-category-ribbon">
        <div className="fk-category-item" onClick={() => setIsSidebarOpen(true)}>
          <div className="fk-category-icon-wrapper" style={{ background: '#e0e0e0' }}>
            <Menu size={24} color="#666" />
          </div>
          <span className="fk-category-text">All Pests</span>
        </div>
        {pestCategories.map((cat, idx) => (
          <Link to={`/service/${encodeURIComponent(cat.name)}`} key={idx} className="fk-category-item" style={{ textDecoration: 'none' }}>
            <div className="fk-category-icon-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {cat.icon}
            </div>
            <span className="fk-category-text">{cat.name}</span>
          </Link>
        ))}
      </div>

      {/* Promotional Banner */}
      <div className="fk-promo-banner-container">
        <div className="fk-promo-banner">
          <img src="/WhatsApp-Image-2026-05-21-at-4.46.12-PM.jpeg" alt="Pest Control Sale" style={{ height: '200px', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(255,238,0,0.9)', padding: '10px 15px', borderRadius: '8px' }}>
            <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#111' }}>Epic Monsoon Sale</h2>
            <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', color: '#c40000' }}>Flat ₹500 Off*</p>
          </div>
        </div>
      </div>

      {/* Yellow Deals Section */}
      <div className="fk-yellow-deals-section">
        <div className="fk-deals-header">
          <span className="fk-deals-title">Top Pest Treatments</span>
          <Link to="/services" style={{ background: '#2874f0', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="fk-deals-scroll">
          {loading ? (
            Array(4).fill(0).map((_, idx) => (
              <div key={idx} className="fk-deal-card" style={{ opacity: 0.5 }}>Loading...</div>
            ))
          ) : (
            services.slice(0, 5).map((service, idx) => (
              <div key={idx} className="fk-deal-card" onClick={() => navigate(`/service/${encodeURIComponent(service.service_name)}`)}>
                <img 
                  src={service.service_image?.startsWith('/') ? `${(import.meta.env.VITE_API_BASE_URL || '').replace('/api', '')}${service.service_image}` : (service.service_image || '/logo.png')} 
                  alt={service.service_name} 
                  className="fk-deal-card-img" 
                  onError={(e) => { e.target.onerror = null; e.target.src = '/logo.png'; }}
                />
                <span className="fk-deal-card-title">{service.service_name}</span>
                <span className="fk-deal-card-action">Book Now</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Suggested For You Grid */}
      <div className="fk-suggested-section">
        <div className="fk-suggested-header">
          Suggested For You
          <span style={{ fontSize: '0.8rem', color: '#878787', fontWeight: 'normal' }}>Sponsored</span>
        </div>
        <div className="fk-suggested-grid">
          {loading ? null : services.map((service, idx) => (
            <div key={idx} className="fk-suggested-card" onClick={() => navigate(`/service/${encodeURIComponent(service.service_name)}`)}>
              <div className="fk-suggested-card-img-wrapper">
                <img 
                  src={service.service_image?.startsWith('/') ? `${(import.meta.env.VITE_API_BASE_URL || '').replace('/api', '')}${service.service_image}` : (service.service_image || '/logo.png')} 
                  alt={service.service_name} 
                  className="fk-suggested-card-img"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/logo.png'; }}
                />
              </div>
              <div className="fk-suggested-card-body">
                <div className="fk-suggested-card-title">{service.service_name} Treatment</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontWeight: 'bold', color: '#212121' }}>₹{service.base_price}</span>
                  <span style={{ fontSize: '0.75rem', color: '#878787', textDecoration: 'line-through' }}>₹{service.base_price + 500}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      

      {/* Legacy Content Integrated Below E-commerce layout */}
      <div className="legacy-content-wrapper" style={{ paddingBottom: '80px', backgroundColor: '#fff' }}>
        
        {/* Intro Section */}
        <section className="intro-section section-padding container" style={{ marginTop: '20px' }}>
          <div className="intro-grid">
            <motion.div className="intro-text" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
              <motion.h4 variants={fadeInLeft} className="section-subtitle">Pest Control Professional</motion.h4>
              <motion.h2 variants={fadeInLeft} className="section-title text-left">Welcome To Diamond Pest Control</motion.h2>
              <motion.p variants={fadeInLeft}>Are you tired of dealing with cockroaches, termites, bed bugs, or rodents? Don't worry, Diamond Pest Control is here to help. We provide safe, affordable, and effective pest control services to protect your home, office, and surroundings from unwanted pests.</motion.p>
              <motion.p variants={fadeInLeft}>Our team of trained professionals uses modern equipment and eco-friendly products to ensure complete pest removal without harming your family, pets, or the environment. Whether you're facing a small problem or a major infestation, we're ready to provide fast and reliable solutions.</motion.p>
              <motion.p variants={fadeInLeft}>We understand that every customer and every property is different. That's why we offer customized pest control plans designed to suit your specific needs. From one-time treatments to regular maintenance services, we make sure your space stays pest-free all year round.</motion.p>
              <motion.div variants={fadeInLeft} className="intro-actions mt-6">
                <Link to="/contact" className="btn btn-primary"><PhoneCall size={18} /> Call Now</Link>
                <Link to="/pricing" className="btn btn-secondary">Get a quote</Link>
              </motion.div>
            </motion.div>
            <motion.div className="intro-image" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInRight}>
              <motion.img whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }} src="/WhatsApp-Image-2026-05-21-at-4.46.12-PM.jpeg" alt="Diamond Pest Control professional" className="featured-image rounded-2xl shadow-2xl" />
            </motion.div>
          </div>
        </section>

        {/* Who We Are */}
        <section className="who-we-are bg-light section-padding">
          <div className="container intro-grid">
            <motion.div className="intro-image" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInLeft}>
              <motion.div whileHover={{ rotate: 5, scale: 1.05 }} className="image-placeholder secondary-bg shadow-xl">
                <ThumbsUp size={100} className="placeholder-icon" />
              </motion.div>
            </motion.div>
            <motion.div className="intro-text" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
              <motion.h4 variants={fadeInRight} className="section-subtitle">WHO WE ARE</motion.h4>
              <motion.h2 variants={fadeInRight} className="section-title text-left">The Trusted Authority in Pest Control</motion.h2>
              <motion.p variants={fadeInRight}>At our company, we believe every home and business deserves a safe, clean, and pest-free environment. With years of industry experience, our expert team provides reliable and effective pest control solutions tailored to your needs. From termites and rodents to mosquitoes and cockroaches, we use advanced methods and eco-friendly treatments to protect your property with long-lasting results.</motion.p>
              <motion.ul variants={staggerContainer} className="checklist">
                <motion.li variants={fadeInRight}><CheckCircle2 className="check-icon" /> Exceed your expectations</motion.li>
                <motion.li variants={fadeInRight}><CheckCircle2 className="check-icon" /> Deliver 100% satisfaction</motion.li>
                <motion.li variants={fadeInRight}><CheckCircle2 className="check-icon" /> Professional Expert</motion.li>
                <motion.li variants={fadeInRight}><CheckCircle2 className="check-icon" /> Premium support 24/7</motion.li>
              </motion.ul>
              <motion.div variants={fadeInRight}>
                <Link to="/about" className="btn btn-primary mt-6">Discover more</Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Our Achievement Banner */}
        <motion.section className="achievements-banner" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <div className="container">
            <motion.h4 variants={fadeInUp} className="section-subtitle white">OUR ACHIEVEMENT</motion.h4>
            <motion.h2 variants={fadeInUp}>Celebrating Excellence in Pest Control</motion.h2>
            <motion.div variants={staggerContainer} className="achievement-stats">
              <motion.div variants={fadeInUp} className="stat-box"><h3>5000+</h3><p>Happy Clients</p></motion.div>
              <motion.div variants={fadeInUp} className="stat-box"><h3>15+</h3><p>Years Experience</p></motion.div>
              <motion.div variants={fadeInUp} className="stat-box"><h3>100%</h3><p>Safe Chemicals</p></motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <section className="why-choose-us bg-light section-padding">
          <div className="container">
            <div className="why-choose-grid">
              <motion.div className="why-choose-text" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
                <motion.h4 variants={fadeInLeft} className="section-subtitle">Why Choose Us</motion.h4>
                <motion.h2 variants={fadeInLeft} className="section-title text-left">Diamond Pest Control</motion.h2>
                <div className="feature-list mt-8">
                  {[
                    { icon: <Shield className="feature-list-icon" />, title: "Experienced Professionals", desc: "Our skilled pest control technicians use modern equipment and proven methods to deliver reliable results." },
                    { icon: <ThumbsUp className="feature-list-icon" />, title: "Safe & Eco-Friendly Solutions", desc: "We use industry-approved chemicals and treatments that are safe for families, pets, and the environment." },
                    { icon: <Star className="feature-list-icon" />, title: "Affordable Pricing", desc: "Transparent pricing with no hidden charges. Customized pest control packages for every budget." },
                    { icon: <Clock className="feature-list-icon" />, title: "Quick Response Time", desc: "We provide fast scheduling and emergency pest control support when you need it most." }
                  ].map((item, idx) => (
                    <motion.div key={idx} variants={fadeInLeft} className="feature-item">
                      <motion.div whileHover={{ rotate: 15, scale: 1.1 }}>{item.icon}</motion.div>
                      <div><h4>{item.title}</h4><p>{item.desc}</p></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInRight} className="why-choose-checklist-box shadow-2xl">
                <h3>We Guarantee Quality</h3>
                <ul className="checklist">
                  <li><CheckCircle2 className="check-icon" /> Exceed your expectations</li>
                  <li><CheckCircle2 className="check-icon" /> Deliver 100% satisfaction</li>
                  <li><CheckCircle2 className="check-icon" /> Professional Expert</li>
                  <li><CheckCircle2 className="check-icon" /> Premium support 24/7</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials section-padding">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.h4 variants={fadeInUp} className="section-subtitle text-center">TESTIMONIALS</motion.h4>
              <motion.h2 variants={fadeInUp} className="section-title text-center">WHAT OUR CLIENT SAYS</motion.h2>
            </motion.div>
            <div className="mt-10" style={{ cursor: 'grab', overflow: 'hidden' }}>
              <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 30 }} style={{ display: 'flex', gap: '2rem', width: 'max-content' }} whileHover={{ animationPlayState: 'paused' }}>
                {[...testimonials, ...testimonials].map((t, idx) => (
                  <div key={idx} className="testimonial-card shadow-lg" style={{ minWidth: 'min(100vw - 40px, 350px)', maxWidth: '400px', whiteSpace: 'normal', flexShrink: 0 }}>
                    <Quote size={40} className="quote-icon opacity-20" />
                    <p className="testimonial-text">"{t.text}"</p>
                    <div className="testimonial-author">
                      <h4>{t.name}</h4>
                      <span>Pest control service in kolkata</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section bg-light section-padding">
          <div className="container faq-container">
            <motion.div className="faq-header" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
              <motion.h4 variants={fadeInLeft} className="section-subtitle">Frequently Asked</motion.h4>
              <motion.h2 variants={fadeInLeft} className="section-title text-left">Have Any Question?</motion.h2>
              <motion.h3 variants={fadeInLeft} className="sub-heading mt-4">Professional Residential And Commercial pest control service</motion.h3>
              <motion.p variants={fadeInLeft}>Diamond Pest Control: Your ultimate pest solution. We offer expert residential and commercial pest control services. Our skilled technicians use safe and effective methods to eliminate infestations. Enjoy peace of mind with our comprehensive protection plans.</motion.p>
              <motion.div variants={fadeInLeft} className="mt-8">
                <Link to="/contact" className="btn btn-primary">Contact Us</Link>
              </motion.div>
            </motion.div>
            <motion.div className="faq-list" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={fadeInRight} className={`faq-item ${openFaq === index ? 'active' : ''}`}>
                  <button className="faq-question" onClick={() => toggleFaq(index)}>
                    {faq.question}
                    <motion.div animate={{ rotate: openFaq === index ? 180 : 0 }}>
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>
                  <motion.div initial={false} animate={{ height: openFaq === index ? "auto" : 0, opacity: openFaq === index ? 1 : 0 }} className="faq-answer" style={{ overflow: 'hidden' }}>
                    <p className="py-4" dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
                  </motion.div>
                </motion.div>
              ))}
              <motion.div variants={fadeInRight} className="faq-footer-help mt-8 p-6 bg-white rounded-xl shadow-md text-center">
                <h4>Still have questions?</h4>
                <Link to="/contact" className="btn btn-secondary mt-4 inline-block">Contact Us</Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
      {/* Bottom Navigation */}
      <div className="fk-bottom-nav">
        <Link to="/" className="fk-bottom-nav-item active">
          <HomeIcon size={24} />
          <span>Home</span>
        </Link>
        <Link to="/services" className="fk-bottom-nav-item">
          <Grid size={24} />
          <span>Categories</span>
        </Link>
        <Link to="/profile" className="fk-bottom-nav-item">
          <User size={24} />
          <span>Account</span>
        </Link>
        <Link to="/book" className="fk-bottom-nav-item">
          <div style={{ position: 'relative' }}>
            <ShoppingCart size={24} />
            <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 'bold' }}>1</span>
          </div>
          <span>Cart</span>
        </Link>
      </div>

    </div>
  );
};

export default Home;