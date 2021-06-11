import React from 'react';
import {
  modalRecipeContainer_ingredientsContainer,
  shortInfo_ingredientInfoContainer,
  shortInfo_ingredientInfoLine,
} from './IngredientsList.css';

export default function IngredientsList({ ingredients }) {
  return (
    <div className={modalRecipeContainer_ingredientsContainer}>
      <h3>Ingredients</h3>
      {ingredients.map((ingredient, index) => (
        <div key={index} className={shortInfo_ingredientInfoContainer}>
          <p className={shortInfo_ingredientInfoLine}>{ingredient.name}</p>
          <p className={shortInfo_ingredientInfoLine}>
            {ingredient.amount}
            {`  `}
            {ingredient.unit}
          </p>
        </div>
      ))}
    </div>
  );
}
