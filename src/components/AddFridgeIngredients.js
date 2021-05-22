/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import styles from '../../style.css';

window.FillFridgeOnChangeCB = FillFridgeOnChangeCB;

function FillFridgeOnChangeCB(value) {
  const { magicFridgeItems } = window.dataStore;

  if (magicFridgeItems.length < 5) {
    magicFridgeItems.push(value);
    value = '';
    window.renderApp();
  } else {
    alert('5 ingredients are maximum');
  }
}

export default function AddFridgeIngredients() {
  return (
    <>
      <h2>What's in your fridge?</h2>
      <p class={styles.getRecipeByIngredientsHeader_p}>
        Enter up to 5 products you have in the fridge to cook the best meal. Example: apple, milk,
        sugar.
      </p>
      <input
        type="text"
        placeholder="what is in your fridge?"
        onChange={e => window.FillFridgeOnChangeCB(e.target.value)}
      />
      <button type="submit">+add</button>
    </>
  );
}
