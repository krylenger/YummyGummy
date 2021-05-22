/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import styles from '../../style.css';
import { getNutrientAmount } from '../utils';

export function getModalRecipeData(targetId) {
  const {
    detailedMealPlanRecipes,
    detailedSearchedRecipes,
    detailedMagicFridgeRecipes,
  } = window.dataStore;
  let modalRecipeData = '';
  if (detailedMealPlanRecipes.find(({ id }) => id == targetId)) {
    return detailedMealPlanRecipes.find(({ id }) => id == targetId);
  } else if (detailedSearchedRecipes.find(({ id }) => id == targetId)) {
    return detailedSearchedRecipes.find(({ id }) => id == targetId);
  } else if (detailedMagicFridgeRecipes.find(({ id }) => id == targetId)) {
    return detailedMagicFridgeRecipes.find(({ id }) => id == targetId);
  }
  return modalRecipeData;
}

export function openModalRecipe(targetId) {
  const modalRecipeData = getModalRecipeData(targetId);
  window.dataStore.modalRecipeData = modalRecipeData;
  // window.dataStore.modalRecipeId += `<button onclick="window.dataStore.isModalRecipeOpened = false; window.renderApp();">Close Modal</button>`;
  window.dataStore.isModalRecipeOpened = true;
  window.renderApp();
}

export function closeModalRecipe() {
  window.dataStore.isModalRecipeOpened = false;
  window.renderApp();
}

export function getPreparedModalRecipeData({
  id,
  image,
  instructions,
  nutrition: { nutrients },
  readyInMinutes,
  title,
}) {
  const caloriesAmount = getNutrientAmount('Calories', nutrients);
  const fatAmount = getNutrientAmount('Fat', nutrients);
  const carbohydratesAmount = getNutrientAmount('Carbohydrates', nutrients);
  const proteinAmount = getNutrientAmount('Protein', nutrients);
  return {
    id,
    image,
    instructions,
    readyInMinutes,
    title,
    caloriesAmount,
    fatAmount,
    carbohydratesAmount,
    proteinAmount,
  };
}

export function CreateModalRecipeWindow({
  id,
  image,
  instructions,
  readyInMinutes,
  title,
  caloriesAmount,
  fatAmount,
  carbohydratesAmount,
  proteinAmount,
}) {
  return (
    <div class={styles.modalRecipeContainer}>
      <div class={styles.modalRecipeContainerInner}>
        <h1>{title}</h1>
        <div class={styles.modalRecipeContainer_image}>
          <img src={image} alt={title} />
        </div>
        <div class={styles.modalRecipeContainer_nutrientsContainer}>
          <div class={styles.recipeCard_nutrientInfoLine}>
            <p>Calories:</p>
            <p>{caloriesAmount}</p>
          </div>
          <div class={styles.recipeCard_nutrientInfoLine}>
            <p>Protein:</p>
            <p>{proteinAmount}</p>
          </div>
          <div class={styles.recipeCard_nutrientInfoLine}>
            <p>Fat:</p>
            <p>{fatAmount}</p>
          </div>
          <div class={styles.recipeCard_nutrientInfoLine}>
            <p>Carbohydrates:</p>
            <p>{carbohydratesAmount}</p>
          </div>
        </div>
        <p class={styles.modalRecipeContainer_instructions}>{instructions}</p>
        <p>Ready in: {readyInMinutes} minutes.</p>
        <button onClick={closeModalRecipe}>Close Modal</button>
      </div>
    </div>
  );
}

export function ModalRecipe() {
  const preparedModalRecipeData = getPreparedModalRecipeData(window.dataStore.modalRecipeData);
  const content = CreateModalRecipeWindow(preparedModalRecipeData);
  return content;
}
