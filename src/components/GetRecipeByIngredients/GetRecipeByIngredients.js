import React from 'react';
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
    shortRecipesData,
    isShortRecipesInfoLoaded,
    setMagicFridgeItems,
    setIsMagicButtonClicked,
    setError,
    setIsDataLoading,
  } = getShortRecipesFridgeData();

  const { detailedRecipes } = getDetailedRecipesData({
    isShortRecipesInfoLoaded,
    shortRecipesData,
    setError,
    setIsDataLoading,
  });
  return (
    <div className={getRecipeByIngredientsContainer}>
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
