import React from 'react';
import ServiceLayout from './ServiceLayout';

const BirdControl = () => {
  return (
    <ServiceLayout
      serviceName="Bird Control"
      title="Professional Bird Control Service"
      description={
        <>
          <strong>Professional Bird Control Service by Diamond Pest Control</strong><br />
          Birds such as pigeons, sparrows, and crows can create hygiene issues, damage property, block drainage systems, and leave droppings that affect the appearance and safety of buildings. Diamond Pest Control offers humane and effective bird control solutions to protect residential, commercial, and industrial properties.
          <br /><br />
          <strong>Our Bird Control Process</strong><br />
          ✔ Detailed Site Inspection<br />
          ✔ Identification of Bird Nesting and Roosting Areas<br />
          ✔ Installation of Bird Netting Systems<br />
          ✔ Bird Spike Installation<br />
          ✔ Bird Deterrent Solutions<br />
          ✔ Prevention and Maintenance Programs
          <br /><br />
          <strong>Common Bird Problems We Address</strong><br />
          Pigeon Infestations | Bird Nesting on Balconies | Roof and Terrace Bird Activity | Bird Droppings on Buildings | Warehouse and Factory Bird Problems | Commercial Property Bird Management
          <br /><br />
          <strong>Signs You Need Bird Control</strong><br />
          Large numbers of birds gathering regularly | Bird nests on balconies, roofs, or ledges | Excessive bird droppings | Blocked gutters and drainage systems | Noise and disturbance caused by nesting birds | Property damage from bird activity
          <br /><br />
          <strong>Bird Control Solutions Offered</strong><br />
          Bird Net Installation | Bird Spike Installation | Balcony Bird Protection | Roof and Terrace Bird Control | Warehouse Bird Management | Preventive Bird Exclusion Systems
          <br /><br />
          <strong>Benefits of Professional Bird Control</strong><br />
          Improved Property Cleanliness, Reduced Health Risks from Bird Droppings, Protection of Building Structures, Prevention of Nesting and Roosting, Enhanced Appearance of Property, Long-Term Bird Management.<br /><br />
          Diamond Pest Control provides safe, humane, and effective bird control services to protect your property from nuisance birds and maintain a clean, hygienic environment. Contact us today for a professional bird control assessment.
        </>
      }
      image="/Services/bird-control-servie.png"
      features={[
        "Humane Bird Management Solutions",
        "Professional Installation Services",
        "Safe and Environmentally Responsible Methods",
        "Residential and Commercial Expertise",
        "Long-Term Bird Prevention",
        "Reliable and Prompt Service"
      ]}
    />
  );
};

export default BirdControl;
