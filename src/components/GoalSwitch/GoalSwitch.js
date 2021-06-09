import React from 'react';
import { useAppContext } from '../../context';
import { radioButtonsContainer } from './GoalSwitch.css';

const goals = [
  { id: 'goalGain', goal: 'gain' },
  { id: 'goalLose', goal: 'lose' },
];

export default function GoalSwitch({ setCurrentGoal }) {
  const currentGoal = useAppContext();
  return (
    <div className={radioButtonsContainer}>
      {goals.map(({ goal, id }) => (
        <div key={goal}>
          <input
            id={id}
            type="radio"
            value={goal}
            checked={currentGoal === goal}
            onChange={event => setCurrentGoal(event.target.value)}
          />
          <label htmlFor={id} key={id}>
            {goal}
          </label>
        </div>
      ))}
    </div>
  );
}
