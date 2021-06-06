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

function removeFridgeItem(target, magicFridgeItems, setMagicFridgeItems) {
  const item = target.closest('li');
  const id = item.id;
  if (!item) return;
  setMagicFridgeItems(magicFridgeItems.filter(item => item !== id));
  renderApp();
}

export default function FridgeIngredients({
  magicFridgeItems,
  setMagicFridgeItems,
  setIsMagicButtonClicked,
}) {
  let content = null;
  let magicButton = null;
  if (magicFridgeItems.length > 0) {
    magicButton = (
      <button
        class={fridgeIngredientsListContainer_magicButton}
        onClick={() => setIsMagicButtonClicked(true)}
      >
        Magic
      </button>
    );
  }
  content = (
    <ul onClick={event => removeFridgeItem(event.target, magicFridgeItems, setMagicFridgeItems)}>
      {magicFridgeItems.map(fridgeItemData => FridgeItem(fridgeItemData))}
    </ul>
  );
  return (
    <div class={fridgeIngredientsListContainer}>
      <div class={fridgeIngredientsListContainer_inner}>{content}</div>
      {magicButton}
    </div>
  );
}
