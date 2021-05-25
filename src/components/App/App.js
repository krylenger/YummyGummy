/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';
import GetMealPlanByGoal from '../GetMealPlanByGoal';
import GetRecipeByIngredients from '../GetRecipeByIngredients';
import SearchForRecipesByName from '../SearchForRecipesByName';
import { ModalRecipe } from '../ModalRecipe';
import { appContainer, header } from './App.css';

export default function App() {
  return (
    <div class={appContainer}>
      <header class={header}>
        <h1>YummySpoon</h1>
      </header>
      <GetMealPlanByGoal />
      <GetRecipeByIngredients />
      <SearchForRecipesByName />
      {window.dataStore.isModalRecipeOpened ? <ModalRecipe /> : null}
    </div>
  );
}