/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import styles from '../../style.css';
import { FridgeItem } from './FridgeItem';
import { loadMagicFridgeRecipes, loadDetailedRecipesInfo } from '../data/spoonacularAPI';

window.magicButtonCB = magicButtonCB;

function magicButtonCB() {
  let promise = loadMagicFridgeRecipes();
  promise.then(data => loadDetailedRecipesInfo({ results: data }, 'detailedMagicFridgeRecipes'));
}

export default function FridgeIngredients() {
  let content = null;
  let confirmButton = null;
  if (window.dataStore.magicFridgeItems.length > 0) {
    confirmButton = (
      <button
        class={styles.fridgeIngredientsListContainer_magicButton}
        onClick={window.magicButtonCB}
      >
        Magic
      </button>
    );
  }
  content = (
    <>{window.dataStore.magicFridgeItems.map(fridgeItemData => FridgeItem(fridgeItemData))}</>
  );
  return (
    <div class={styles.fridgeIngredientsListContainer}>
      <div class={styles.fridgeIngredientsListContainer_inner}>{content}</div>
      {confirmButton}
    </div>
  );
}
