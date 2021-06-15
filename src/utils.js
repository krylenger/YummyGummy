export function getNutrientAmount(nutrientName, arrayOfAllNutrients) {
  let searchedNutrient = arrayOfAllNutrients.find(nutrient => nutrient.name === nutrientName);
  return searchedNutrient.amount;
}

export function calculateMaxCalories(currentGoal, userWeight, userHeight, userAge, userActivity) {
  const loseGoal = 'lose';
  const gainGoal = 'gain';
  let caloriesAmount;
  let goalCoefficient;
  let weightCoefficient;
  let heightCoefficient;
  let ageCoefficient;
  let activityCoefficient;

  userWeight = parseInt(userWeight);
  userHeight = parseInt(userHeight);
  userAge = parseInt(userAge);
  userActivity = parseInt(userActivity);

  switch (userActivity) {
    case 1:
      activityCoefficient = 1.2;
      break;
    case 2:
      activityCoefficient = 1.375;
      break;
    case 3:
      activityCoefficient = 1.55;
      break;
    case 4:
      activityCoefficient = 1.725;
      break;
    case 5:
      activityCoefficient = 1.9;
      break;
  }

  if (currentGoal === loseGoal) {
    goalCoefficient = 247;
    weightCoefficient = 9.2;
    heightCoefficient = 3.1;
    ageCoefficient = 4.3;
  } else if (currentGoal === gainGoal) {
    goalCoefficient = 88;
    weightCoefficient = 13.4;
    heightCoefficient = 4.8;
    ageCoefficient = 5.7;
  }

  caloriesAmount =
    (goalCoefficient +
      weightCoefficient * userWeight +
      heightCoefficient * userHeight -
      ageCoefficient * userAge) *
    activityCoefficient;

  return caloriesAmount;
}

export function displayUserActivityLevelAsString(userActivity) {
  let activityLevelAsString;

  switch (userActivity) {
    case '1':
      activityLevelAsString = 'very low';
      break;
    case '2':
      activityLevelAsString = 'low';
      break;
    case '3':
      activityLevelAsString = 'average';
      break;
    case '4':
      activityLevelAsString = 'high';
      break;
    case '5':
      activityLevelAsString = 'very high';
      break;
  }

  return activityLevelAsString;
}

export function isCurrentRecipeInCache(searchedRecipe, shortRecipesDataCache) {
  return Boolean(shortRecipesDataCache[searchedRecipe]);
}

export const isFunction = func => typeof func === 'function';
