import React from 'react';
import {
  fridgeItemContainer,
  fridgeItemContainer_button,
  fridgeItemContainer_label,
} from './FridgeItem.css';

export function FridgeItem(fridgeItemData, index) {
  return (
    <li className={fridgeItemContainer} id={fridgeItemData} key={index}>
      <button className={fridgeItemContainer_button}>{'x'}</button>
      <label className={fridgeItemContainer_label} htmlFor={fridgeItemData}>
        {fridgeItemData}
      </label>
    </li>
  );
}
