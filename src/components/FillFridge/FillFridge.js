import React from 'react';
import { getRecipeByIngredientsHeader } from './FillFridge.css';
import AddFridgeIngredients from '../AddFridgeIngredients';
import FridgeIngredients from '../FridgeIngredients/FridgeIngredients';

export default function FillFridge({ setMagicFridgeItems, setIsMagicButtonClicked }) {
  return (
    <div className={getRecipeByIngredientsHeader}>
      <AddFridgeIngredients setMagicFridgeItems={setMagicFridgeItems} />
      <FridgeIngredients
        setMagicFridgeItems={setMagicFridgeItems}
        setIsMagicButtonClicked={setIsMagicButtonClicked}
      />
    </div>
  );
}
