/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import renderApp from '../../framework/render';
import {
  modalRecipeContainer,
  modalRecipeContainerInner,
  modalRecipeContainer_image,
  modalRecipeContainer_nutrientsContainer,
  recipeCard_nutrientInfoLine,
  modalRecipeContainer_instructions,
} from './ModalRecipe.css';
import { getNutrientAmount } from '../../utils';

export function getModalRecipeData(targetId, detailedRecipes) {
  // console.log('***');
  // console.log(targetId, detailedRecipes);
  // console.log('***');

  return detailedRecipes.find(({ id }) => id == targetId);
}

export function openModalRecipe(
  targetId,
  setIsModalRecipeOpened,
  setModalRecipeData,
  detailedRecipes,
) {
  console.log(targetId, detailedRecipes);
  const modalRecipeData = getModalRecipeData(targetId, detailedRecipes);
  setModalRecipeData(modalRecipeData);
  setIsModalRecipeOpened(true);
}

export function closeModalRecipe() {
  window.dataStore.isModalRecipeOpened = false;
  renderApp();
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

export function CreateModalRecipeWindow(
  {
    id,
    image,
    instructions,
    readyInMinutes,
    title,
    caloriesAmount,
    fatAmount,
    carbohydratesAmount,
    proteinAmount,
  },
  setIsModalRecipeOpened,
) {
  return (
    <div class={modalRecipeContainer}>
      <div class={modalRecipeContainerInner}>
        <h1>{title}</h1>
        <div class={modalRecipeContainer_image}>
          <img src={image} alt={title} />
        </div>
        <div class={modalRecipeContainer_nutrientsContainer}>
          <div class={recipeCard_nutrientInfoLine}>
            <p>Calories:</p>
            <p>{caloriesAmount}</p>
          </div>
          <div class={recipeCard_nutrientInfoLine}>
            <p>Protein:</p>
            <p>{proteinAmount}</p>
          </div>
          <div class={recipeCard_nutrientInfoLine}>
            <p>Fat:</p>
            <p>{fatAmount}</p>
          </div>
          <div class={recipeCard_nutrientInfoLine}>
            <p>Carbohydrates:</p>
            <p>{carbohydratesAmount}</p>
          </div>
        </div>
        <p class={modalRecipeContainer_instructions}>{instructions}</p>
        <p>Ready in: {readyInMinutes} minutes.</p>
        <button
          onClick={() => {
            setIsModalRecipeOpened(false);
          }}
        >
          Close Modal
        </button>
      </div>
    </div>
  );
}

export function ModalRecipe({ modalRecipeData, setIsModalRecipeOpened }) {
  const preparedModalRecipeData = getPreparedModalRecipeData(modalRecipeData);
  const content = CreateModalRecipeWindow(preparedModalRecipeData, setIsModalRecipeOpened);
  return content;
}
