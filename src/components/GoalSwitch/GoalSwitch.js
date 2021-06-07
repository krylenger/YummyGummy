/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import { useAppContext } from '../../context';
export default function GoalSwitch({ setCurrentGoal }) {
  const currentGoal = useAppContext();
  return (
    <>
      {[
        { id: 'goalGain', goal: 'gain' },
        { id: 'goalLose', goal: 'lose' },
      ].map(({ goal, id }) => (
        <>
          <input
            id={id}
            type="radio"
            value={goal}
            checked={currentGoal === goal}
            onChange={event => setCurrentGoal(event.target.value)}
          />
          <label For={id}>{goal}</label>
        </>
      ))}
    </>
  );
}
