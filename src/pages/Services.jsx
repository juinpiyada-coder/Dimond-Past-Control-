import React from 'react';
import { Link } from 'react-router-dom';
import { Bug, Home as HomeIcon, ArrowRight } from 'lucide-react';


const Services = () => {
  const pests = [
    { name: 'Cockroaches', description: 'Complete eradication of roaches with safe baits and sprays.', icon: <Bug size={40} /> },
    { name: 'Termites', description: 'Deep structural protection against termite damage and colonies.', icon: <HomeIcon size={40} /> },
    { name: 'Bed Bugs', description: 'Specialized thermal and chemical treatments for total bed bug relief.', icon: <Bug size={40} /> },
    { name: 'Rodents', description: 'Trapping, baiting, and sealing entry points to keep mice and rats out.', icon: <Bug size={40} /> },
    { name: 'Mosquitoes', description: 'Outdoor misting and breeding ground elimination for yard protection.', icon: <Bug size={40} /> },
    { name: 'Ants', description: 'Targeted ant baiting systems to destroy the entire colony.', icon: <Bug size={40} /> },
    { name: 'General Pest Control', description: 'Comprehensive seasonal maintenance to keep your property pest-free.', icon: <Shield size={40} /> },
  ];

  return (
    <div className="services-page">
      <div className="page-header">
        <div className="container">
          <h1>Our Pest Control Services</h1>
          <p>We handle all types of pests with specialized, safe treatments.</p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="services-list">
          {pests.map((pest, index) => (
            <div key={index} className="service-detail-card">
              <div className="service-icon-large">{pest.icon || <Bug size={40} />}</div>
              <div className="service-info">
                <h3>{pest.name}</h3>
                <p>{pest.description}</p>
                <Link to={`/book?pest=${pest.name.toLowerCase()}`} className="btn btn-primary mt-2">Book This Service <ArrowRight size={16} /></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Re-using a dummy Shield icon for general since I didn't import Shield above
import { Shield } from 'lucide-react';

export default Services;
