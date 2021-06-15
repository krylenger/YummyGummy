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
    usersWeight,
    usersHeight,
    usersAge,
    usersActivity,
    dailyMealPlan,
    shortRecipesData,
    isShortRecipesInfoLoaded,
    setCurrentGoal,
    setUsersWeight,
    setUsersHeight,
    setUsersAge,
    setUsersActivity,
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
          usersWeight={usersWeight}
          usersHeight={usersHeight}
          usersAge={usersAge}
          usersActivity={usersActivity}
          setCurrentGoal={setCurrentGoal}
          setUsersWeight={setUsersWeight}
          setUsersHeight={setUsersHeight}
          setUsersAge={setUsersAge}
          setUsersActivity={setUsersActivity}
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
