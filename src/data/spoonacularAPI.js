export function getMealPlanRecipeUrl(maxCalories) {
  return `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=day&targetCalories=${maxCalories}`;
}

export function getFridgeRecipeUrl(ingredientsQueryString) {
  return `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${ingredientsQueryString}&number=4&ignorePantry=false&ranking=1`;
}

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
