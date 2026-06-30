import React from 'react';
import ServiceLayout from './ServiceLayout';

const Ants = () => {
  return (
    <ServiceLayout
      serviceName="Ants"
      title="Complete Ant Control Service"
      description={
        <>
          Ants are highly social insects that live in massive colonies, making them difficult to eliminate with basic DIY methods. They quickly invade kitchens, pantries, and dining areas in search of food and water, contaminating surfaces along the way. Some species can even cause structural damage or deliver painful bites. Diamond Pest Control provides professional ant control services designed to eradicate the entire colony, including the queen, ensuring long-term protection for your property.
          <br /><br />
          <strong>How Ants Damage Your Property & Hygiene</strong><br />
          While ants may seem harmless, a severe infestation can compromise your food safety and hygiene. They leave behind invisible pheromone trails that constantly attract more ants to your home. Certain species, like carpenter ants, hollow out wood for nesting, potentially causing significant structural damage over time. Quick and effective professional intervention is required to stop them from establishing deep roots inside your walls or foundation.
          <br /><br />
          <strong>Professional Ant Extermination</strong><br />
          Don’t let ants take over your living spaces! Contact Diamond Pest Control Pvt. Ltd. for specialized ant eradication in Kolkata. We use targeted baits that worker ants carry back to the nest, effectively destroying the colony from the inside out. Our child and pet-safe treatments provide a strong residual barrier to prevent future invasions. Secure your home today with our expert team!
        </>
      }
      image="/Services/ant-service.png"
      features={[
        "Government Certified agency",
        "24×7 dedicated customer support",
        "Clients are always our first priority",
        "Recognized as the No. 1 brand on Google"
      ]}
    />
  );
};

export default Ants;
