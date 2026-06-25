import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Video, Grid, User, ShoppingCart, MapPin, Search, Menu, X, ArrowRight, Bug, Activity, Shield, Clock, ThumbsUp, Star, ChevronDown, ChevronLeft, ChevronRight, CheckCircle2, PhoneCall, Quote, Building, Bird, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { GiRat, GiAnt } from 'react-icons/gi';
import { FaBug, FaBugs, FaMosquito, FaLocust } from 'react-icons/fa6';
import { FaBed } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { apiCall } from '../utils/api';
import CookieConsent from '../components/CookieConsent';

import slider1 from '../assets/slider/slider-1.png';
import slider2 from '../assets/slider/slider-2.png';
import slider3 from '../assets/slider/slider-3.png';
import slider4 from '../assets/slider/slider-4.png';
import slider5 from '../assets/slider/slider-5.png';

const AnimatedCounter = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const nodeRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp = null;
    const duration = 2000;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      // Use easeOut cubic easing for a smoother finish
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
};

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const ribbonRef = React.useRef(null);


  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - ribbonRef.current.offsetLeft);
    setScrollLeft(ribbonRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    setHasDragged(true);
    const x = e.pageX - ribbonRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    ribbonRef.current.scrollLeft = scrollLeft - walk;
  };

  const sliderImages = [slider1, slider2, slider3, slider4, slider5];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);


  const { data: services = [], isLoading: loading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const data = await apiCall('/services');
      return Array.isArray(data) ? data : [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const pestCategories = [
    { name: "Cockroaches", path: "cockroaches", icon: <FaBugs size={32} color="#2A329F" /> },
    { name: "Termites", path: "termites", icon: <FaBug size={32} color="#2A329F" /> },
    { name: "Bed Bugs", path: "bed-bugs", icon: <FaBed size={32} color="#2A329F" /> },
    { name: "Rodents", path: "rodents", icon: <GiRat size={32} color="#2A329F" /> },
    { name: "Mosquitoes", path: "mosquitoes", icon: <FaMosquito size={32} color="#2A329F" /> },
    { name: "Ants", path: "ants", icon: <GiAnt size={32} color="#2A329F" /> },
    { name: "Wood Borer", path: "wood-borer", icon: <FaLocust size={32} color="#2A329F" /> },
    { name: "Bird Control", path: "bird-control", icon: <Bird size={32} color="#2A329F" /> },
    { name: "Fly Control", path: "fly-control", icon: <FaBug size={32} color="#2A329F" /> },
    { name: "Commercial", path: "commercial", icon: <Building size={32} color="#2A329F" /> },
    { name: "General", path: "general", icon: <Shield size={32} color="#2A329F" /> },
    { name: "Home Service", path: "home-service", icon: <HomeIcon size={32} color="#2A329F" /> },
    { name: "Lizard Control", path: "lizard-control", icon: <Bug size={32} color="#2A329F" /> },
    { name: "Herbal Pest Control", path: "herbal-pest-control", icon: <Leaf size={32} color="#2A329F" /> },
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

  // Pagination calculations
  const processedServices = services.map(s => {
    const sName = s?.service_name?.toLowerCase() || '';
    let newService = { ...s };
    if (sName.includes('herbal')) {
      newService.path = "herbal-pest-control";
      newService.base_price = "0";
    }
    if (sName.includes('lizard')) {
      newService.path = "lizard-control";
    }
    return newService;
  });

  const combinedServices = [
    { service_name: "General Pest Control", description: "Comprehensive pest control coverage designed to keep your home safe from common household pests.", service_image: "Services/general-service.png", base_price: "0", path: "general" },
    ...processedServices.filter(s => s?.service_name?.toLowerCase() !== 'general pest control')
  ];
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = combinedServices.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(combinedServices.length / servicesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
            <Link key={idx} to={`/service/${cat.path}`} className="fk-sidebar-menu-item" onClick={() => setIsSidebarOpen(false)}>
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



      {/* Hero Slider */}
      <div className="hero-slider-container">
        {sliderImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className="hero-slider-img"
            style={{ opacity: currentSlide === index ? 1 : 0 }}
          />
        ))}
        {/* Slider Dots */}
        <div className="hero-slider-dots">
          {sliderImages.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="slider-dot"
              style={{
                backgroundColor: currentSlide === index ? 'var(--primary, #FFEE00)' : 'rgba(255,255,255,0.6)',
                transform: currentSlide === index ? 'scale(1.2)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Category Ribbon */}
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>

        <div 
          ref={ribbonRef} 
          className="fk-category-ribbon" 
          style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', display: 'flex', padding: '15px 40px', scrollBehavior: isDragging ? 'auto' : 'smooth', cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <style dangerouslySetInnerHTML={{__html: `.fk-category-ribbon::-webkit-scrollbar { display: none; }`}} />
          <div className="fk-category-item" style={{ flexShrink: 0 }} onClick={(e) => { if (hasDragged) { e.preventDefault(); e.stopPropagation(); } else { setIsSidebarOpen(true); } }}>
            <div className="fk-category-icon-wrapper">
              <Menu size={32} color="#2A329F" />
            </div>
            <span className="fk-category-text">All Pests</span>
          </div>
          {pestCategories.map((cat, idx) => (
            <Link 
              to={`/service/${cat.path}`} 
              key={idx} 
              className="fk-category-item" 
              style={{ textDecoration: 'none', flexShrink: 0 }}
              draggable={false}
              onClick={(e) => { if (hasDragged) { e.preventDefault(); e.stopPropagation(); } }}
            >
              <div className="fk-category-icon-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cat.icon}
              </div>
              <span className="fk-category-text">{cat.name}</span>
            </Link>
          ))}
        </div>

      </div>

      {/* Inspection Section */}
      <section className="inspection-section" style={{ padding: '60px 20px', background: 'linear-gradient(135deg, var(--secondary, #2A329F) 0%, #1e2475 100%)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.1, transform: 'scale(1.5) translate(10%, -10%)' }}>
          <Shield size={400} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '30px' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ flex: '1 1 500px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '15px', lineHeight: 1.2 }}>Need a Professional Pest Inspection?</h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '25px', maxWidth: '600px', lineHeight: 1.6 }}>
              Don't let pests take over your home or business. Schedule a comprehensive inspection with our experts today and get a customized treatment plan.
            </p>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <Link to="/book" className="btn" style={{ backgroundColor: 'var(--primary, #FFEE00)', color: '#1e293b', fontWeight: 'bold', padding: '12px 25px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', border: 'none', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <CheckCircle2 size={20} /> Book Free Inspection
              </Link>
              <Link to="/contact" className="btn" style={{ backgroundColor: 'transparent', color: 'white', fontWeight: 'bold', padding: '12px 25px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', border: '2px solid white', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = 'var(--secondary, #2A329F)'; }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'white'; }}>
                <PhoneCall size={20} /> Contact Us Now
              </Link>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '30px', borderRadius: '20px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', width: '100%', maxWidth: '400px' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px' }}>What to expect?</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}><Search size={24} color="var(--primary, #FFEE00)" style={{ flexShrink: 0, marginTop: '2px' }} /> <span>Thorough property assessment inside and out</span></li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}><Bug size={24} color="var(--primary, #FFEE00)" style={{ flexShrink: 0, marginTop: '2px' }} /> <span>Identification of pest types and entry points</span></li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}><Shield size={24} color="var(--primary, #FFEE00)" style={{ flexShrink: 0, marginTop: '2px' }} /> <span>Tailored protection plan and cost estimate</span></li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Custom Products Section */}
      <section className="custom-services-section" style={{ padding: '60px 20px', backgroundColor: '#f8fafc' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <motion.h4 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ color: 'var(--secondary, #2A329F)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', fontSize: '0.9rem' }}>Our Services</motion.h4>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ fontSize: '2.4rem', color: '#1e293b', fontWeight: '800', lineHeight: 1.2 }}>Premium Pest Control Services</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ color: '#64748b', maxWidth: '600px', margin: '15px auto 0', fontSize: '1.05rem', lineHeight: 1.6 }}>Explore our range of highly effective pest control services for your home and business.</motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          {currentServices.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % servicesPerPage) * 0.1 }}
              onClick={() => navigate(service.path ? `/service/${service.path}` : `/service/${encodeURIComponent(service.service_name || '')}`)}
              className="service-card-modern"
            >
              <div className="service-card-img-container">
                <img
                  src={service.service_image?.startsWith('/') ? `${(import.meta.env.VITE_API_BASE_URL || '').replace('/api', '')}${service.service_image}?t=${service.updated_at ? new Date(service.updated_at).getTime() : Date.now()}` : (service.service_image || '/logo.png')}
                  alt={service.service_name}
                  className="service-card-img"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/logo.png'; }}
                />
                <div className="service-price-tag">
                  ₹{service.base_price}
                </div>
              </div>
              <div className="service-card-content">
                <h3 className="service-card-title">{service.service_name}</h3>
                <p className="service-card-desc">
                  {service.description || 'Professional pest control treatment providing complete eradication and long-term protection for your property.'}
                </p>
                <div className="service-card-footer">
                  <span style={{ color: 'var(--secondary, #2A329F)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem' }}>
                    View Details <ArrowRight size={18} />
                  </span>
                  <div style={{ display: 'flex', gap: '4px', color: '#fbbf24' }}>
                    <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '50px', flexWrap: 'wrap' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: currentPage === number ? 'var(--secondary, #2A329F)' : '#e2e8f0',
                  color: currentPage === number ? 'white' : '#475569',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: currentPage === number ? '0 4px 6px rgba(42, 50, 159, 0.3)' : 'none'
                }}
                onMouseOver={(e) => { if (currentPage !== number) e.currentTarget.style.backgroundColor = '#cbd5e1'; }}
                onMouseOut={(e) => { if (currentPage !== number) e.currentTarget.style.backgroundColor = '#e2e8f0'; }}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              style={{
                padding: '0 15px',
                height: '40px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: currentPage === totalPages ? '#e2e8f0' : 'var(--secondary, #2A329F)',
                color: currentPage === totalPages ? '#94a3b8' : 'white',
                fontWeight: 'bold',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: currentPage === totalPages ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              Next <ArrowRight size={16} />
            </button>
          </div>
        )}
      </section>

      {/* Legacy Content Integrated Below E-commerce layout */}
      <div className="legacy-content-wrapper" style={{ backgroundColor: '#fff' }}>

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
              <motion.img whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }} src="/hero-img/hero-1.png" alt="Diamond Pest Control professional" className="featured-image rounded-2xl shadow-2xl" />
            </motion.div>
          </div>
        </section>

        {/* Who We Are */}
        <section className="who-we-are bg-light section-padding">
          <div className="container intro-grid">
            <motion.div className="intro-image" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInLeft}>
              <motion.img whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }} src="/hero-img/hero-2.png" alt="Pest Control Service" className="featured-image rounded-2xl shadow-2xl" />
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
              <motion.div variants={fadeInUp} className="stat-box"><h3><AnimatedCounter end={40} suffix="k+" /></h3><p>Happy Clients</p></motion.div>
              <motion.div variants={fadeInUp} className="stat-box"><h3><AnimatedCounter end={30} suffix="+" /></h3><p>Years Experience</p></motion.div>
              <motion.div variants={fadeInUp} className="stat-box"><h3><AnimatedCounter end={100} suffix="%" /></h3><p>Safe Chemicals</p></motion.div>
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
            </motion.div>
          </div>
        </section>
      </div>

      <CookieConsent />
    </div>
  );
};

export default Home;