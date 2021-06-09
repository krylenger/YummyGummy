import React, { useState } from 'react';
import SetGoal from '../SetGoal';
import DailyMealPlan from '../DailyMealPlan/DailyMealPlan';
import { ModalRecipe } from '../ModalRecipe';
import { getMealPlanByGoal } from './GetMealPlanByGoal.css';
import { getShortRecipesData, getDetailedRecipesData } from '../../framework/customHooks';
import { AppContext } from '../../context';

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
    setIsDataLoading,
  } = getShortRecipesData();
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
      <AppContext.Provider value={currentGoal}>
        <SetGoal
          // currentGoal={currentGoal}
          setCurrentGoal={setCurrentGoal}
          usersWeight={usersWeight}
          setUsersWeight={setUsersWeight}
          setIsSubmitClicked={setIsSubmitClicked}
        />
      </AppContext.Provider>
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
