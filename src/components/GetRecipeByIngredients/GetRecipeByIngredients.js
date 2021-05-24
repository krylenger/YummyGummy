/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';
import { getRecipeByIngredientsContainer } from './GetRecipeByIngredients.css';
import FillFridge from '../FillFridge';
import FridgeRecipes from '../FridgeRecipes';

export default function GetRecipeByIngredients() {
  return (
    <div class={getRecipeByIngredientsContainer}>
      <FillFridge />
      <FridgeRecipes />
    </div>
  );
}
