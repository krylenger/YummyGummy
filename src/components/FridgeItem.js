/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../framework/element';
import styles from '../../style.css';

window.removeFridgeItem = removeFridgeItem;

function removeFridgeItem(id) {
  window.dataStore.magicFridgeItems = window.dataStore.magicFridgeItems.filter(item => item !== id);
  window.renderApp();
}

export function FridgeItem(fridgeItemData) {
  return (
    <div class={styles.fridgeItemContainer}>
      <button
        class={styles.fridgeItemContainer_button}
        id={fridgeItemData}
        onClick={event => window.removeFridgeItem(event.target.id)}
      >
        {'x'}
      </button>
      <label class={styles.fridgeItemContainer_label} For={fridgeItemData}>
        {fridgeItemData}
      </label>
    </div>
  );
}
