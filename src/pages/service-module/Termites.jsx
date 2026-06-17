import React from 'react';
import ServiceLayout from './ServiceLayout';

const Termites = () => {
  return (
    <ServiceLayout
      serviceName="Termites"
      title="Advanced Anti-Termite Treatment"
      description="Termites can silently destroy the structural integrity of your home and valuable wooden furniture. We use advanced drilling and injection techniques to create a chemical barrier that eradicates existing colonies and prevents future attacks."
      image="/termite_control.png"
      features={[
        "Drill-Fill-Seal technique for deep penetration",
        "Specialized chemical barrier creation",
        "Treatment for both pre and post-construction",
        "Extended warranty protection"
      ]}
    />
  );
};

export default Termites;
