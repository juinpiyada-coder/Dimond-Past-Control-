import React from 'react';
import ServiceLayout from './ServiceLayout';

const General = () => {
  return (
    <ServiceLayout
      serviceName="General Pest Control"
      title="Comprehensive General Pest Control Solutions"
      description="Diamond Pest Control provides a comprehensive general pest control service to safeguard your residential or commercial space. This service addresses common nuisance pests, creating a protective barrier around your property to keep it safe, clean, and pest-free all year round."
      image="/Services/general-service.png"
      features={[
        "Eco-friendly pest management solution",
        "Low odor treatment process",
        "Safer for homes with children and pets",
        "Comprehensive property inspection & pest identification",
        "Herbal pest control application and monitoring"
      ]}
    />
  );
};

export default General;
