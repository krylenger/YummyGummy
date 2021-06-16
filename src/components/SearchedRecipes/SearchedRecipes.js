import React from 'react';
import { RecipeCard, getPreparedRecipeCardData } from '../RecipeCard';
import { recipeCardsContainer } from './SearchedRecipes.css';

export default function SearchedRecipes({
  detailedRecipes,
  setIsModalRecipeOpened,
  setModalRecipeData,
  isDataLoading,
  error,
}) {
  let content = 'Please input your recipe';

  if (error) {
    content = 'Please enter a valid recipe name.';
  } else if (isDataLoading) {
    content = `Data is loading...`;
  } else if (!detailedRecipes.length) {
    content = 'Please input recipe name.';
  } else {
    const recipeCards = detailedRecipes.map(detailedRecipeCardData => {
      const preparedRecipeCardData = getPreparedRecipeCardData(detailedRecipeCardData);
      return (
        <RecipeCard
          preparedRecipeCardData={preparedRecipeCardData}
          key={preparedRecipeCardData.id}
          detailedRecipes={detailedRecipes}
          setIsModalRecipeOpened={setIsModalRecipeOpened}
          setModalRecipeData={setModalRecipeData}
        />
      );
    });
    content = recipeCards;
  }

  return <ul className={recipeCardsContainer}>{content}</ul>;
}
