import React from 'react';
import ServiceLayout from './ServiceLayout';

const Mosquitoes = () => {
  return (
    <ServiceLayout
      serviceName="Mosquitoes"
      title="Comprehensive Mosquito Fogging"
      description="Protect your family from Dengue, Malaria, and Zika. Our comprehensive mosquito control targets adult mosquitoes through thermal fogging and eliminates breeding grounds to disrupt their lifecycle."
      image="/mosquito_control.png"
      features={[
        "Indoor and outdoor thermal fogging",
        "Treatment of stagnant water breeding sites",
        "Residual spray for long-lasting effect",
        "Safe and WHO-approved chemicals"
      ]}
    />
  );
};

export default Mosquitoes;
