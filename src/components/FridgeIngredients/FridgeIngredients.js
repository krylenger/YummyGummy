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
import renderApp from '../../framework/render';

function removeFridgeItem({ target }) {
  const item = target.closest('li');
  const id = item.id;
  if (!item) return;
  window.dataStore.magicFridgeItems = window.dataStore.magicFridgeItems.filter(item => item !== id);
  renderApp();
}

function magicButton() {
  let promise = loadMagicFridgeRecipes();
  promise.then(data => loadDetailedRecipesInfo({ results: data }, 'detailedMagicFridgeRecipes'));
}

export default function FridgeIngredients() {
  let content = null;
  let confirmButton = null;
  if (window.dataStore.magicFridgeItems.length > 0) {
    confirmButton = (
      <button class={fridgeIngredientsListContainer_magicButton} onClick={magicButton}>
        Magic
      </button>
    );
  }
  content = (
    <ul onClick={event => removeFridgeItem(event)}>
      {window.dataStore.magicFridgeItems.map(fridgeItemData => FridgeItem(fridgeItemData))}
    </ul>
  );
  return (
    <div class={fridgeIngredientsListContainer}>
      <div class={fridgeIngredientsListContainer_inner}>{content}</div>
      {confirmButton}
    </div>
  );
}
