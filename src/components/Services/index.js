import React from 'react';
import Icon1 from '../../images/svg-4.svg';
import Icon2 from '../../images/svg-5.svg';
import Icon3 from '../../images/svg-6.svg';
import recipe from '../../images/recipe.png';
import snap from '../../images/snap.png';
import analysis from '../../images/analysis.png';

import { ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP } from './ServicesElements';

const Services = () => {
  return (
    <ServicesContainer id='services'>
      <ServicesH1>How to Use?</ServicesH1>
      <ServicesWrapper>

      <ServicesCard>
        <ServicesIcon src={snap} />
        <ServicesH2>Snap!</ServicesH2>
        <ServicesP>Capture the food ingredients you have in a single photo!</ServicesP>
      </ServicesCard>

      <ServicesCard>
        <ServicesIcon src={analysis} />
        <ServicesH2>Analyze...</ServicesH2>
        <ServicesP>Our AI analyzes the data and suggests personalized recipes.</ServicesP>
      </ServicesCard>

      <ServicesCard>
        <ServicesIcon src={recipe} />
        <ServicesH2>Recipe Ready!</ServicesH2>
        <ServicesP>Get detailed recipes with steps and macronutrient breakdowns.</ServicesP>
      </ServicesCard>

      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;
