/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import { performSearchRecipes } from '../../data/spoonacularAPI';
import { searchForRecipeByNameContainer_header } from './SearchRecipes.css';

export default function SearchRecipes({ searchedRecipe, setSearchedRecipe }) {
  // const { searchedRecipe } = window.dataStore;
  return (
    <div class={searchForRecipeByNameContainer_header}>
      <h2>Search by recipe name</h2>
      <input
        type="text"
        value={searchedRecipe}
        placeholder="enter recipe (ex: rice)"
        onchange={event => setSearchedRecipe(event.target.value)}
      />
    </div>
  );
}
