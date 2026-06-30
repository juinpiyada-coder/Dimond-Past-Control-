import React from 'react';
import ServiceLayout from './ServiceLayout';

const HomeService = () => {
  return (
    <ServiceLayout
      serviceName="Home Services"
      title="Professional Residential Pest Control Services"
      description="Protect your home and family with professional residential pest control services from Diamond Pest Control. We provide safe, effective, and affordable pest management solutions to eliminate common household pests and prevent future infestations. Our trained technicians use advanced treatment methods to keep your property pest-free throughout the year."
      image="/Services/home-service.png"
      features={[
        "Detailed property inspection and pest identification",
        "Customized residential treatment plan",
        "Safe treatments for families and pets",
        "Professional pest control application",
        "Follow-up monitoring and prevention"
      ]}
    />
  );
};

export default HomeService;
