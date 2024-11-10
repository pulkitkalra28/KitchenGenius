import React, { useState } from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import backgroundImage from '../../images/background2.png';

const RecipeCard = ({ recipes }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Add better validation
  if (!recipes || !Array.isArray(recipes) || recipes.length === 0) {
    return null;
  }

  // Prepare macros data for each recipe
  const macrosData = recipes.map((recipe) => {
    if (!recipe.macros) return [];
    return [
      { name: 'Carbs', value: recipe.macros.carbohydrates || 0, fill: '#FF5733' },
      { name: 'Protein', value: recipe.macros.protein || 0, fill: '#33FF57' },
      { name: 'Fats', value: recipe.macros.fats || 0, fill: '#3357FF' }
    ];
  });

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedRecipe(null);
  };

  return (
    <Container>
      <RecipeCards>
        {recipes.map((recipe, index) => (
          <Card key={index}>
            <h3>{recipe.recipeName}</h3>
            <p>{recipe.recipeType}</p>
            <MacrosChart>
              <PieChart width={300} height={300}>
                <Pie 
                  data={macrosData[index]} 
                  dataKey="value" 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={60} 
                  outerRadius={80} 
                  fill="#8884d8" 
                  label={({name, value}) => `${value}%`}
                >
                  {macrosData[index].map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </MacrosChart>
            <ViewRecipeButton onClick={() => handleViewRecipe(recipe)}>
              View Recipe
            </ViewRecipeButton>
          </Card>
        ))}
      </RecipeCards>

      {showPopup && selectedRecipe && (
        <Popup>
          <PopupContent>
            <h2>{selectedRecipe.recipeName}</h2>
            <p><strong>Type:</strong> {selectedRecipe.recipeType}</p>
            <MacrosSection>
              <h4>Macronutrients:</h4>
              <p>Carbohydrates: {selectedRecipe.macros.carbohydrates}%</p>
              <p>Protein: {selectedRecipe.macros.protein}%</p>
              <p>Fats: {selectedRecipe.macros.fats}%</p>
            </MacrosSection>
            <h4>Steps:</h4>
            <StepsList>
              {selectedRecipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </StepsList>
            <CloseButton onClick={handleClosePopup}>Close</CloseButton>
          </PopupContent>
        </Popup>
      )}
    </Container>
  );
};

// Add some new styled components and update existing ones
const MacrosChart = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
`;

const MacrosSection = styled.div`
  margin: 20px 0;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;

  h4 {
    margin-bottom: 10px;
    color: #333;
  }

  p {
    margin: 5px 0;
    color: #666;
  }
`;

const StepsList = styled.ol`
  margin: 20px 0;
  padding-left: 20px;

  li {
    margin-bottom: 12px;
    line-height: 1.6;
    color: #444;
  }
`;

const CloseButton = styled.button`
  background-color: #f44336;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #d32f2f;
    transform: scale(1.05);
  }
`;

// Keep your existing styled components...
const Container = styled.div`
  background: ${({ lightBg }) => (lightBg ? '#f9f9f9' : `url(${backgroundImage})`)};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-top: 55px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const RecipeCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 10px;
    font-weight: bold;
  }

  p {
    font-size: 1rem;
    color: #777;
    margin-bottom: 15px;
  }
`;

const ViewRecipeButton = styled.button`
  background-color: #01bf71;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #019e56;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
`;

const PopupContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 80%;
  max-width: 700px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 90vh;

  h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
    font-weight: bold;
  }

  p {
    font-size: 1rem;
    color: #777;
    margin-bottom: 20px;
  }
`;

export default RecipeCard;
