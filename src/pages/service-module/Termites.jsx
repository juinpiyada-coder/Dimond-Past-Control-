import React from 'react';
import ServiceLayout from './ServiceLayout';

const Termites = () => {
  return (
    <ServiceLayout
      serviceName="Termites"
      title="Termites - Control Service in Kolkata"
      description={
        <>
          Termite control service in kolkata is one of the best control services provided by our business. Termites are social insects that live in colonies and feed on wood. They have different castes: workers, soldiers, and reproductives. Often mistaken for ants, they have straight antennae and a broader waist. Termites play a vital role in ecosystems but can cause significant damage to wooden structures. So to avoid destruction from termites avail our termite control service in kolkata.
          <br /><br />
          <strong>How Termites Damages Property</strong><br />
          Termites are silent destroyers. They create intricate tunnels within wood, weakening its structure from the inside out. Over time, this hidden damage can lead to sagging floors, crumbling walls, and even structural collapse. Furniture, books, and other wood-based items are also at risk. Early detection is crucial to prevent extensive and costly repairs. Termite control service can prevent your furniture books etc.
          <br /><br />
          <strong>Contact for Pest Control Service</strong><br />
          Protect Your Property from Termite Damage Don’t let termites silently destroy your home or business. Contact Diamond Pest Control Pvt Ltd for expert termite control services. Our professionals will inspect your property, identify the problem, and provide effective solutions. With years of experience, we offer comprehensive treatments to eliminate termites and prevent future infestations. Safeguard your investment with Diamond Pest Control.
        </>
      }
      image="/Services/termite-service.png"
      features={[
        "Government Certified agency",
        "24×7 dedicated customer support",
        "Clients are always our first priority",
        "Recognized as the No. 1 brand on Google"
      ]}
    />
  );
};

export default Termites;
