/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import styles from '../../style.css';
import SearchRecipes from './SearchRecipes';
import SearchByNameRecipes from './SearchByNameRecipes';

export default function SearchForRecipesByName() {
  return (
    <div class={styles.searchForRecipeByNameContainer}>
      <SearchRecipes />
      <SearchByNameRecipes />
    </div>
  );
}
