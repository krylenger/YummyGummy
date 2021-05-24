/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import {
  fridgeIngredientsListContainer_magicButton,
  fridgeIngredientsListContainer,
  fridgeIngredientsListContainer_inner,
} from './FridgeIngredients.css';
import { FridgeItem } from '../FridgeItem/FridgeItem';
import { loadMagicFridgeRecipes, loadDetailedRecipesInfo } from '../../data/spoonacularAPI';

function magicButtonCB() {
  let promise = loadMagicFridgeRecipes();
  promise.then(data => loadDetailedRecipesInfo({ results: data }, 'detailedMagicFridgeRecipes'));
}

export default function FridgeIngredients() {
  let content = null;
  let confirmButton = null;
  if (window.dataStore.magicFridgeItems.length > 0) {
    confirmButton = (
      <button class={fridgeIngredientsListContainer_magicButton} onClick={magicButtonCB}>
        Magic
      </button>
    );
  }
  content = (
    <>{window.dataStore.magicFridgeItems.map(fridgeItemData => FridgeItem(fridgeItemData))}</>
  );
  return (
    <div class={fridgeIngredientsListContainer}>
      <div class={fridgeIngredientsListContainer_inner}>{content}</div>
      {confirmButton}
    </div>
  );
}
