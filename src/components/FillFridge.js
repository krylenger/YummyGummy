import styles from '../../style.css';
import AddFridgeIngredients from './AddFridgeIngredients';
import FridgeIngredients from './FridgeIngredients';

export default function FillFridge() {
  return `<div class="${styles.getRecipeByIngredientsHeader}">
    ${AddFridgeIngredients()}
    ${FridgeIngredients()}
  </div>`;
}
