import React, { useState } from 'react';
import { getPreparedRecipeCardData, RecipeCard } from '../RecipeCard/RecipeCard';
import { ModalRecipe } from '../ModalRecipe';
import { mealDescription, recipeCardsContainer } from './FridgeRecipes.css';

export default function FridgeRecipes({ detailedRecipes, isMagicFridge, errorInTheFridge }) {
  const [isModalRecipeOpened, setIsModalRecipeOpened] = useState(false);
  const [modalRecipeData, setModalRecipeData] = useState([]);
  let content = '';
  let contentDescription = '';
  if (errorInTheFridge) {
    contentDescription = <div>Please add at least one valid ingredient.</div>;
    return <div>{contentDescription}</div>;
  }
  if (isMagicFridge) {
    contentDescription = (
      <>
        <h3>Here we go!</h3>
        <p>
          We have tried to select the best fitting recipes based on your fridge ingredients. Some
          ingredients may be missing so your imagination can help you how to change them and cook
          the best meal ever!
        </p>
      </>
    );
  }
  if (detailedRecipes.length) {
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
  return (
    <div>
      <div className={mealDescription}>{contentDescription}</div>
      <ul className={recipeCardsContainer}>{content}</ul>
      {isModalRecipeOpened ? (
        <ModalRecipe
          modalRecipeData={modalRecipeData}
          setIsModalRecipeOpened={setIsModalRecipeOpened}
        />
      ) : null}
    </div>
  );
}
