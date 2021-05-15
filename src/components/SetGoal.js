import styles from '../../style.css';
import GoalSwitch from './GoalSwitch';

function setCurrentGoal(value) {
  window.dataStore.currentGoal = value;
  window.renderApp();
}

export default function SetGoal() {
  const { currentGoal, usersWeight } = window.dataStore;
  return `<div class="${styles.getMealPlanByGoalHeader}">
    <h2 class="${styles.getMealPlanByGoalHeader_h2}">Do you want to lose or to gain weight?</h2>
    ${GoalSwitch(currentGoal, setCurrentGoal)}
    <p class="${
      styles.getMealPlanByGoalHeader_p
    }">In case you want to lose weight, we're going to create a meal plan with a decreased amount of carbs.</p>
    <p class="${
      styles.getMealPlanByGoalHeader_p
    }">If your goal is to gain muscles - we're going to include more high protein dishes.
    <h4>What's your weight?</h4>
    <input type="number" value="${usersWeight}" placeholder="your weight" onchange="window.dataStore.usersWeight = this.value; window.renderApp();">
    <button onclick="window.getDailyMealPlan()">Submit</button>
  </div>`;
}
