import React from 'react';
import ServiceLayout from './ServiceLayout';

const General = () => {
  return (
    <ServiceLayout
      serviceName="General Pest Control"
      title="Safe & Eco-Friendly Herbal Pest Control Solutions"
      description="Diamond Pest Control offers professional herbal pest control services designed to protect your home and workplace using eco-friendly and plant-based treatment methods. Our herbal solutions help control pests while minimizing the use of harsh chemicals, making them a preferred choice for families, pets, and environmentally conscious customers."
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
