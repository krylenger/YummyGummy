/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';
import { getMealPlanByGoal } from './getMealPlanByGoal.css';
import SetGoal from '../SetGoal';
import DailyMealPlan from '../DailyMealPlan/DailyMealPlan';

export default function GetMealPlanByGoal() {
  return (
    <div class={getMealPlanByGoal}>
      <SetGoal />
      <DailyMealPlan />
    </div>
  );
}
