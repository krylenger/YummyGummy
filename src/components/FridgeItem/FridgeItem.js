/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';
import renderApp from '../../framework/render';
import {
  fridgeItemContainer,
  fridgeItemContainer_button,
  fridgeItemContainer_label,
} from './FridgeItem.css';

function removeFridgeItem(id) {
  window.dataStore.magicFridgeItems = window.dataStore.magicFridgeItems.filter(item => item !== id);
  renderApp();
}

export function FridgeItem(fridgeItemData) {
  return (
    <div class={fridgeItemContainer}>
      <button
        class={fridgeItemContainer_button}
        id={fridgeItemData}
        onClick={event => removeFridgeItem(event.target.id)}
      >
        {'x'}
      </button>
      <label class={fridgeItemContainer_label} For={fridgeItemData}>
        {fridgeItemData}
      </label>
    </div>
  );
}
