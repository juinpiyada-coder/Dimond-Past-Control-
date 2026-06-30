import React from 'react';
import ServiceLayout from './ServiceLayout';

const Rodents = () => {
  return (
    <ServiceLayout
      serviceName="Rodents"
      title="Professional Rodent Control Service"
      description="Rodents such as rats and mice can cause serious damage to property, contaminate food, spread diseases, and create unsafe living and working environments. Diamond Pest Control provides effective rodent management solutions designed to eliminate infestations and prevent future rodent activity."
      image="/Services/rat-service.png"
      features={[
        "Comprehensive Property Inspection",
        "Identification of Rodent Entry Points",
        "Rodent Nest Detection",
        "Safe Baiting and Trapping Programs",
        "Rodent-Proofing Recommendations",
        "Ongoing Monitoring and Prevention"
      ]}
    />
  );
};

export default Rodents;
