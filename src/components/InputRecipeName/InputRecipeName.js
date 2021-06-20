import React from 'react';
import {
  searchForRecipeByNameContainer_header,
  searchForRecipeByNameContainer_inputField,
} from './InputRecipeName.css';

export default function InputRecipeName({ searchedRecipe, setSearchedRecipe }) {
  return (
    <div className={searchForRecipeByNameContainer_header}>
      <h2>Search by recipe name</h2>
      <input
        className={searchForRecipeByNameContainer_inputField}
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
