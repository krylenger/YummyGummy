export function getSearchRecipeUrl(searchedWord) {
  return `https://api.spoonacular.com/recipes/complexSearch?query=${searchedWord}&number=3&apiKey=${process.env.YUMMY_SPOON_API_KEY}`;
}

export function getUrlOfDetailedRecipe(id) {
  return `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${process.env.YUMMY_SPOON_API_KEY}`;
}
