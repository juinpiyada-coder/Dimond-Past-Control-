import React from 'react';
import ServiceLayout from './ServiceLayout';

const Lizards = () => {
  return (
    <ServiceLayout
      serviceName="Lizard Control"
      title="Professional Lizard Control Service"
      description={
        <>
          Lizards can be a nuisance and cause distress in homes and commercial spaces. While most common house lizards are harmless, their presence, droppings, and the fear they instil can be very unsettling. They often enter properties looking for food, primarily insects.
          <br /><br />
          <strong>Effective Lizard Management</strong><br />
          Diamond Pest Control offers specialized treatments to repel and manage lizard populations safely. We focus on treating the areas where lizards hide and hunt, using targeted, non-toxic formulations that are safe for your family while keeping lizards away.
          <br /><br />
          <strong>Protect Your Space</strong><br />
          Enjoy a lizard-free environment with our professional services. Our team not only treats the existing problem but also provides recommendations on sealing entry points and reducing insect populations to prevent future lizard infestations.
        </>
      }
      image="/Services/lizard-service.png"
      features={[
        "Government Certified agency",
        "24×7 dedicated customer support",
        "Clients are always our first priority",
        "Safe and odorless treatments"
      ]}
    />
  );
};

export default Lizards;
