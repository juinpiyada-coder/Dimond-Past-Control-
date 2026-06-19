import React from 'react';
import ServiceLayout from './ServiceLayout';

const Cockroaches = () => {
  return (
    <ServiceLayout
      serviceName="Cockroaches"
      title="Effective Cockroach Control Service"
      description={
        <>
          Cockroaches are among the most common and stubborn household pests. They thrive in dark, damp areas like kitchens and bathrooms, scavenging for food at night. Not only are they an unsightly nuisance, but cockroaches also carry harmful bacteria, pathogens, and allergens that can contaminate your food and trigger asthma or allergies. Diamond Pest Control provides specialized cockroach eradication services to restore sanitation and safety to your property.
          <br /><br />
          <strong>Health Risks & Hygiene Issues</strong><br />
          A cockroach infestation is a serious threat to your family's health. They leave behind droppings and shed skins that can exacerbate respiratory issues. Because they breed exponentially, a small problem can turn into a massive infestation within weeks. Cockroaches are highly resilient to off-the-shelf sprays, often requiring professional-grade gel baits and insect growth regulators to truly break their breeding cycle.
          <br /><br />
          <strong>Professional Cockroach Extermination</strong><br />
          Say goodbye to cockroaches with Diamond Pest Control Pvt. Ltd. We provide highly effective cockroach treatments in Kolkata using odorless, advanced gel baiting technology that targets roaches at their source without requiring you to empty your kitchen. Enjoy a hygienic, pest-free environment by booking our certified cockroach control experts today!
        </>
      }
      image="/Services/cockroach-service.png"
      features={[
        "Government Certified agency",
        "24×7 dedicated customer support",
        "Clients are always our first priority",
        "Recognized as the No. 1 brand on Google"
      ]}
    />
  );
};

export default Cockroaches;
