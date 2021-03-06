import React, { useState } from 'react';
import SetGoal from '../SetGoal';
import DailyMealPlan from '../DailyMealPlan/DailyMealPlan';
import { ModalRecipe } from '../ModalRecipe';
import { getMealPlanByGoal } from './GetMealPlanByGoal.css';
import { getShortRecipesMealData, getDetailedRecipesData } from '../../framework/customHooks';
import { GoalContext } from '../../context';

export default function GetMealPlanByGoal() {
  const {
    currentGoal,
    userWeight,
    userHeight,
    userAge,
    userActivity,
    dailyMealPlan,
    shortRecipesData,
    isShortRecipesInfoLoaded,
    setCurrentGoal,
    setUserWeight,
    setUserHeight,
    setUserAge,
    setUserActivity,
    setIsSubmitClicked,
    setError,
    setIsDataLoading,
  } = getShortRecipesMealData();
  const { detailedRecipes } = getDetailedRecipesData({
    isShortRecipesInfoLoaded,
    shortRecipesData,
    setError,
    setIsDataLoading,
  });
  const [isModalRecipeOpened, setIsModalRecipeOpened] = useState(false);
  const [modalRecipeData, setModalRecipeData] = useState([]);

  return (
    <div className={getMealPlanByGoal}>
      <GoalContext.Provider value={currentGoal}>
        <SetGoal
          userWeight={userWeight}
          userHeight={userHeight}
          userAge={userAge}
          userActivity={userActivity}
          setCurrentGoal={setCurrentGoal}
          setUserWeight={setUserWeight}
          setUserHeight={setUserHeight}
          setUserAge={setUserAge}
          setUserActivity={setUserActivity}
          setIsSubmitClicked={setIsSubmitClicked}
        />
      </GoalContext.Provider>
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
