import React from 'react';
import ServiceLayout from './ServiceLayout';

const WoodBorer = () => {
  return (
    <ServiceLayout
      serviceName="Wood Borer"
      title="Wood Borer Preservation Treatment"
      description="Notice a yellow powder falling from your wooden furniture? That's a sign of wood borers. We meticulously inject specialized chemicals into every hole to save your valuable antique and modern furniture."
      image="/wood_borer_control.png"
      features={[
        "Precision chemical injection into borer holes",
        "Surface spray for comprehensive protection",
        "Preserves the finish of expensive furniture",
        "Prevents spreading to other wooden items"
      ]}
    />
  );
};

export default WoodBorer;
