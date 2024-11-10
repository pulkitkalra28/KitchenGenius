import React from 'react';
import Icon1 from '../../images/svg-4.svg';
import Icon2 from '../../images/svg-5.svg';
import Icon3 from '../../images/svg-6.svg';
import { ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP } from './ServicesElements';

const Services = () => {
  return (
    <ServicesContainer id='services'>
      <ServicesH1>How to Use?</ServicesH1>
      <ServicesWrapper>

        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2>Snap!</ServicesH2>
          {/* <ServicesP>Easily filter recipes based on your specific dietary needs, whether it's vegan, keto, or gluten-free</ServicesP> */}
        </ServicesCard>

        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH2>Analyze...</ServicesH2>
          {/* <ServicesP>Get tailored recipe suggestions based on your ingredients and dietary preferences like vegan, low-carb, and more</ServicesP> */}
        </ServicesCard>

        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2>Cook!</ServicesH2>
          {/* <ServicesP>Each recipe comes with a detailed nutritional breakdown, so you can make healthier food choices</ServicesP> */}
        </ServicesCard>

      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;
