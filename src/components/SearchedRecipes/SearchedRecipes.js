import React from 'react';
import { RecipeCard, getPreparedRecipeCardData } from '../RecipeCard';
import { openModalRecipe } from '../ModalRecipe';
import { recipeCardsContainer } from './SearchedRecipes.css';

function findTargetCardAndOpenModal(
  { target },
  setIsModalRecipeOpened,
  setModalRecipeData,
  detailedRecipes,
) {
  let card = target.closest('li');
  if (!card) return;
  openModalRecipe(card.id, setIsModalRecipeOpened, setModalRecipeData, detailedRecipes);
}

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
      return RecipeCard(preparedRecipeCardData);
    });
    content = recipeCards;
  }

  return (
    <ul
      className={recipeCardsContainer}
      onClick={event =>
        findTargetCardAndOpenModal(
          event,
          setIsModalRecipeOpened,
          setModalRecipeData,
          detailedRecipes,
        )
      }
    >
      {content}
    </ul>
  );
}
