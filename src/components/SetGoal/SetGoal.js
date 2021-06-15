import React from 'react';
import {
  getMealPlanByGoalHeader,
  getMealPlanByGoalHeader_sectionTitle,
  getMealPlanByGoalHeader_info,
  userWeightInput,
} from './SetGoal.css';
import GoalSwitch from '../GoalSwitch';
import { displayUserActivityLevelAsString } from '../../utils';

function handleFormChange(setIsSubmitClicked) {
  event.preventDefault();
  setIsSubmitClicked(true);
}

export default function SetGoal({
  setCurrentGoal,
  userWeight,
  userHeight,
  userAge,
  userActivity,
  setUserWeight,
  setUserHeight,
  setUserAge,
  setUserActivity,
  setIsSubmitClicked,
}) {
  return (
    <div className={getMealPlanByGoalHeader}>
      <form onSubmit={() => handleFormChange(setIsSubmitClicked)}>
        <h2 className={getMealPlanByGoalHeader_sectionTitle}>
          Do you want to lose or to gain weight?
        </h2>
        <GoalSwitch setCurrentGoal={setCurrentGoal} />
        <p className={getMealPlanByGoalHeader_info}>
          We are in one step from offering you the best meal plan, based on your personal data.
        </p>

        <h4>What's your weight?</h4>
        <input
          className={userWeightInput}
          type="number"
          value={userWeight}
          placeholder="kg"
          onChange={e => setUserWeight(e.target.value)}
          required
        />
        <h4>What's your height?</h4>
        <input
          className={userWeightInput}
          type="number"
          value={userHeight}
          placeholder="cm"
          onChange={e => setUserHeight(e.target.value)}
          required
        />
        <h4>How old are you?</h4>
        <input
          className={userWeightInput}
          type="number"
          value={userAge}
          placeholder="years"
          onChange={e => setUserAge(e.target.value)}
          required
        />
        <h4>What's your activity level?</h4>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={userActivity}
          placeholder="activity"
          onChange={e => setUserActivity(e.target.value)}
          required
        />
        <p>{displayUserActivityLevelAsString(userActivity)}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
