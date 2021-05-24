/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import { getDailyMealPlan } from '../../data/spoonacularAPI';
import renderApp from '../../framework/render';
import {
  getMealPlanByGoalHeader,
  getMealPlanByGoalHeader_h2,
  getMealPlanByGoalHeader_p,
} from './SetGoal.css';
import GoalSwitch from '../GoalSwitch';

function setCurrentGoal(value) {
  window.dataStore.currentGoal = value;
  renderApp();
}

function handleWeightChange({ target }) {
  window.dataStore.usersWeight = target.value;
  renderApp();
}

export default function SetGoal() {
  const { currentGoal, usersWeight } = window.dataStore;
  return (
    <div class={getMealPlanByGoalHeader}>
      <h2 class={getMealPlanByGoalHeader_h2}>Do you want to lose or to gain weight?</h2>
      <GoalSwitch currentGoal={currentGoal} setCurrentGoal={setCurrentGoal} />
      <p class={getMealPlanByGoalHeader_p}>
        In case you want to lose weight, we're going to create a meal plan with a decreased amount
        of carbs.
      </p>
      <p class={getMealPlanByGoalHeader_p}>
        If your goal is to gain muscles - we're going to include more high protein dishes.
      </p>
      <h4>What's your weight?</h4>
      <input
        type="number"
        value={usersWeight}
        placeholder="your weight"
        onChange={handleWeightChange}
      />
      <button onClick={getDailyMealPlan}>Submit</button>
    </div>
  );
}
