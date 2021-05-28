/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import { performSearchRecipes } from '../../data/spoonacularAPI';
import { searchForRecipeByNameContainer_header } from './InputRecipeName.css';

export default function InputRecipeName({ searchedRecipe, setSearchedRecipe }) {
  return (
    <div class={searchForRecipeByNameContainer_header}>
      <h2>Search by recipe name</h2>
      <input
        type="text"
        value={searchedRecipe}
        placeholder="enter recipe (ex: rice)"
        onkeydown={({ code, target }) => {
          if (code === 'Enter' || code === 'NumpadEnter') {
            setSearchedRecipe(target.value);
          }
        }}
      />
    </div>
  );
}
