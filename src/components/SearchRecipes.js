/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import styles from '../../style.css';

export default function SearchRecipes() {
  const { searchedRecipe } = window.dataStore;
  return (
    <div class={styles.searchForRecipeByNameContainer_header}>
      <h2>Search by recipe name</h2>
      <input
        type="text"
        value={searchedRecipe}
        placeholder="enter recipe (ex: rice)"
        onchange={event => performSearchRecipes(event.target.value)}
      />
    </div>
  );
}
