import React from 'react';
import {
  modalRecipeContainer,
  modalRecipeContainerInner,
  modalRecipeContainer_imageContainer,
  modalRecipeContainer_image,
  modalRecipeContainer_shortInfoContainer,
  shortInfo_nutrientInfoLine,
  modalRecipeContainer_instructions,
  modalRecipeContainer_header,
  modalRecipeContainer_ingredientsContainer,
  modalRecipeContainer_nutrientsContainer,
  shortInfo_ingredientInfoContainer,
  shortInfo_ingredientInfoLine,
  instructionsContainer,
  modalRecipeContainer_title,
  instructionsContainer_number,
} from './ModalRecipe.css';
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
  analyzedInstructions: [{ steps }],
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
    ingredients,
    steps,
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
    ingredients,
    steps,
  },
  setIsModalRecipeOpened,
) {
  return (
    <div className={modalRecipeContainer}>
      <div className={modalRecipeContainerInner}>
        <div className={modalRecipeContainer_header}>
          <div className={modalRecipeContainer_imageContainer}>
            <img className={modalRecipeContainer_image} src={image} alt={title} />
            <h1 className={modalRecipeContainer_title}>{title}</h1>
          </div>
          <div className={modalRecipeContainer_shortInfoContainer}>
            <div className={modalRecipeContainer_nutrientsContainer}>
              <div className={shortInfo_nutrientInfoLine}>
                <p>Calories:</p>
                <p>{caloriesAmount}</p>
              </div>
              <div className={shortInfo_nutrientInfoLine}>
                <p>Protein:</p>
                <p>{proteinAmount}</p>
              </div>
              <div className={shortInfo_nutrientInfoLine}>
                <p>Fat:</p>
                <p>{fatAmount}</p>
              </div>
              <div className={shortInfo_nutrientInfoLine}>
                <p>Carbohydrates:</p>
                <p>{carbohydratesAmount}</p>
              </div>
            </div>
            <div className={modalRecipeContainer_ingredientsContainer}>
              <h3>Ingredients</h3>
              {ingredients.map(ingredient => (
                <div key={ingredient.id} className={shortInfo_ingredientInfoContainer}>
                  <p className={shortInfo_ingredientInfoLine}>{ingredient.name}</p>
                  <p className={shortInfo_ingredientInfoLine}>
                    {ingredient.amount}
                    {`  `}
                    {ingredient.unit}
                  </p>
                </div>
              ))}
            </div>
            <p>Ready in: {readyInMinutes} minutes.</p>
          </div>
        </div>
        <div className={modalRecipeContainer_instructions}>
          <div>
            {steps.map(({ step, number }) => (
              <div key={step} className={instructionsContainer}>
                <p className={instructionsContainer_number}>{number}</p>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
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
