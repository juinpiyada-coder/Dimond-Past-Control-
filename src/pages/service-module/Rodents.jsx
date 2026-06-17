import React from 'react';
import ServiceLayout from './ServiceLayout';

const Rodents = () => {
  return (
    <ServiceLayout
      serviceName="Rodents"
      title="Professional Rodent Management"
      description="Rats and mice cause extensive property damage and spread dangerous diseases. We implement a strategic trapping and baiting system to safely remove rodents and secure your property against future entry."
      image="/rodent_control.png"
      features={[
        "Strategic placement of secure bait stations",
        "Use of industry-approved glue boards and traps",
        "Identification and sealing of entry points",
        "Safe for environments with pets and children"
      ]}
    />
  );
};

export default Rodents;
