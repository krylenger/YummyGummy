/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';
import { getRecipeByIngredientsContainer } from './GetRecipeByIngredients.css';
import FillFridge from '../FillFridge';
import FridgeRecipes from '../FridgeRecipes';
import { getDetailedRecipesData, getShortRecipesFridgeData } from '../../framework/customHooks';

export default function GetRecipeByIngredients() {
  const {
    isMagicButtonClicked,
    magicFridgeItems,
    isMagicFridge,
    errorInTheFridge,
    err,
    shortRecipesData,
    isShortRecipesInfoLoaded,
    setMagicFridgeItems,
    setIsMagicButtonClicked,
  } = getShortRecipesFridgeData();

  const { detailedRecipes } = getDetailedRecipesData({
    isShortRecipesInfoLoaded,
    shortRecipesData,
  });
  return (
    <div class={getRecipeByIngredientsContainer}>
      <FillFridge
        magicFridgeItems={magicFridgeItems}
        setMagicFridgeItems={setMagicFridgeItems}
        setIsMagicButtonClicked={setIsMagicButtonClicked}
      />
      <FridgeRecipes
        detailedRecipes={detailedRecipes}
        isMagicFridge={isMagicFridge}
        errorInTheFridge={errorInTheFridge}
      />
    </div>
  );
}
