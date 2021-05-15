import styles from '../../style.css';

window.removeFridgeItem = removeFridgeItem;

function removeFridgeItem(id) {
  window.dataStore.magicFridgeItems = window.dataStore.magicFridgeItems.filter(item => item !== id);
  window.renderApp();
}

export function FridgeItem(fridgeItemData) {
  return `<div class="${styles.fridgeItemContainer}">
  <button class="${styles.fridgeItemContainer_button}" id="${fridgeItemData}" onclick="window.removeFridgeItem(this.id);">x</button>
  <label class="${styles.fridgeItemContainer_label}" for="${fridgeItemData}">${fridgeItemData}</label>
  </div>`;
}
