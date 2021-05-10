export function getSearchRecipeUrl(searchedWord) {
  return `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${searchedWord}&number=2`;
}

export function getUrlOfDetailedRecipe(id) {
  return `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information?includeNutrition=true`;
}
