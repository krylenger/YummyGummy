import React from 'react';
import { getRecipeByIngredientsHeader } from './FillFridge.css';
import AddFridgeIngredients from '../AddFridgeIngredients';
import FridgeIngredients from '../FridgeIngredients/FridgeIngredients';

export default function FillFridge({
  magicFridgeItems,
  setMagicFridgeItems,
  setIsMagicButtonClicked,
}) {
  return (
    <div className={getRecipeByIngredientsHeader}>
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
