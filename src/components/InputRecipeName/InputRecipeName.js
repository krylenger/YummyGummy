import React from 'react';
import { searchForRecipeByNameContainer_header } from './InputRecipeName.css';

export default function InputRecipeName({ searchedRecipe, setSearchedRecipe }) {
  return (
    <div className={searchForRecipeByNameContainer_header}>
      <h2>Search by recipe name</h2>
      <input
        type="text"
        defaultValue={searchedRecipe}
        placeholder="enter recipe (ex: rice)"
        onKeyDown={({ code, target }) => {
          if (code === 'Enter' || code === 'NumpadEnter') {
            setSearchedRecipe(target.value);
          }
        }}
      />
    </div>
  );
}
