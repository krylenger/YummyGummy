/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import { mealDescription, recipeCardsContainer } from './FridgeRecipes.css';
import { getPreparedRecipeCardData, RecipeCard } from '../RecipeCard/RecipeCard';
import { openModalRecipe } from '../ModalRecipe';

function findElementAndOpenModal({ target }) {
  let card = target.closest('li');
  if (!card) return;
  openModalRecipe(card.id);
}

export default function FridgeRecipes() {
  const { isMagicFridge, detailedMagicFridgeRecipes, errorInTheFridge } = window.dataStore;
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
  if (detailedMagicFridgeRecipes.length) {
    const recipeCards = window.dataStore.detailedMagicFridgeRecipes.map(detailedRecipeCardData => {
      const preparedRecipeCardData = getPreparedRecipeCardData(detailedRecipeCardData);
      return RecipeCard(preparedRecipeCardData);
    });
    content = recipeCards;
  }
  return (
    <div>
      <div class={mealDescription}>{contentDescription}</div>
      <ul class={recipeCardsContainer} onClick={event => findElementAndOpenModal(event)}>
        {content}
      </ul>
    </div>
  );
}
