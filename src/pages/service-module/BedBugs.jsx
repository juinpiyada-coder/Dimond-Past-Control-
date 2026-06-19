import React from 'react';
import ServiceLayout from './ServiceLayout';

const BedBugs = () => {
  return (
    <ServiceLayout
      serviceName="Bed Bugs"
      title="Professional Bed Bug Control Service"
      description={
        <>
          Bed bugs are notoriously resilient pests that hide in mattresses, furniture joints, and wall crevices. They feed on human blood at night, leaving behind itchy, red welts that severely disrupt your sleep. Because they multiply rapidly and can survive for months without feeding, completely eliminating a bed bug infestation requires professional expertise. Diamond Pest Control offers highly effective, deep-penetrating treatments to eradicate bed bugs at every life stage.
          <br /><br />
          <strong>The Hidden Impact of Bed Bugs</strong><br />
          Beyond the physical discomfort of itchy bites, a bed bug infestation can take a significant mental toll, causing stress, anxiety, and insomnia. They easily hitchhike on luggage or clothing, making it simple to inadvertently bring them into your home. If left unchecked, an infestation can quickly spread from a single bedroom to the entire house, requiring extensive sanitization and treatment.
          <br /><br />
          <strong>Sleep Peacefully Again</strong><br />
          Reclaim your bedroom with Diamond Pest Control Pvt. Ltd. We offer specialized bed bug treatments in Kolkata, utilizing advanced chemical formulations and heat techniques to destroy eggs, nymphs, and adults. Our meticulous two-step treatment process ensures total eradication so you can finally sleep soundly. Don't let bed bugs ruin your peace of mind—contact our expert team today!
        </>
      }
      image="/Services/bed-bug-service.png"
      features={[
        "Government Certified agency",
        "24×7 dedicated customer support",
        "Clients are always our first priority",
        "Recognized as the No. 1 brand on Google"
      ]}
    />
  );
};

export default BedBugs;
