export function getSearchRecipeUrl(searchedWord) {
  return `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${searchedWord}&number=5`;
}

export function getUrlOfDetailedRecipe(id) {
  return `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information?includeNutrition=true`;
}

export function getNutrientAmount(nutrientName, arrayOfAllNutrients) {
  let searchedNutrient = arrayOfAllNutrients.find(nutrient => nutrient.name === nutrientName);
  return searchedNutrient.amount;
}

export function calculateMaxCalories(currentGoal, usersWeight) {
  usersWeight = parseInt(usersWeight);
  let caloriesAmount;

  if (currentGoal === 'lose') {
    if (usersWeight <= 50) {
      caloriesAmount = usersWeight * 10 + 1200 - 200;
    } else if (usersWeight > 50 && usersWeight <= 80) {
      caloriesAmount = usersWeight * 10 + 1400 - 200;
    } else if (usersWeight > 80 && usersWeight <= 110) {
      caloriesAmount = usersWeight * 10 + 1600 - 200;
    } else {
      caloriesAmount = usersWeight * 10 + 1800 - 200;
    }
  } else {
    if (usersWeight <= 50) {
      caloriesAmount = usersWeight * 10 + 1200;
    } else if (usersWeight > 50 && usersWeight <= 80) {
      caloriesAmount = usersWeight * 10 + 1400;
    } else if (usersWeight > 80 && usersWeight <= 110) {
      caloriesAmount = usersWeight * 10 + 1600;
    } else {
      caloriesAmount = usersWeight * 10 + 1800;
    }
  }
  return caloriesAmount;
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
