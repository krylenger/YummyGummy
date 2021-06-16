import { useEffect, useState } from 'react';
import { calculateMaxCalories, isCurrentRecipeInCache } from '../utils';
import {
  getRapidAPIFetchOptionsData,
  getUrlOfDetailedRecipe,
  getMealPlanRecipeUrl,
  getFridgeRecipeUrl,
  getSearchRecipeUrl,
} from '../data/spoonacularAPI';

export function getShortRecipesMealData() {
  const [currentGoal, setCurrentGoal] = useState('gain');
  const [userWeight, setUserWeight] = useState('');
  const [userHeight, setUserHeight] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userActivity, setUserActivity] = useState('3');
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isShortRecipesInfoLoaded, setIsShortRecipesInfoLoaded] = useState(false);
  const [shortRecipesData, setShortRecipesData] = useState([]);
  const [dailyMealPlan, setDailyMealPlan] = useState('');
  const [error, setError] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    if (isSubmitClicked) {
      const promise = loadDailyMealPlan();
      promise.then(({ meals }) => {
        setShortRecipesData({ results: meals });
        setIsShortRecipesInfoLoaded(true);
      });
      function loadDailyMealPlan() {
        const maxCalories = calculateMaxCalories(
          currentGoal,
          userWeight,
          userHeight,
          userAge,
          userActivity,
        );
        return fetch(getMealPlanRecipeUrl(maxCalories), getRapidAPIFetchOptionsData())
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
          .finally(() => setIsSubmitClicked(false));
      }
    }
  }, [isSubmitClicked]);

  return {
    currentGoal,
    userWeight,
    userHeight,
    userAge,
    userActivity,
    isSubmitClicked,
    isShortRecipesInfoLoaded,
    shortRecipesData,
    dailyMealPlan,
    error,
    setCurrentGoal,
    setUserWeight,
    setUserHeight,
    setUserAge,
    setUserActivity,
    setIsSubmitClicked,
    setError,
    setIsDataLoading,
  };
}

export function getShortRecipesFridgeData() {
  const [isMagicButtonClicked, setIsMagicButtonClicked] = useState(false);
  const [magicFridgeItems, setMagicFridgeItems] = useState([]);
  const [errorInTheFridge, setErrorInTheFridge] = useState(false);
  const [isMagicFridge, setIsMagicFridge] = useState(false);
  const [isShortRecipesInfoLoaded, setIsShortRecipesInfoLoaded] = useState(false);
  const [shortRecipesData, setShortRecipesData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    if (isMagicButtonClicked) {
      let promise = loadMagicFridgeRecipes();
      promise.then(data => {
        setShortRecipesData({ results: data });
        setIsShortRecipesInfoLoaded(true);
      });
      function loadMagicFridgeRecipes() {
        let ingredientsQueryString = magicFridgeItems.reduce(
          (final, current) => final.concat(current + '%2C'),
          '',
        );
        return fetch(getFridgeRecipeUrl(ingredientsQueryString), getRapidAPIFetchOptionsData())
          .then(response => {
            if (response.ok) return response.json();
            throw new Error(`Error` + response.status + response.json);
          })
          .then(data => {
            if (!data.length) {
              setErrorInTheFridge(true);
              return data;
            } else {
              setErrorInTheFridge(false);
              setIsMagicFridge(true);
              return data;
            }
          })
          .catch(err => {
            setErrorInTheFridge('Ohh.. error has happened during short recipes loading');
          })
          .finally(() => setIsMagicButtonClicked(false));
      }
    }
  }, [isMagicButtonClicked]);
  return {
    isMagicButtonClicked,
    magicFridgeItems,
    isMagicFridge,
    errorInTheFridge,
    shortRecipesData,
    isShortRecipesInfoLoaded,
    setMagicFridgeItems,
    setIsMagicButtonClicked,
    setError: setErrorInTheFridge,
    setIsDataLoading,
  };
}

export function getShortRecipesSearchData() {
  const [searchedRecipe, setSearchedRecipe] = useState('');
  const [error, setError] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isShortRecipesInfoLoaded, setIsShortRecipesInfoLoaded] = useState(false);
  const [shortRecipesData, setShortRecipesData] = useState([]);
  const [shortRecipesDataCache, setShortRecipesDataCache] = useState([]);
  useEffect(() => {
    if (searchedRecipe) {
      setError(null);
      setIsDataLoading(true);
      let promise = validateAndLoadData();
      promise.then(({ data: { results } }) => {
        setShortRecipesData({ results });
        setIsShortRecipesInfoLoaded(true);
      });
    }

    function validateAndLoadData() {
      const url = getSearchRecipeUrl(searchedRecipe);

      if (!isCurrentRecipeInCache(searchedRecipe, shortRecipesDataCache)) {
        return fetch(url, getRapidAPIFetchOptionsData())
          .then(response => {
            if (response.ok) return response.json();
            throw new Error(`Error` + response.status + response.json);
          })
          .then(data => {
            if (!data.results.length) {
              setError('Please enter valid recipe name.');
            }
            setShortRecipesData(data);
            setShortRecipesDataCache(prevState => ({
              ...prevState,
              [searchedRecipe]: data,
            }));
            return { data };
          });
      }
      return Promise.resolve({ data: shortRecipesDataCache[searchedRecipe] });
    }
  }, [searchedRecipe]);
  return {
    searchedRecipe,
    setSearchedRecipe,
    shortRecipesData,
    isShortRecipesInfoLoaded,
    isDataLoading,
    setIsDataLoading,
    setError,
    error,
    shortRecipesDataCache,
  };
}

export function getDetailedRecipesData({
  isShortRecipesInfoLoaded,
  shortRecipesData,
  setIsDataLoading,
  setError,
}) {
  const [detailedRecipes, setDetailedRecipes] = useState([]);

  useEffect(() => {
    if (isShortRecipesInfoLoaded) {
      loadDetailedRecipesInfo(shortRecipesData);
      function loadDetailedRecipesInfo({ results }) {
        const urlsOfDetailedRecipes = results.map(result => getUrlOfDetailedRecipe(result.id));
        let requests = urlsOfDetailedRecipes.map(url => fetch(url, getRapidAPIFetchOptionsData()));
        return Promise.all(requests)
          .then(responses => Promise.all(responses.map(r => r.json())))
          .then(data => {
            if (!data.length) {
              throw new Error('Something went wrong...');
            }
            setIsDataLoading(false);
            setDetailedRecipes(data);
          })
          .catch(error => {
            setError(error + 'Error during loading DetailedRecipesInfo');
          });
      }
    }
  }, [isShortRecipesInfoLoaded, shortRecipesData]);
  return {
    detailedRecipes,
  };
}
