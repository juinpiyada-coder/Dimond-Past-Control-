import React from 'react';
import ServiceLayout from './ServiceLayout';

const WoodBorer = () => {
  return (
    <ServiceLayout
      serviceName="Wood Borer"
      title="Professional Wood Borer Control Service"
      description={
        <>
          Wood borers are highly destructive pests that quietly consume the timber inside your home, often causing irreparable damage before they are even discovered. They attack expensive wooden furniture, structural beams, and flooring, leaving behind tiny exit holes and fine yellow powder (frass). Because they live deep within the wood, superficial cleaning or ordinary sprays are entirely ineffective at stopping them. Diamond Pest Control provides specialized, deep-penetrating wood borer treatments to save your valuable wooden assets.
          <br /><br />
          <strong>Signs and Consequences of Wood Borers</strong><br />
          The most common indicator of a wood borer infestation is the presence of fine, sawdust-like powder falling from wooden items. Over time, the internal tunneling of these larvae compromises the structural integrity of the wood, causing furniture to become hollow and fragile. If ignored, the infestation can spread from one piece of furniture to another, jeopardizing the safety and aesthetics of your entire home.
          <br /><br />
          <strong>Save Your Furniture & Structures</strong><br />
          Protect your expensive timber with Diamond Pest Control Pvt. Ltd. Our professional wood borer control services in Kolkata utilize a highly effective syringe-injection method. We inject specialized insecticidal fluid directly into the tiny exit holes, reaching the larvae deep inside the wood where they feed. This ensures total eradication and safeguards your woodwork for years to come. Call us today for an expert inspection!
        </>
      }
      image="/Services/commercial-service.png"
      features={[
        "Government Certified agency",
        "24×7 dedicated customer support",
        "Clients are always our first priority",
        "Recognized as the No. 1 brand on Google"
      ]}
    />
  );
};

export default WoodBorer;
