/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import { getRecipeByIngredientsHeader } from './FillFridge.css';
import AddFridgeIngredients from '../AddFridgeIngredients';
import FridgeIngredients from '../FridgeIngredients/FridgeIngredients';

export default function FillFridge() {
  return (
    <div class={getRecipeByIngredientsHeader}>
      <AddFridgeIngredients />
      <FridgeIngredients />
    </div>
  );
}
