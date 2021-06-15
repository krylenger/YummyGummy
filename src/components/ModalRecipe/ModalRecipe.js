import React from 'react';
import {
  modalRecipeContainer,
  modalRecipeContainerInner,
  modalRecipeContainer_imageContainer,
  modalRecipeContainer_recipeImage,
  modalRecipeContainer_shortInfoContainer,
  shortInfo_nutrientInfoLine,
  modalRecipeContainer_instructions,
  modalRecipeContainer_header,
  modalRecipeContainer_nutrientsContainer,
  nutrientInfoLine_bold,
  modalRecipeContainer_title,
  shortInfo_readyIn,
  button_closeModal,
} from './ModalRecipe.css';
import CookingInstructions from '../CookingInstructions';
import IngredientsList from '../IngredientsList';
import { getNutrientAmount } from '../../utils';

export function getModalRecipeData(targetId, detailedRecipes) {
  return detailedRecipes.find(({ id }) => id == targetId);
}

export function openModalRecipe(
  targetId,
  setIsModalRecipeOpened,
  setModalRecipeData,
  detailedRecipes,
) {
  const modalRecipeData = getModalRecipeData(targetId, detailedRecipes);
  setModalRecipeData(modalRecipeData);
  setIsModalRecipeOpened(true);
}

export function getPreparedModalRecipeData({
  id,
  image,
  instructions,
  nutrition: { nutrients, ingredients },
  readyInMinutes,
  title,
  analyzedInstructions,
}) {
  const steps = analyzedInstructions.length
    ? analyzedInstructions[0].steps
    : [{ number: '', step: 'Sorry, no instructions for this recipe.' }];
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
    ingredients,
    steps,
  };
}

export function ModalRecipe({ modalRecipeData, setIsModalRecipeOpened }) {
  const {
    image,
    readyInMinutes,
    title,
    caloriesAmount,
    fatAmount,
    carbohydratesAmount,
    proteinAmount,
    ingredients,
    steps,
  } = getPreparedModalRecipeData(modalRecipeData);

  return (
    <div className={modalRecipeContainer}>
      <div className={modalRecipeContainerInner}>
        <div className={modalRecipeContainer_header}>
          <div className={modalRecipeContainer_imageContainer}>
            <img className={modalRecipeContainer_recipeImage} src={image} alt={title} />
            <h1 className={modalRecipeContainer_title}>{title}</h1>
          </div>
          <div className={modalRecipeContainer_shortInfoContainer}>
            <div className={modalRecipeContainer_nutrientsContainer}>
              <div className={shortInfo_nutrientInfoLine}>
                <p className={nutrientInfoLine_bold}>Calories:</p>
                <p>{caloriesAmount}</p>
              </div>
              <div className={shortInfo_nutrientInfoLine}>
                <p className={nutrientInfoLine_bold}>Protein:</p>
                <p>{proteinAmount}</p>
              </div>
              <div className={shortInfo_nutrientInfoLine}>
                <p className={nutrientInfoLine_bold}>Fat:</p>
                <p>{fatAmount}</p>
              </div>
              <div className={shortInfo_nutrientInfoLine}>
                <p className={nutrientInfoLine_bold}>Carbohydrates:</p>
                <p>{carbohydratesAmount}</p>
              </div>
            </div>
            <IngredientsList ingredients={ingredients} />
            <p className={shortInfo_readyIn}>Ready in: {readyInMinutes} minutes.</p>
          </div>
        </div>
        <div className={modalRecipeContainer_instructions}>
          <div>
            <CookingInstructions steps={steps} />
          </div>
        </div>
        <button
          className={button_closeModal}
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
