import React from 'react';
import {
  fridgeIngredientsListContainer_magicButton,
  fridgeIngredientsListContainer,
  fridgeIngredientsListContainer_inner,
} from './FridgeIngredients.css';
import { FridgeItem } from '../FridgeItem/FridgeItem';
import { useMagicFridgeItemsContext } from '../../context';

function removeFridgeItem(target, magicFridgeItems, setMagicFridgeItems) {
  const item = target.closest('li');
  const id = item.id;
  if (!item) return;
  setMagicFridgeItems(magicFridgeItems.filter(item => item !== id));
}

export default function FridgeIngredients({ setMagicFridgeItems, setIsMagicButtonClicked }) {
  let magicButton;
  const magicFridgeItems = useMagicFridgeItemsContext();
  magicButton = magicFridgeItems.length ? (
    <button
      className={fridgeIngredientsListContainer_magicButton}
      onClick={() => setIsMagicButtonClicked(true)}
    >
      Magic
    </button>
  ) : null;

  return (
    <div className={fridgeIngredientsListContainer}>
      <div className={fridgeIngredientsListContainer_inner}>
        <ul
          onClick={event => removeFridgeItem(event.target, magicFridgeItems, setMagicFridgeItems)}
        >
          {magicFridgeItems.map((fridgeItemData, index) => (
            <FridgeItem key={index} fridgeItemData={fridgeItemData} />
          ))}
        </ul>
      </div>
      {magicButton}
    </div>
  );
}
