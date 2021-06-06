/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, useState, useEffect } from '../../framework';
import { getMealPlanByGoal } from './GetMealPlanByGoal.css';
import SetGoal from '../SetGoal';
import DailyMealPlan from '../DailyMealPlan/DailyMealPlan';
import { getShortRecipesData, getDetailedRecipesData } from '../../framework/customHooks';

import { getRapidAPIFetchOptionsData, getUrlOfDetailedRecipe } from '../../data/spoonacularAPI';
import { ModalRecipe } from '../ModalRecipe';

export default function GetMealPlanByGoal() {
  const {
    currentGoal,
    usersWeight,
    isSubmitClicked,
    isShortRecipesInfoLoaded,
    shortRecipesData,
    dailyMealPlan,
    error,
    setCurrentGoal,
    setUsersWeight,
    setIsSubmitClicked,
    setError,
  } = getShortRecipesData();
  const { detailedRecipes } = getDetailedRecipesData({
    isShortRecipesInfoLoaded,
    shortRecipesData,
    setError,
  });
  const [isModalRecipeOpened, setIsModalRecipeOpened] = useState(false);
  const [modalRecipeData, setModalRecipeData] = useState([]);

  return (
    <div class={getMealPlanByGoal}>
      <SetGoal
        currentGoal={currentGoal}
        setCurrentGoal={setCurrentGoal}
        usersWeight={usersWeight}
        setUsersWeight={setUsersWeight}
        setIsSubmitClicked={setIsSubmitClicked}
      />
      <DailyMealPlan
        dailyMealPlan={dailyMealPlan}
        detailedRecipes={detailedRecipes}
        setIsModalRecipeOpened={setIsModalRecipeOpened}
        setModalRecipeData={setModalRecipeData}
      />
      {isModalRecipeOpened ? (
        <ModalRecipe
          modalRecipeData={modalRecipeData}
          setIsModalRecipeOpened={setIsModalRecipeOpened}
        />
      ) : null}
    </div>
  );
}
