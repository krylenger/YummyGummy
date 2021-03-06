import React, { useState } from 'react';
import { useMagicFridgeItemsContext } from '../../context';
import {
  getRecipeByIngredientsHeader_info,
  getRecipeByIngredientsHeader_inputField,
} from './AddFridgeIngredients.css';

function FillFridgeOnChange(value, magicFridgeItems, setMagicFridgeItems) {
  if (magicFridgeItems.length < 5) {
    setMagicFridgeItems([...magicFridgeItems, value]);
  } else {
    alert('5 ingredients are maximum');
  }
}

export default function AddFridgeIngredients({ setMagicFridgeItems }) {
  const [inputValue, setInputValue] = useState('');
  const magicFridgeItems = useMagicFridgeItemsContext();
  return (
    <>
      <h2>What's in your fridge?</h2>
      <p className={getRecipeByIngredientsHeader_info}>
        Enter up to 5 products you have in the fridge to cook the best meal. Example: apple, milk,
        sugar.
      </p>
      <form
        onSubmit={event => {
          event.preventDefault();
          FillFridgeOnChange(inputValue, magicFridgeItems, setMagicFridgeItems);
          setInputValue('');
        }}
      >
        <input
          className={getRecipeByIngredientsHeader_inputField}
          type="text"
          placeholder="ingredient"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button type="submit">+add</button>
      </form>
    </>
  );
}
