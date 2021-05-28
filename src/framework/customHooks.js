import { useEffect, useState } from '../framework';
import { calculateMaxCalories, isCurrentRecipeInCache } from '../utils';
import {
  getRapidAPIFetchOptionsData,
  getUrlOfDetailedRecipe,
  getSearchRecipeUrl,
} from '../data/spoonacularAPI';

export function getShortRecipesData() {
  const [currentGoal, setCurrentGoal] = useState('gain');
  const [usersWeight, setUsersWeight] = useState('22');
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isShortRecipesInfoLoaded, setIsShortRecipesInfoLoaded] = useState(false);
  const [shortRecipesData, setShortRecipesData] = useState([]);
  const [dailyMealPlan, setDailyMealPlan] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isSubmitClicked) {
      let promise = loadDailyMealPlan();
      promise.then(({ meals, nutrients }) => {
        setIsShortRecipesInfoLoaded(true);
        setShortRecipesData({ results: meals });
      });
      function loadDailyMealPlan() {
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
          .finally(() => console.log('loadedShortRecipes'));
      }
    }
  }, [isSubmitClicked, currentGoal, usersWeight]);

  return {
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
  };
}

export function getShortRecipesFridgeData() {
  const [isMagicButtonClicked, setIsMagicButtonClicked] = useState(false);
  const [magicFridgeItems, setMagicFridgeItems] = useState([]);
  const [errorInTheFridge, setErrorInTheFridge] = useState(false);
  const [isMagicFridge, setIsMagicFridge] = useState(false);
  const [err, setErr] = useState('');
  const [isShortRecipesInfoLoaded, setIsShortRecipesInfoLoaded] = useState(false);
  const [shortRecipesData, setShortRecipesData] = useState([]);

  useEffect(() => {
    if (isMagicButtonClicked) {
      let promise = loadMagicFridgeRecipes();
      promise.then(data => {
        setIsShortRecipesInfoLoaded(true);
        setShortRecipesData({ results: data });
      });

      function loadMagicFridgeRecipes() {
        let ingredientsQueryString = magicFridgeItems.reduce(
          (final, current) => final.concat(current + '%2C'),
          '',
        );
        return fetch(
          `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${ingredientsQueryString}&number=4&ignorePantry=false&ranking=1`,
          getRapidAPIFetchOptionsData(),
        )
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
            setErr('Ohh.. error has happened during short recipes loading')
          })
          .finally(() => console.log('shortRecipesDataLoaded'));
      }
    }
  }, [isMagicButtonClicked, magicFridgeItems]);

  return {
    isMagicButtonClicked,
    magicFridgeItems,
    isMagicFridge,
    errorInTheFridge,
    err,
    shortRecipesData,
    isShortRecipesInfoLoaded,
    setMagicFridgeItems,
    setIsMagicButtonClicked,
  }
}

export function getShortRecipesSearchData() {
  const [searchedRecipe, setSearchedRecipe] = useState('');
  useEffect(() => {
    performSearchRecipes();
    function validateAndLoadData() {
      const url = getSearchRecipeUrl(searchedRecipe);

      // if (!isCurrentRecipeInCache()) {
        return fetch(url, getRapidAPIFetchOptionsData())
          .then(response => {
            if (response.ok) return response.json();
            throw new Error(`Error` + response.status + response.json);
          })
          .then(data => ({ data }));
      // }
      // return Promise.resolve({});
    }

    function performSearchRecipes(recipeName) {
      // window.dataStore.error = null;
      window.dataStore.isDataLoading = true;
      // renderApp();
      validateAndLoadData()
        .then(({ error, data }) => {
          window.dataStore.isDataLoading = false;
          if (error) {
            window.dataStore.error = error;
          } else if (data) {
            if (!data.results.length) {
              throw new Error('wrong input');
            }
            window.dataStore.recipesInCache[recipeName] = data;
            loadDetailedRecipesInfo(data, 'detailedSearchedRecipes');
          } else {
            loadDetailedRecipesInfo(
              window.dataStore.recipesInCache[recipeName],
              'detailedSearchedRecipes',
            );
          }
        })
        .catch(err => {
          window.dataStore.error = `Ooops.. ${err}`;
        })
        .finally(() => console.log('shortRecipesLoaded'));
    }
  }, []);
  return {
    searchedRecipe,
    setSearchedRecipe,
  }
}

export function getDetailedRecipesData({ isShortRecipesInfoLoaded, shortRecipesData, setError }) {
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
              throw new Error('Please enter valid ingredient.');
            }
            setDetailedRecipes(data);
          })
          .catch(error => {
            setError('Error inside loadDetailedRecipesInfo');
          })
          .finally(() => console.log('loadedDetailedRecipes'));
      }
    }
  }, [isShortRecipesInfoLoaded, shortRecipesData]);
  return {
    detailedRecipes,
  };
}
