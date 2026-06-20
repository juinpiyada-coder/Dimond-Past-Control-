import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldAlert, Clock, Bug } from 'lucide-react';
import { motion } from 'framer-motion';
import { apiCall } from '../utils/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const getServiceImage = (name, defaultImg) => {
    const n = (name || '').toLowerCase();
    if (n.includes('cockroach')) return '/Services/cockroach-service.png';
    if (n.includes('termite')) return '/Services/termite-service.png';
    if (n.includes('bed bug')) return '/Services/bed-bug-service.png';
    if (n.includes('rodent') || n.includes('rat')) return '/Services/rat-service.png';
    if (n.includes('mosquito')) return '/Services/mosquito-service.png';
    if (n.includes('ant')) return '/Services/ant-service.png';
    if (n.includes('bird')) return '/Services/bird-control-servie.png';
    if (n.includes('fly') || n.includes('flies')) return '/Services/fly-control-services.png';
    if (n.includes('lizard')) return '/Services/lizard-service.png';
    if (n.includes('commercial')) return '/Services/commercial-service.png';
    if (n.includes('home') || n.includes('residential')) return '/Services/home-service.png';
    if (n.includes('herbal')) return '/Services/herbal-service.png';
    if (n.includes('general')) return '/Services/general-service.png';
    return defaultImg || '/Services/general-service.png';
  };

  const staticServices = [
    { name: "Cockroaches", path: "/service/cockroaches", img: getServiceImage("Cockroaches"), desc: "Complete eradication of cockroaches with targeted gel baiting and odorless sprays." },
    { name: "Termites", path: "/service/termites", img: getServiceImage("Termites"), desc: "Advanced drill-fill-seal anti-termite treatments for pre and post-construction." },
    { name: "Bed Bugs", path: "/service/bed-bugs", img: getServiceImage("Bed Bugs"), desc: "Intensive multi-step treatment to eliminate bed bugs from all hiding places." },
    { name: "Rodents", path: "/service/rodents", img: getServiceImage("Rodents"), desc: "Professional trapping and baiting to manage rats and mice securely." },
    { name: "Mosquitoes", path: "/service/mosquitoes", img: getServiceImage("Mosquitoes"), desc: "Comprehensive indoor and outdoor thermal fogging for mosquito control." },
    { name: "Ants", path: "/service/ants", img: getServiceImage("Ants"), desc: "Targeted ant bait application to destroy colonies at their source." },
    { name: "Wood Borer", path: "/service/wood-borer", img: getServiceImage("Wood Borer"), desc: "Specialized chemical injection to preserve furniture from wood borers." }
  ];

  useEffect(() => {
    const cachedServices = localStorage.getItem('services');
    const cacheTime = localStorage.getItem('services_time');
    const FIVE_MINUTES = 5 * 60 * 1000;

    if (cachedServices && cacheTime && Date.now() - Number(cacheTime) < FIVE_MINUTES) {
      setServices(JSON.parse(cachedServices));
      setLoading(false);
      return;
    }

    apiCall('/services')
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
          localStorage.setItem('services', JSON.stringify(data));
          localStorage.setItem('services_time', Date.now().toString());
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch services", err);
        setLoading(false);
      });
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="services-page relative">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Pest Control Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', opacity: 0.9 }}
          >
            Trusted pest control designed for homes and businesses. We combine expert strategies with proven techniques. Safe, eco-friendly solutions that deliver lasting protection.
          </motion.p>
        </div>
      </div>

      {/* Strategy Section */}
      <section className="section-padding bg-light">
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>

            <motion.div
              style={{ flex: '1 1 500px' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="section-title text-left">
                We Work With Clients On Strategy
              </motion.h2>
              <motion.p variants={fadeInUp} style={{ marginBottom: '20px', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                At Diamond Pest Control, we believe effective pest management goes beyond treatment—it starts with the right strategy. Our team partners closely with every client to understand their unique challenges, environment, and long-term goals. Together, we design tailored strategies that focus on prevention, safety, and sustainability.
              </motion.p>
              <motion.p variants={fadeInUp} style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Whether it’s protecting homes, ensuring compliance for businesses, or safeguarding large facilities, we provide actionable insights and structured plans that deliver measurable results. With our consultative approach, you don’t just get a service—you gain a trusted partner committed to your success.
              </motion.p>
            </motion.div>

            <motion.div
              style={{ flex: '1 1 400px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} style={{ padding: '25px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', textAlign: 'center' }}>
                <Leaf style={{ color: '#16a34a', width: '40px', height: '40px', margin: '0 auto 15px' }} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#166534' }}>Eco friendly technologies</h3>
                <p style={{ color: '#15803d', fontSize: '0.9rem' }}>Safe for families, pets, and the environment</p>
              </motion.div>

              <motion.div variants={fadeInUp} style={{ padding: '25px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', textAlign: 'center' }}>
                <Clock style={{ color: '#2563eb', width: '40px', height: '40px', margin: '0 auto 15px' }} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#1e40af' }}>Fast Pest Removal</h3>
                <p style={{ color: '#1d4ed8', fontSize: '0.9rem' }}>Quick solutions when you need them most</p>
              </motion.div>

              <motion.div variants={fadeInUp} style={{ padding: '25px', backgroundColor: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '12px', textAlign: 'center', gridColumn: '1 / -1' }}>
                <ShieldAlert style={{ color: '#ea580c', width: '40px', height: '40px', margin: '0 auto 15px' }} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#9a3412' }}>One-time extermination</h3>
                <p style={{ color: '#c2410c', fontSize: '0.9rem' }}>Effective treatment without long-term contracts</p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Services Grid (Backend Connected) */}
      <section className="section-padding">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Link to="/all-services" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '12px 24px', fontSize: '1.1rem' }}>
              View Comprehensive Services Catalog <ArrowRight size={20} />
            </Link>
          </div>

          <motion.div
            className="services-grid"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', marginBottom: '60px' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {staticServices.map((service, index) => (
              <motion.div
                key={`static-${index}`}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                style={{ backgroundColor: 'var(--bg-white)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ height: '200px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <img
                    src={service.img}
                    alt={service.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ padding: '30px 25px', display: 'flex', flexDirection: 'column', flexGrow: 1, backgroundColor: 'var(--primary)', textAlign: 'center', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-dark)', marginBottom: '15px', fontWeight: 700 }}>{service.name} Treatment</h3>
                  <p style={{ color: 'var(--text-dark)', marginBottom: '25px', flexGrow: 1, lineHeight: 1.6, fontSize: '1.05rem', fontWeight: 400 }}>
                    {service.desc}
                  </p>
                  <Link
                    to={service.path}
                    className="btn btn-secondary"
                    style={{ marginTop: 'auto', padding: '12px 30px', fontSize: '1.1rem' }}
                  >
                    Read more
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {services.length > 0 && (
            <>
              <h2 className="section-title" style={{ marginTop: '40px', fontSize: '2rem' }}>Other specialized Services</h2>
              <motion.div
                className="services-grid"
                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
              >
                {services.map((service, index) => (
                  <motion.div
                    key={service.service_id || index}
                    variants={fadeInUp}
                    whileHover={{ y: -8 }}
                    style={{ backgroundColor: 'var(--bg-white)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}
                  >
                    <div style={{ height: '200px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <img
                        src={getServiceImage(service.service_name, service.service_image)}
                        alt={service.service_name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    <div style={{ padding: '30px 25px', display: 'flex', flexDirection: 'column', flexGrow: 1, backgroundColor: 'var(--primary)', textAlign: 'center', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '1.4rem', color: 'var(--text-dark)', marginBottom: '15px', fontWeight: 700 }}>{service.service_name}</h3>
                      <p style={{ color: 'var(--text-dark)', marginBottom: '25px', flexGrow: 1, lineHeight: 1.6, fontSize: '1.05rem', fontWeight: 400 }}>
                        {service.description || "Comprehensive pest control treatment ensuring a safe environment."}
                      </p>
                      <Link
                        to={`/service/${encodeURIComponent(service.service_name)}`}
                        className="btn btn-secondary"
                        style={{ marginTop: 'auto', padding: '12px 30px', fontSize: '1.1rem' }}
                      >
                        Read more
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;
