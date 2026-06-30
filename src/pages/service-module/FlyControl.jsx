import React from 'react';
import ServiceLayout from './ServiceLayout';

const FlyControl = () => {
  return (
    <ServiceLayout
      serviceName="Fly Control"
      title="Professional Fly Control Service"
      description="Flies are more than a nuisance. They can contaminate food, spread bacteria, and create hygiene problems in homes, restaurants, offices, and commercial facilities. Professional fly control focuses on identifying breeding sites, eliminating infestations, and preventing future fly activity."
      image="/Services/fly-control-services.png"
      features={[
        "Detailed Site Inspection & Identification of Breeding Areas",
        "Targeted Fly Treatment",
        "Installation of Fly Traps & Monitoring Systems",
        "Entry Point Sealing Recommendations",
        "Preventive Maintenance Solutions"
      ]}
    />
  );
};

export default FlyControl;
