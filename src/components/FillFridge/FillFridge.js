/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework';
import { getRecipeByIngredientsHeader } from './FillFridge.css';
import AddFridgeIngredients from '../AddFridgeIngredients';
import FridgeIngredients from '../FridgeIngredients/FridgeIngredients';

export default function FillFridge({
  magicFridgeItems,
  setMagicFridgeItems,
  setIsMagicButtonClicked,
}) {
  return (
    <div class={getRecipeByIngredientsHeader}>
      <AddFridgeIngredients
        magicFridgeItems={magicFridgeItems}
        setMagicFridgeItems={setMagicFridgeItems}
      />
      <FridgeIngredients
        magicFridgeItems={magicFridgeItems}
        setMagicFridgeItems={setMagicFridgeItems}
        setIsMagicButtonClicked={setIsMagicButtonClicked}
      />
    </div>
  );
}
