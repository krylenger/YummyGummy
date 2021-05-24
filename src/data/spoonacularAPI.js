import { calculateMaxCalories, isCurrentRecipeInCache } from '../utils';
import renderApp from '../framework/render';

export function getSearchRecipeUrl(searchedWord) {
  return `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${searchedWord}&number=5`;
}

export function getUrlOfDetailedRecipe(id) {
  return `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information?includeNutrition=true`;
}

export function getRapidAPIFetchOptionsData() {
  return {
    method: 'GET',
    headers: {
      'x-rapidapi-key': `${process.env.rapidApiKey}`,
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    },
  };
}

export function getDailyMealPlan() {
  let promise = loadDailyMealPlan();
  promise.then(({ meals, nutrients }) => {
    loadDetailedRecipesInfo({ results: meals }, 'detailedMealPlanRecipes');
  });
}

export function loadDailyMealPlan() {
  const { currentGoal, usersWeight } = window.dataStore;
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
      window.dataStore.dailyMealPlan = data;
      return data;
    })
    .catch(err => {
      window.dataStore.err = err;
    })
    .finally(renderApp);
}

export function loadMagicFridgeRecipes() {
  const ingredientsArray = window.dataStore.magicFridgeItems;
  let ingredientsQueryString = ingredientsArray.reduce(
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
        window.dataStore.errorInTheFridge = true;
        return data;
      } else {
        window.dataStore.errorInTheFridge = false;
        window.dataStore.isMagicFridge = true;
        return data;
      }
    })
    .catch(err => {
      window.dataStore.err = err;
    })
    .finally(renderApp);
}

export function loadDetailedRecipesInfo({ results }, whereToLoad) {
  const urlsOfDetailedRecipes = results.map(result => getUrlOfDetailedRecipe(result.id));
  let requests = urlsOfDetailedRecipes.map(url => fetch(url, getRapidAPIFetchOptionsData()));
  return Promise.all(requests)
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(data => {
      if (!data.length) {
        throw new Error('Please enter valid ingredient.');
      }
      window.dataStore[whereToLoad] = data;
    })
    .catch(error => {
      window.dataStore.error = 'Error inside loadDetailedRecipesInfo';
    })
    .finally(renderApp);
}

export function validateAndLoadData() {
  const { searchedRecipe } = window.dataStore;
  const url = getSearchRecipeUrl(searchedRecipe);

  if (!isCurrentRecipeInCache()) {
    return fetch(url, getRapidAPIFetchOptionsData())
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(`Error` + response.status + response.json);
      })
      .then(data => ({ data }));
  }
  return Promise.resolve({});
}

export function performSearchRecipes(recipeName) {
  window.dataStore.searchedRecipe = recipeName;
  window.dataStore.error = null;
  window.dataStore.isDataLoading = true;
  renderApp();
  validateAndLoadData()
    .then(({ error, data }) => {
      // console.log('works');
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
    .finally(renderApp);
}
