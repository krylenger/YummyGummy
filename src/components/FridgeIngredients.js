import styles from '../../style.css';
import { FridgeItem } from './FridgeItem';
import { loadMagicFridgeRecipes, loadDetailedRecipesInfo } from '../data/spoonacularAPI';

window.magicButtonCB = magicButtonCB;

function magicButtonCB() {
  window.dataStore.isMagicFridge = true;
  let promise = loadMagicFridgeRecipes();
  promise.then(data => loadDetailedRecipesInfo({ results: data }, 'detailedMagicFridgeRecipes'));
  window.renderApp();
}

export default function FridgeIngredients() {
  let content = '';
  let confirmButton = '';
  if (window.dataStore.magicFridgeItems.length > 0) {
    confirmButton = `<button class="${styles.fridgeIngredientsListContainer_magicButton}" onclick="window.magicButtonCB()" >Magic</button>`;
  }
  content = `${window.dataStore.magicFridgeItems
    .map(fridgeItemData => FridgeItem(fridgeItemData))
    .join('')}`;
  return `<div class="${styles.fridgeIngredientsListContainer}"><div class="${styles.fridgeIngredientsListContainer_inner}">${content}</div>${confirmButton}</div>`;
}
