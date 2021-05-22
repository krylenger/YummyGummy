/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import GetMealPlanByGoal from './GetMealPlanByGoal';
import GetRecipeByIngredients from './GetRecipeByIngredients';
import SearchForRecipesByName from './SearchForRecipesByName';
import { ModalRecipe } from './ModalRecipe';
import styles from '../../style.css';

export default function App() {
  return (
    <div class={styles.appContainer}>
      <header class={styles.header}>
        <h1>YummySpoon</h1>
      </header>
      <GetMealPlanByGoal />
      <GetRecipeByIngredients />
      <SearchForRecipesByName />
      {window.dataStore.isModalRecipeOpened ? <ModalRecipe /> : null}
    </div>
  );
}
