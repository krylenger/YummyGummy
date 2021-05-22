/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import styles from '../../style.css';
import GoalSwitch from './GoalSwitch';

function setCurrentGoal(value) {
  window.dataStore.currentGoal = value;
  window.renderApp();
}

function handleWeightChange({ target }) {
  window.dataStore.usersWeight = target.value;
  window.renderApp();
}

export default function SetGoal() {
  const { currentGoal, usersWeight } = window.dataStore;
  return (
    <div class={styles.getMealPlanByGoalHeader}>
      <h2 class={styles.getMealPlanByGoalHeader_h2}>Do you want to lose or to gain weight?</h2>
      <GoalSwitch currentGoal={currentGoal} setCurrentGoal={setCurrentGoal} />
      <p class={styles.getMealPlanByGoalHeader_p}>
        In case you want to lose weight, we're going to create a meal plan with a decreased amount
        of carbs.
      </p>
      <p class={styles.getMealPlanByGoalHeader_p}>
        If your goal is to gain muscles - we're going to include more high protein dishes.
      </p>
      <h4>What's your weight?</h4>
      <input
        type="number"
        value={usersWeight}
        placeholder="your weight"
        onChange={handleWeightChange}
      />
      <button onClick={window.getDailyMealPlan}>Submit</button>
    </div>
  );
}
