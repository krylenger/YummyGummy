/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import { openModalRecipe } from '../ModalRecipe/ModalRecipe';
import { recipeCard, recipeCard_image, recipeCard_nutrientInfoLine } from './RecipeCard.css';
import { getNutrientAmount } from '../../utils';

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
}) {
  return (
    <div
      class={recipeCard}
      id={id}
      onclick={function () {
        openModalRecipe(this.id);
      }}
    >
      <h4>{title}</h4>
      <img class={recipeCard_image} src={image} alt={title} />
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
  );
}
