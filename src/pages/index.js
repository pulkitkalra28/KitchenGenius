import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import InfoSection from '../components/InfoSection';
import { aboutObj, discoverObj, signupObj } from '../components/InfoSection/Data';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import Sidebar from '../components/Sidebar';
import RecipeCard from '../components/RecipeCard';
import commonContext from '../context/context';
import FullPageLoader from './FullPageLoader';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  // pulkit
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  // To manage the loading state
  const { isLoggedIn } = useContext(commonContext);

  useEffect(() => {
    if (recipes.length > 0) {
      console.log("Recipes have been updated:", recipes);
    }
  }, [recipes]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // Handle API call to upload image and get recipes
  const handleCreateRecipiesClick = (image) => {
    setIsLoading(true);  // Show loader while API is being called
    const formData = new FormData();
    formData.append("image", image);

    // Replace this URL with your actual Flask API URL
    fetch('http://127.0.0.1:5000/generate-recipes', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        const recipesData = data.recipes.recipes;
        console.log("Setting recipes:", recipesData);
        setRecipes(recipesData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error:", error);
        setIsLoading(false);  // Hide loader in case of error
      });
  }

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      {recipes.length === 0 && !isLoading && (
        <InfoSection
          {...aboutObj}
          handleCreateRecipiesClick={handleCreateRecipiesClick}
        />
      )}
      {recipes.length === 0 && !isLoading && <Services />}
      {isLoading && <FullPageLoader />}
      {!isLoading && recipes.length > 0 && <RecipeCard recipes={recipes} />}
      {!isLoading && <Footer />}
    </>
  );
};

export default Home;
