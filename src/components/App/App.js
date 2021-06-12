import React from 'react';
import GetMealPlanByGoal from '../GetMealPlanByGoal';
import GetRecipeByIngredients from '../GetRecipeByIngredients';
import SearchForRecipesByName from '../SearchForRecipesByName';
import { appContainer, header } from './App.css';

export default function App() {
  return (
    <div className={appContainer}>
      <header className={header}>
        <h1>Yummy🥄Spoon</h1>
      </header>
      <GetMealPlanByGoal />
      <GetRecipeByIngredients />
      <SearchForRecipesByName />
    </div>
  );
}
