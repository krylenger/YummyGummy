/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';
import styles from '../../style.css';
import SetGoal from './SetGoal';
import DailyMealPlan from './DailyMealPlan';

export default function GetMealPlanByGoal() {
  return (
    <div class={styles.getMealPlanByGoal}>
      <SetGoal />
      <DailyMealPlan />
    </div>
  );
}
