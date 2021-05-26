/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, useState, useEffect } from '../../framework';
import { getMealPlanByGoal } from './getMealPlanByGoal.css';
import SetGoal from '../SetGoal';
import DailyMealPlan from '../DailyMealPlan/DailyMealPlan';
import { calculateMaxCalories } from '../../utils';
import { getRapidAPIFetchOptionsData, getUrlOfDetailedRecipe } from '../../data/spoonacularAPI';

export default function GetMealPlanByGoal() {
  const [currentGoal, setCurrentGoal] = useState('gain');
  const [usersWeight, setUsersWeight] = useState('22');
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [dailyMealPlan, setDailyMealPlan] = useState('');
  const [error, setError] = useState('');
  const [detailedMealPlanRecipes, setDetailedMealPlanRecipes] = useState([]);
  useEffect(() => {
    if (isSubmitClicked) {
      let promise = loadDailyMealPlan();
      promise.then(({ meals, nutrients }) => {
        loadDetailedRecipesInfo({ results: meals });
      });

      function loadDailyMealPlan() {
        // const { currentGoal, usersWeight } = window.dataStore;
        const maxCalories = calculateMaxCalories(currentGoal, usersWeight);
        return fetch(
          `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=day&targetCalories=${maxCalories}`,
          getRapidAPIFetchOptionsData(),
        )
          .then(response => {
            if (response.ok) return response.json();
            throw new Error(`Error` + response.status + response.json);
          })
          .then(data => {
            setDailyMealPlan(data);
            return data;
          })
          .catch(err => {
            setError(err);
          })
          .finally(() => console.log('setIsLoading(false)'));
      }
      function loadDetailedRecipesInfo({ results }) {
        const urlsOfDetailedRecipes = results.map(result => getUrlOfDetailedRecipe(result.id));
        let requests = urlsOfDetailedRecipes.map(url => fetch(url, getRapidAPIFetchOptionsData()));
        return Promise.all(requests)
          .then(responses => Promise.all(responses.map(r => r.json())))
          .then(data => {
            if (!data.length) {
              throw new Error('Please enter valid ingredient.');
            }
            console.log('******');
            console.log(data);
            console.log('******');
            setDetailedMealPlanRecipes(data);
          })
          .catch(error => {
            setError('Error inside loadDetailedRecipesInfo');
          })
          .finally(() => console.log('detailedRecipeInfoLoaded'));
      }
    }
  }, [isSubmitClicked, currentGoal, usersWeight]);
  console.log('>>><<<');
  console.log(detailedMealPlanRecipes, dailyMealPlan);
  console.log('>>><<<');
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
        detailedMealPlanRecipes={detailedMealPlanRecipes}
      />
    </div>
  );
}
