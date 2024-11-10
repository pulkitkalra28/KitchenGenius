import React, { useState } from 'react';
import { Button } from '../ButtonElements'; // Adjust the path as needed
import { DashboardContainer, DashboardWrapper, TextWrapper, Title, Description, BtnWrapper } from './DashboardElements';

const Dashboard = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => setHover(!hover);

  return (
    <DashboardContainer>
      <DashboardWrapper>
        <TextWrapper>
          <Title>Welcome to Kitchen Genius</Title>
          <Description>
            Discover a smarter way to cook! Upload a photo of your ingredients, and let our AI suggest personalized recipes based on what you have. Whether you're looking for healthy, vegan, or low-carb meals, we've got you covered!
          </Description>
          <BtnWrapper>
            <Button to="/upload" onMouseEnter={onHover} onMouseLeave={onHover} primary={true} dark={true}>
              Create Recipes
              {hover ? '→' : '→'}
            </Button>
          </BtnWrapper>
          <p>Upload image of ingredients</p>
        </TextWrapper>
      </DashboardWrapper>
    </DashboardContainer>
  );
};

export default Dashboard;
