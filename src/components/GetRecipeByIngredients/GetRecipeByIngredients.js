import React from 'react';
import { getRecipeByIngredientsContainer } from './GetRecipeByIngredients.css';
import FillFridge from '../FillFridge';
import FridgeRecipes from '../FridgeRecipes';
import { getDetailedRecipesData, getShortRecipesFridgeData } from '../../framework/customHooks';
import { MagicFridgeItemsContext } from '../../context';

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
      <MagicFridgeItemsContext.Provider value={magicFridgeItems}>
        <FillFridge
          setMagicFridgeItems={setMagicFridgeItems}
          setIsMagicButtonClicked={setIsMagicButtonClicked}
        />
      </MagicFridgeItemsContext.Provider>
      <FridgeRecipes
        detailedRecipes={detailedRecipes}
        isMagicFridge={isMagicFridge}
        errorInTheFridge={errorInTheFridge}
      />
    </div>
  );
}
