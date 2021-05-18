import styles from '../../style.css';
import { getPreparedRecipeCardData, RecipeCard } from './RecipeCard';

export default function FridgeRecipes() {
  const { isMagicFridge, detailedMagicFridgeRecipes, errorInTheFridge } = window.dataStore;
  let content = '';
  let contentDescription = '';
  if (errorInTheFridge) {
    contentDescription = `<div>Please add at least one valid ingredient.</div>`;
    return `<div>${contentDescription}</div>`;
  }
  if (isMagicFridge) {
    contentDescription = `<h3>Here we go!</h3><p>We have tried to select the best fitting recipes based on your fridge ingredients. Some ingredients may be missing so your imagination can help you how to change them and cook the best meal ever!</p>`;
  }
  if (detailedMagicFridgeRecipes.length) {
    const recipeCards = window.dataStore.detailedMagicFridgeRecipes.map(detailedRecipeCardData => {
      const preparedRecipeCardData = getPreparedRecipeCardData(detailedRecipeCardData);
      return RecipeCard(preparedRecipeCardData);
    });
    content = recipeCards.join('');
  }
  return `<div><div class="${styles.mealDescription}">${contentDescription}</div><div class="${styles.recipeCardsContainer}">${content}</div></div>`;
}
