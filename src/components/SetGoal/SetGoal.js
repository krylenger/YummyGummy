import React from 'react';
import {
  getMealPlanByGoalHeader,
  getMealPlanByGoalHeader_sectionTitle,
  getMealPlanByGoalHeader_info,
  usersWeightInput,
} from './SetGoal.css';
import GoalSwitch from '../GoalSwitch';
import { displayUsersActivityLevelAsString } from '../../utils';

function handleFormChange(setIsSubmitClicked) {
  event.preventDefault();
  setIsSubmitClicked(true);
}

export default function SetGoal({
  setCurrentGoal,
  usersWeight,
  usersHeight,
  usersAge,
  usersActivity,
  setUsersWeight,
  setUsersHeight,
  setUsersAge,
  setUsersActivity,
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
          className={usersWeightInput}
          type="number"
          value={usersWeight}
          placeholder="kg"
          onChange={e => setUsersWeight(e.target.value)}
          required
        />
        <h4>What's your height?</h4>
        <input
          className={usersWeightInput}
          type="number"
          value={usersHeight}
          placeholder="cm"
          onChange={e => setUsersHeight(e.target.value)}
          required
        />
        <h4>How old are you?</h4>
        <input
          className={usersWeightInput}
          type="number"
          value={usersAge}
          placeholder="years"
          onChange={e => setUsersAge(e.target.value)}
          required
        />
        <h4>What's your activity level?</h4>
        <input
          // className={usersWeightInput}
          type="range"
          min="1"
          max="5"
          step="1"
          value={usersActivity}
          placeholder="activity"
          onChange={e => setUsersActivity(e.target.value)}
          required
        />
        <p>{displayUsersActivityLevelAsString(usersActivity)}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
