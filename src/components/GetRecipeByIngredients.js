import styles from '../../style.css';
import FillFridge from './FillFridge';
import FridgeRecipes from './FridgeRecipes';

export default function GetRecipeByIngredients() {
  return `<div class="${styles.getRecipeByIngredientsContainer}">
    ${FillFridge()}
    ${FridgeRecipes()}
  </div>`;
}
