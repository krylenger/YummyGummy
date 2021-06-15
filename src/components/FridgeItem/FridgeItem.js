import React from 'react';
import {
  fridgeItemContainer,
  fridgeItemContainer_removeButton,
  fridgeItemContainer_itemName,
} from './FridgeItem.css';

export function FridgeItem({ fridgeItemData }) {
  return (
    <li className={fridgeItemContainer} id={fridgeItemData}>
      <button className={fridgeItemContainer_removeButton}>{'x'}</button>
      <label className={fridgeItemContainer_itemName} htmlFor={fridgeItemData}>
        {fridgeItemData}
      </label>
    </li>
  );
}
