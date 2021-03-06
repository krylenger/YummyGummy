import React from 'react';
import { recipeCard, recipeCard_image, recipeCard_nutrientInfoLine } from './RecipeCard.css';
import { getNutrientAmount } from '../../utils';
import { openModalRecipe } from '../ModalRecipe';

export function getPreparedRecipeCardData({
  id,
  title,
  image,
  instructions,
  readyInMinutes,
  nutrition: { nutrients },
}) {
  const caloriesAmount = getNutrientAmount('Calories', nutrients);
  const fatAmount = getNutrientAmount('Fat', nutrients);
  const carbohydratesAmount = getNutrientAmount('Carbohydrates', nutrients);
  const proteinAmount = getNutrientAmount('Protein', nutrients);

  return {
    id,
    title,
    image,
    instructions,
    readyInMinutes,
    nutrients,
    caloriesAmount,
    fatAmount,
    carbohydratesAmount,
    proteinAmount,
  };
}

export function RecipeCard({
  preparedRecipeCardData: {
    id,
    title,
    image,
    caloriesAmount,
    fatAmount,
    carbohydratesAmount,
    proteinAmount,
  },
  detailedRecipes,
  setIsModalRecipeOpened,
  setModalRecipeData,
}) {
  return (
    <li
      className={recipeCard}
      id={id}
      tabIndex={0}
      onClick={() =>
        openModalRecipe(id, setIsModalRecipeOpened, setModalRecipeData, detailedRecipes)
      }
      onKeyDown={event => {
        if (event.key === 'Enter' || event.code === 'Space' || event.key === 'EnterNum') {
          openModalRecipe(id, setIsModalRecipeOpened, setModalRecipeData, detailedRecipes);
        }
      }}
    >
      <h4>{title}</h4>
      <img className={recipeCard_image} src={image} alt={title} />
      <div className={recipeCard_nutrientInfoLine}>
        <p>Calories:</p>
        <p>{caloriesAmount}</p>
      </div>
      <div className={recipeCard_nutrientInfoLine}>
        <p>Protein:</p>
        <p>{proteinAmount}</p>
      </div>
      <div className={recipeCard_nutrientInfoLine}>
        <p>Fat:</p>
        <p>{fatAmount}</p>
      </div>
      <div className={recipeCard_nutrientInfoLine}>
        <p>Carbohydrates:</p>
        <p>{carbohydratesAmount}</p>
      </div>
    </li>
  );
}
