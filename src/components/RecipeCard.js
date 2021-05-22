/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import styles from '../../style.css';
import { getNutrientAmount } from '../utils';

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
      class={styles.recipeCard}
      id={id}
      onclick={function () {
        window.openModalRecipe(this.id);
      }}
    >
      <h4>{title}</h4>
      <img class={styles.recipeCard_image} src={image} alt={title} />
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
  );
}
