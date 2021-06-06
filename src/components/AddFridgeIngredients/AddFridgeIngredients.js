/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState } from '../../framework';
import { render } from '../../framework';
import styles from './AddFridgeIngredients.css';

function FillFridgeOnChange(value, magicFridgeItems, setMagicFridgeItems) {
  if (magicFridgeItems.length < 5) {
    setMagicFridgeItems([...magicFridgeItems, value]);
    value = '';
  } else {
    alert('5 ingredients are maximum');
  }
}

export default function AddFridgeIngredients({ magicFridgeItems, setMagicFridgeItems }) {
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
        onChange={e => FillFridgeOnChange(e.target.value, magicFridgeItems, setMagicFridgeItems)}
      />
      <button type="submit">+add</button>
    </>
  );
}
