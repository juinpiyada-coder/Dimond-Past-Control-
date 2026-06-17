import React from 'react';
import ServiceLayout from './ServiceLayout';

const Cockroaches = () => {
  return (
    <ServiceLayout
      serviceName="Cockroaches"
      title="Complete Cockroach Eradication"
      description="Cockroaches are resilient pests that carry diseases and contaminate food. Our targeted gel-baiting and spray treatments ensure your kitchen and home stay completely roach-free without requiring you to vacate the premises."
      image="/cockroach_control.png"
      features={[
        "Targeted gel baiting in kitchen cabinets",
        "Odorless and safe chemical spray",
        "No need to empty cabinets or leave home",
        "Long-lasting residual protection"
      ]}
    />
  );
};

export default Cockroaches;
