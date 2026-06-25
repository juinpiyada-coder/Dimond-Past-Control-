import React from 'react';
import ServiceLayout from './ServiceLayout';

const Herbal = () => {
  return (
    <ServiceLayout
      serviceName="Herbal Pest Control"
      title="Eco-Friendly Herbal Pest Control"
      description={
        <>
          Looking for a chemical-free, natural way to keep pests out of your home? Our Herbal Pest Control service uses plant-based, organic formulations that are tough on pests but completely safe for your family, children, and pets.
          <br /><br />
          <strong>The Natural Choice</strong><br />
          We use highly effective natural extracts and essential oils that repel and eliminate common pests like cockroaches, ants, and spiders without leaving any harmful residues or strong chemical odors. It's the perfect choice for health-conscious households, hospitals, and schools.
          <br /><br />
          <strong>Safe & Effective</strong><br />
          Choose Diamond Pest Control for a greener, safer approach. Our herbal treatments offer long-lasting protection while keeping your indoor air quality pristine. Book our herbal pest control service today and experience a clean, pest-free home the natural way.
        </>
      }
      image="/Services/herbal-service.png"
      features={[
        "100% Herbal & Organic products",
        "Completely safe for kids and pets",
        "No harsh chemical odors",
        "Environmentally friendly"
      ]}
    />
  );
};

export default Herbal;
