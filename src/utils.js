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

export function isCurrentRecipeInCache(searchedRecipe, shortRecipesDataCache) {
  return Boolean(shortRecipesDataCache[searchedRecipe]);
}

export const isFunction = func => typeof func === 'function';
