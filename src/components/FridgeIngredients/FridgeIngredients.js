import React from 'react';
import {
  fridgeIngredientsListContainer_magicButton,
  fridgeIngredientsListContainer,
  fridgeIngredientsListContainer_inner,
} from './FridgeIngredients.css';
import { FridgeItem } from '../FridgeItem/FridgeItem';

function removeFridgeItem(target, magicFridgeItems, setMagicFridgeItems) {
  const item = target.closest('li');
  const id = item.id;
  if (!item) return;
  setMagicFridgeItems(magicFridgeItems.filter(item => item !== id));
}

export default function FridgeIngredients({
  magicFridgeItems,
  setMagicFridgeItems,
  setIsMagicButtonClicked,
}) {
  let content = null;
  let magicButton = null;
  if (magicFridgeItems.length > 0) {
    magicButton = (
      <button
        className={fridgeIngredientsListContainer_magicButton}
        onClick={() => setIsMagicButtonClicked(true)}
      >
        Magic
      </button>
    );
  }
  content = (
    <ul onClick={event => removeFridgeItem(event.target, magicFridgeItems, setMagicFridgeItems)}>
      {magicFridgeItems.map(fridgeItemData => FridgeItem(fridgeItemData))}
    </ul>
  );
  return (
    <div className={fridgeIngredientsListContainer}>
      <div className={fridgeIngredientsListContainer_inner}>{content}</div>
      {magicButton}
    </div>
  );
}
