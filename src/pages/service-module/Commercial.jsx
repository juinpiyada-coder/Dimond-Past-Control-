import React from 'react';
import ServiceLayout from './ServiceLayout';

const Commercial = () => {
  return (
    <ServiceLayout
      serviceName="Commercial Services"
      title="Commercial Pest Control Service"
      description={
        <>
          <strong>Commercial Pest Control Service by Diamond Pest Control</strong><br />
          Protect your business from pests with professional commercial pest control solutions. We provide effective and safe pest management services for offices, restaurants, hotels, warehouses, factories, hospitals, schools, shopping malls, and other commercial establishments.
          <br /><br />
          <strong>Our Commercial Pest Control Services</strong><br />
          ✅ Cockroach Control<br />
          ✅ Rodent Control<br />
          ✅ Termite Control<br />
          ✅ Ant Control<br />
          ✅ Mosquito Control<br />
          ✅ Fly Control<br />
          ✅ Bed Bug Control<br />
          ✅ Bird Control<br />
          ✅ Warehouse Pest Management<br />
          ✅ Food Industry Pest Control
          <br /><br />
          <strong>Industries We Serve</strong><br />
          Offices & Corporate Buildings | Restaurants & Cafes | Hotels & Resorts | Hospitals & Clinics | Schools & Colleges | Factories & Manufacturing Units | Warehouses & Logistics Centers | Retail Stores & Shopping Malls
          <br /><br />
          <strong>Benefits of Commercial Pest Control</strong><br />
          Maintains a hygienic workplace, protects property and inventory, ensures compliance with health regulations, enhances customer confidence, and prevents costly pest infestations.<br /><br />
          Diamond Pest Control delivers reliable commercial pest control services to help businesses maintain a clean, safe, and pest-free environment. Contact us today for a customized pest management solution.
        </>
      }
      image="/Services/commercial-service.png"
      features={[
        "Experienced Pest Control Professionals",
        "Safe & Approved Treatment Methods",
        "Customized Pest Management Plans",
        "Minimal Business Disruption",
        "Regular Inspection & Monitoring",
        "Affordable Pricing"
      ]}
    />
  );
};

export default Commercial;
