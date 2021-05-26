/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';
import { searchForRecipeByNameContainer } from './SearchForRecipesByName.css';
import SearchRecipes from '../SearchRecipes';
import SearchByNameRecipes from '../SearchByNameRecipes';

export default function SearchForRecipesByName() {
  return (
    <div class={searchForRecipeByNameContainer}>
      <SearchRecipes />
      <SearchByNameRecipes />
    </div>
  );
}
