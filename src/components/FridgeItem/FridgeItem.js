/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';
import renderApp from '../../framework/render';
import {
  fridgeItemContainer,
  fridgeItemContainer_button,
  fridgeItemContainer_label,
} from './FridgeItem.css';

export function FridgeItem(fridgeItemData) {
  return (
    <li class={fridgeItemContainer} id={fridgeItemData}>
      <button class={fridgeItemContainer_button}>{'x'}</button>
      <label class={fridgeItemContainer_label} For={fridgeItemData}>
        {fridgeItemData}
      </label>
    </li>
  );
}
