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
            setErr('Ohh.. error has happened during short recipes loading');
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
  };
}

export function getShortRecipesSearchData() {
  const [searchedRecipe, setSearchedRecipe] = useState('');
  const [error, setError] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isShortRecipesInfoLoaded, setIsShortRecipesInfoLoaded] = useState(false);
  const [shortRecipesData, setShortRecipesData] = useState([]);
  const [testa, setTesta] = useState(0);
  useEffect(() => {
    // window.dataStore.error = null;
    if (searchedRecipe) {
      console.log('yess');
      // setError(null);
      // setIsDataLoading(true);
      let promise = validateAndLoadData();
      promise.then(({ data: { results } }) => {
        setIsShortRecipesInfoLoaded(true);
        setShortRecipesData({ results });
      });
    }
    
    // window.dataStore.isDataLoading = true;
    // renderApp();
    // validateAndLoadData()
    //   .then(({ error, data }) => {
    //     // window.dataStore.isDataLoading = false;
    //     setIsDataLoading(false);
    //     if (error) {
    //       // window.dataStore.error = error;
    //       setError(error);
    //     } else if (data) {
    //       if (!data.results.length) {
    //         throw new Error('wrong input');
    //       }
    //       // window.dataStore.recipesInCache[recipeName] = data;
    //       // loadDetailedRecipesInfo(data, 'detailedSearchedRecipes');
    //       setShortRecipesData(data);
    //       console.log(shortRecipesData);
    //     } else {
    //       // loadDetailedRecipesInfo(
    //       //   window.dataStore.recipesInCache[recipeName],
    //       //   'detailedSearchedRecipes',
    //       // );
    //       console.log('here is space for cache');
    //     }
    //   })
    //   .catch(err => {
    //     // window.dataStore.error = `Ooops.. ${err}`;
    //     setError(`Oops, error ... ${err}`);
    //   })
    //   .finally(() => console.log('shortRecipesLoaded'));
    function validateAndLoadData() {
      const url = getSearchRecipeUrl(searchedRecipe);

      // if (!isCurrentRecipeInCache()) {
      return fetch(url, getRapidAPIFetchOptionsData())
        .then(response => {
          if (response.ok) return response.json();
          throw new Error(`Error` + response.status + response.json);
        })
        .then(data => {
          setShortRecipesData({ data });
          console.log(shortRecipesData);
          console.log('data');
          return { data };
        });
      // }
      return Promise.resolve({});
    }
    // console.log('aaa');
    // console.log(shortRecipesData);
    // console.log('aaa');
  }, [searchedRecipe]);
  return {
    searchedRecipe,
    setSearchedRecipe,
    shortRecipesData,
    isShortRecipesInfoLoaded,
  };
}

export function getDetailedRecipesData({ isShortRecipesInfoLoaded, shortRecipesData, setError }) {
  const [detailedRecipes, setDetailedRecipes] = useState([]);

  useEffect(() => {
    if (isShortRecipesInfoLoaded) {
      console.log('works');
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
