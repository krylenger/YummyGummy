/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../framework/element';
import renderApp from '../framework/render';
import styles from '../../style.css';

function removeFridgeItem(id) {
  window.dataStore.magicFridgeItems = window.dataStore.magicFridgeItems.filter(item => item !== id);
  renderApp();
}

export function FridgeItem(fridgeItemData) {
  return (
    <div class={styles.fridgeItemContainer}>
      <button
        class={styles.fridgeItemContainer_button}
        id={fridgeItemData}
        onClick={event => removeFridgeItem(event.target.id)}
      >
        {'x'}
      </button>
      <label class={styles.fridgeItemContainer_label} For={fridgeItemData}>
        {fridgeItemData}
      </label>
    </div>
  );
}
