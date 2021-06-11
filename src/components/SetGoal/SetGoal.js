import React from 'react';
import {
  getMealPlanByGoalHeader,
  getMealPlanByGoalHeader_h2,
  getMealPlanByGoalHeader_p,
} from './SetGoal.css';
import GoalSwitch from '../GoalSwitch';

function handleFormChange(setIsSubmitClicked) {
  event.preventDefault();
  setIsSubmitClicked(true);
}

export default function SetGoal({
  setCurrentGoal,
  usersWeight,
  setUsersWeight,
  setIsSubmitClicked,
}) {
  return (
    <div className={getMealPlanByGoalHeader}>
      <form onSubmit={() => handleFormChange(setIsSubmitClicked)}>
        <h2 className={getMealPlanByGoalHeader_h2}>Do you want to lose or to gain weight?</h2>
        <GoalSwitch setCurrentGoal={setCurrentGoal} />
        <p className={getMealPlanByGoalHeader_p}>
          In case you want to lose weight, we're going to create a meal plan with a decreased amount
          of carbs.
        </p>
        <p className={getMealPlanByGoalHeader_p}>
          If your goal is to gain muscles - we're going to include more high protein dishes.
        </p>
        <h4>What's your weight?</h4>
        <input
          type="number"
          value={usersWeight}
          placeholder="your weight"
          onChange={e => setUsersWeight(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
