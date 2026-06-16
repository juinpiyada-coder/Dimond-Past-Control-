import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, ThumbsUp, ArrowRight, Bug, Home as HomeIcon, CheckCircle2, Star, ChevronDown, ChevronUp, PhoneCall, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

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

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  
  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="home-page overflow-hidden">
      {/* Hero Section */}
      <section className="hero relative overflow-hidden">
        <motion.div 
          className="container hero-content relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span variants={fadeInUp} className="hero-subtitle">Kolkata's Biggest Pest Control Company</motion.span>
          <motion.h1 variants={fadeInUp}>Welcome To Diamond Pest Control</motion.h1>
          <motion.p variants={fadeInUp}>The most trusted and reliable company providing the best pest control solutions in India. We are constantly pushing the envelope with innovations in the niche industry. Today, we take pride in identifying ourselves as the pioneers of the pest management industry.</motion.p>
          <motion.div variants={fadeInUp} className="hero-actions">
            <Link to="/book" className="btn btn-primary">Book Now</Link>
            <Link to="/contact" className="btn btn-secondary"><PhoneCall size={18} /> Contact Us</Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="intro-section section-padding container">
        <div className="intro-grid">
          <motion.div 
            className="intro-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
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
          <motion.div 
            className="intro-image"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInRight}
          >
            <motion.img 
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              src="/WhatsApp-Image-2026-05-21-at-4.46.12-PM.jpeg" 
              alt="Diamond Pest Control professional" 
              className="featured-image rounded-2xl shadow-2xl" 
            />
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="who-we-are bg-light section-padding">
        <div className="container intro-grid">
          <motion.div 
            className="intro-image"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInLeft}
          >
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="image-placeholder secondary-bg shadow-xl"
            >
              <ThumbsUp size={100} className="placeholder-icon" />
            </motion.div>
          </motion.div>
          <motion.div 
            className="intro-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
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
      <motion.section 
        className="achievements-banner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container">
          <motion.h4 variants={fadeInUp} className="section-subtitle white">OUR ACHIEVEMENT</motion.h4>
          <motion.h2 variants={fadeInUp}>Celebrating Excellence in Pest Control</motion.h2>
          <motion.div variants={staggerContainer} className="achievement-stats">
            <motion.div variants={fadeInUp} className="stat-box">
              <h3>5000+</h3>
              <p>Happy Clients</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="stat-box">
              <h3>15+</h3>
              <p>Years Experience</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="stat-box">
              <h3>100%</h3>
              <p>Safe Chemicals</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* What We Offer */}
      <section className="services-snippet section-padding">
        <div className="container">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={staggerContainer}
          >
            <motion.h4 variants={fadeInUp} className="section-subtitle text-center">WHAT WE OFFER</motion.h4>
            <motion.h2 variants={fadeInUp} className="section-title text-center">Eliminate Unwanted Pests</motion.h2>
          </motion.div>
          
          <motion.div 
            className="services-grid mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {[
              { icon: <Bug size={40} className="service-icon" />, title: "Cockroaches", desc: "Complete eradication of cockroach infestations." },
              { icon: <HomeIcon size={40} className="service-icon" />, title: "Termites", desc: "Protect your property's structure from termite damage." },
              { icon: <Bug size={40} className="service-icon" />, title: "Bed Bugs", desc: "Sleep peacefully with our specialized bed bug treatments." },
              { icon: <Bug size={40} className="service-icon" />, title: "Rodents", desc: "Effective trapping and exclusion of rats and mice." }
            ].map((service, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="service-card transition-all duration-300"
              >
                {service.icon}
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeInUp} 
            className="text-center mt-10"
          >
            <Link to="/services" className="btn btn-secondary">View All Services <ArrowRight size={16} /></Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us bg-light section-padding">
        <div className="container">
          <div className="why-choose-grid">
            <motion.div 
              className="why-choose-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h4 variants={fadeInLeft} className="section-subtitle">Why Choose Us</motion.h4>
              <motion.h2 variants={fadeInLeft} className="section-title text-left">Diamond Pest Control</motion.h2>
              <div className="feature-list mt-8">
                {[
                  { icon: <Shield className="feature-list-icon" />, title: "Experienced Professionals", desc: "Our skilled pest control technicians use modern equipment and proven methods." },
                  { icon: <ThumbsUp className="feature-list-icon" />, title: "Safe & Eco-Friendly Solutions", desc: "Industry-approved chemicals that are safe for families, pets, and the environment." },
                  { icon: <Star className="feature-list-icon" />, title: "Affordable Pricing", desc: "Transparent pricing with no hidden charges. Customized packages for every budget." },
                  { icon: <Clock className="feature-list-icon" />, title: "Quick Response Time", desc: "We provide fast scheduling and emergency pest control support." }
                ].map((item, idx) => (
                  <motion.div key={idx} variants={fadeInLeft} className="feature-item">
                    <motion.div whileHover={{ rotate: 15, scale: 1.1 }}>{item.icon}</motion.div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRight}
              className="why-choose-checklist-box shadow-2xl"
            >
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
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={staggerContainer}
          >
            <motion.h4 variants={fadeInUp} className="section-subtitle text-center">TESTIMONIALS</motion.h4>
            <motion.h2 variants={fadeInUp} className="section-title text-center">WHAT OUR CLIENT SAYS</motion.h2>
          </motion.div>
          
          <div className="mt-10 overflow-hidden" style={{ cursor: 'grab' }}>
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
              style={{ display: 'flex', gap: '2rem', width: 'max-content' }}
              whileHover={{ animationPlayState: 'paused' }} // optional enhancement but slightly complex with pure motion unless we use state, let's stick to simple
            >
              {[...testimonials, ...testimonials].map((t, idx) => (
                <div 
                  key={idx} 
                  className="testimonial-card shadow-lg"
                  style={{ minWidth: '350px', maxWidth: '400px', whiteSpace: 'normal', flexShrink: 0 }}
                >
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
          <motion.div 
            className="faq-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h4 variants={fadeInLeft} className="section-subtitle">Frequently Asked</motion.h4>
            <motion.h2 variants={fadeInLeft} className="section-title text-left">Have Any Question?</motion.h2>
            <motion.h3 variants={fadeInLeft} className="sub-heading mt-4">Professional Residential And Commercial pest control service</motion.h3>
            <motion.p variants={fadeInLeft}>Diamond Pest Control: Your ultimate pest solution. We offer expert residential and commercial pest control services. Our skilled technicians use safe and effective methods to eliminate infestations. Enjoy peace of mind with our comprehensive protection plans.</motion.p>
            <motion.div variants={fadeInLeft} className="mt-8">
              <Link to="/contact" className="btn btn-primary">Contact Us</Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="faq-list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                variants={fadeInRight}
                className={`faq-item ${openFaq === index ? 'active' : ''}`}
              >
                <button className="faq-question" onClick={() => toggleFaq(index)}>
                  {faq.question}
                  <motion.div animate={{ rotate: openFaq === index ? 180 : 0 }}>
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                <motion.div 
                  initial={false}
                  animate={{ height: openFaq === index ? "auto" : 0, opacity: openFaq === index ? 1 : 0 }}
                  className="faq-answer overflow-hidden"
                >
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
  );
};

export default Home;
