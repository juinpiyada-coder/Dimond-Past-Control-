import React from 'react';
import ServiceLayout from './ServiceLayout';

const Ants = () => {
  return (
    <ServiceLayout
      serviceName="Ants"
      title="Effective Ant Eradication"
      description="Ant colonies can quickly overrun a kitchen. Our specialized ant control service uses targeted baits that worker ants carry back to the nest, effectively destroying the entire colony at its source."
      image="/ant_control.png"
      features={[
        "Targeted ant bait application",
        "Destruction of the queen and entire colony",
        "Odorless treatment safe for kitchens",
        "Barrier spray to prevent re-entry"
      ]}
    />
  );
};

export default Ants;
