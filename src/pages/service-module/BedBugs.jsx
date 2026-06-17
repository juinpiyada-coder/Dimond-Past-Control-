import React from 'react';
import ServiceLayout from './ServiceLayout';

const BedBugs = () => {
  return (
    <ServiceLayout
      serviceName="Bed Bugs"
      title="Intensive Bed Bug Control"
      description="Bed bugs cause sleepless nights and severe itching. Because they hide in tiny crevices, simple sprays won't work. Our intensive treatment penetrates mattresses, furniture, and cracks to eliminate bugs at all life stages."
      image="/bed_bug_control.png"
      features={[
        "Deep inspection of mattresses and furniture",
        "Targeted chemical application in crevices",
        "Two-step treatment process for total eradication",
        "Guidance on preventing future infestations"
      ]}
    />
  );
};

export default BedBugs;
