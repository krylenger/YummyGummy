// Start from here
import {
  getSearchRecipeUrl,
  getUrlOfDetailedRecipe,
  getNutrientAmount,
  calculateMaxCalories,
  getRapidAPIFetchOptionsData,
} from './utils';
import styles from './style';

const appRoot = document.getElementById('app-root');

window.renderApp = renderApp;
window.FillFridgeOnChangeCB = FillFridgeOnChangeCB;
window.magicButtonCB = magicButtonCB;
window.performSearchRecipes = performSearchRecipes;
window.validateAndLoadData = validateAndLoadData;
window.getDailyMealPlan = getDailyMealPlan;
window.openModalRecipe = openModalRecipe;
window.removeFridgeItem = removeFridgeItem;

window.dataStore = {
  currentGoal: '',
  usersWeight: '',
  magicFridgeItems: [],
  searchedRecipe: '',
  recipesInCache: [],
  detailedMealPlanRecipes: [],
  detailedMagicFridgeRecipes: [],
  detailedSearchedRecipes: [],
  isMagicFridge: false,
  isDataLoading: false,
  error: null,
  dailyMealPlan: '',
  isModalRecipeOpened: false,
  modalRecipeData: '',
};

if (module.hot) {
  module.hot.accept();
}

function renderApp() {
  appRoot.innerHTML = App();
}

function GetMealPlanByGoal() {
  return `<div class="${styles.getMealPlanByGoal}">
    ${SetGoal()}
    ${RenderDailyMealPlan()}
  </div>`;
}

function FillFridge() {
  return `<div class="${styles.getRecipeByIngredientsHeader}">
    ${AddFridgeIngredients()}
    ${RenderFridgeIngredients()}
  </div>`;
}

function GetRecipeByIngredients() {
  return `<div class="${styles.getRecipeByIngredientsContainer}">
    ${FillFridge()}
    ${RenderFridgeRecipes()}
  </div>`;
}

function SearchForRecipesByName() {
  return `<div class="${styles.searchForRecipeByNameContainer}">
    ${SearchRecipes()}
    ${RenderRecipes()}
  </div>`;
}

function setCurrentGoal(value) {
  window.dataStore.currentGoal = value;
  window.renderApp();
}

function GoalSwitch(currentGoal, setCurrentGoal) {
  return `
    ${[
      { id: 'goalGain', goal: 'gain' },
      { id: 'goalLose', goal: 'lose' },
    ]
      .map(
        ({ goal, id }) => `
      <input 
        id="${id}" 
        type="radio" 
        value="${goal}"
        ${currentGoal === goal ? 'checked' : ''}
        onchange="(${setCurrentGoal})(this.value);"
       />
      <label for="${id}">${goal}</label>  
    `,
      )
      .join('')}`;
}

function SetGoal() {
  const { currentGoal, usersWeight } = window.dataStore;
  return `<div class="${styles.getMealPlanByGoalHeader}">
    <h2 class="${styles.getMealPlanByGoalHeader_h2}">Do you want to lose or to gain weight?</h2>
    ${GoalSwitch(currentGoal, setCurrentGoal)}
    <p class="${
      styles.getMealPlanByGoalHeader_p
    }">In case you want to lose weight, we're going to create a meal plan with a decreased amount of carbs.</p>
    <p class="${
      styles.getMealPlanByGoalHeader_p
    }">If your goal is to gain muscles - we're going to include more high protein dishes.
    <h4>What's your weight?</h4>
    <input type="number" value="${usersWeight}" placeholder="your weight" onchange="window.dataStore.usersWeight = this.value; window.renderApp();">
    <button onclick="window.getDailyMealPlan()">Submit</button>
  </div>`;
}

function getDailyMealPlan() {
  let promise = loadDailyMealPlan();
  promise.then(({ meals, nutrients }) => {
    loadDetailedRecipesInfo({ results: meals }, 'detailedMealPlanRecipes');
  });
}

function loadDailyMealPlan() {
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
    .finally(window.renderApp);
}

function RenderDailyMealPlan() {
  const { dailyMealPlan, detailedMealPlanRecipes } = window.dataStore;
  let content = '';
  let contentDescription = '';
  if (dailyMealPlan) {
    const {
      meals,
      nutrients: { calories, protein, fat, carbohydrates },
    } = dailyMealPlan;
    contentDescription = `<h3>Meal Description</h3><div>
    <p>Here is your daily meal plan: breakfast, lunch and dinner.</p>
    <p>Enjoy it!</p>
    <p>Calories: ${calories}</p>
    <p>Protein: ${protein}</p>
    <p>Fat: ${fat}</p>
    <p>Carbohydrates: ${carbohydrates}</p></div>`;
  }

  if (detailedMealPlanRecipes.length) {
    const recipeCards = window.dataStore.detailedMealPlanRecipes.map(detailedRecipeCardData => {
      const preparedRecipeCardData = getPreparedRecipeCardData(detailedRecipeCardData);
      return RecipeCard(preparedRecipeCardData);
    });
    content = recipeCards.join('');
  }

  return `<div class="${styles.recipesContainer}"><div class="${styles.mealDescription}">${contentDescription}</div><div class="${styles.recipeCardsContainer}">${content}</div></div>`;
}

function FillFridgeOnChangeCB(value) {
  const { magicFridgeItems } = window.dataStore;

  if (magicFridgeItems.length < 5) {
    magicFridgeItems.push(value);
    value = '';
    window.renderApp();
  } else {
    alert('5 ingredients are maximum');
  }
}

function AddFridgeIngredients() {
  return `<div>
      <h2>What's in your fridge?</h2>
      <p class="${styles.getRecipeByIngredientsHeader_p}">Enter up to 5 products you have in the fridge to cook the best meal. Example: apple, milk, sugar. </p>
      <input 
        type="text" 
        placeholder="what is in your fridge?" 
        onchange="window.FillFridgeOnChangeCB(this.value)"
      >
      <button type="submit">+add</button>
      
  </div>`;
}

function loadMagicFridgeRecipes() {
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
    .then(data => data)
    .catch(err => {
      window.dataStore.err = err;
    })
    .finally(window.renderApp);
}

function magicButtonCB() {
  window.dataStore.isMagicFridge = true;
  let promise = loadMagicFridgeRecipes();
  promise.then(data => loadDetailedRecipesInfo({ results: data }, 'detailedMagicFridgeRecipes'));
  window.renderApp();
}

function removeFridgeItem(id) {
  window.dataStore.magicFridgeItems = window.dataStore.magicFridgeItems.filter(item => item !== id);
  window.renderApp();
}

function FridgeItem(fridgeItemData) {
  return `<div class="${styles.fridgeItemContainer}">
  <button class="${styles.fridgeItemContainer_button}" id="${fridgeItemData}" onclick="window.removeFridgeItem(this.id);">x</button>
  <label class="${styles.fridgeItemContainer_label}" for="${fridgeItemData}">${fridgeItemData}</label>
  </div>`;
}

function RenderFridgeIngredients() {
  let content = '';
  let confirmButton = '';
  if (window.dataStore.magicFridgeItems.length > 0) {
    confirmButton = `<button class="${styles.fridgeIngredientsListContainer_magicButton}" onclick="window.magicButtonCB()" >Magic</button>`;
  }
  content = `${window.dataStore.magicFridgeItems
    .map(fridgeItemData => FridgeItem(fridgeItemData))
    .join('')}`;
  return `<div class="${styles.fridgeIngredientsListContainer}"><div class="${styles.fridgeIngredientsListContainer_inner}">${content}</div>${confirmButton}</div>`;
}

function RenderFridgeRecipes() {
  const { isMagicFridge, detailedMagicFridgeRecipes } = window.dataStore;
  let content = '';
  let contentDescription = '';
  if (isMagicFridge) {
    contentDescription = `<h3>Here we go!</h3><p>We have tried to select the best fitting recipes based on your fridge ingredients. Some ingredients may be missing so your imagination can help you how to change them and cook the best meal ever!</p>`;
  }
  if (detailedMagicFridgeRecipes.length) {
    const recipeCards = window.dataStore.detailedMagicFridgeRecipes.map(detailedRecipeCardData => {
      const preparedRecipeCardData = getPreparedRecipeCardData(detailedRecipeCardData);
      return RecipeCard(preparedRecipeCardData);
    });
    content = recipeCards.join('');
  }
  return `<div><div class="${styles.mealDescription}">${contentDescription}</div><div class="${styles.recipeCardsContainer}">${content}</div></div>`;
}

function isCurrentRecipeInCache() {
  const { recipesInCache, searchedRecipe } = window.dataStore;
  return Boolean(recipesInCache[searchedRecipe]);
}

function loadDetailedRecipesInfo({ results }, whereToLoad) {
  const urlsOfDetailedRecipes = results.map(result => getUrlOfDetailedRecipe(result.id));
  let requests = urlsOfDetailedRecipes.map(url => fetch(url, getRapidAPIFetchOptionsData()));
  return Promise.all(requests)
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(data => {
      window.dataStore[whereToLoad] = data;
    })
    .catch(error => {
      window.dataStore.error = 'Error inside loadDetailedRecipesInfo';
    })
    .finally(window.renderApp);
}

function validateAndLoadData() {
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

function performSearchRecipes(recipeName) {
  window.dataStore.searchedRecipe = recipeName;
  window.dataStore.error = null;
  window.dataStore.isDataLoading = true;

  window
    .validateAndLoadData()
    .then(({ error, data }) => {
      window.dataStore.isDataLoading = false;
      if (error) {
        window.dataStore.error = error;
      } else if (data) {
        window.dataStore.recipesInCache[recipeName] = data;
        loadDetailedRecipesInfo(data, 'detailedSearchedRecipes');
      }
    })
    .catch(err => {
      window.dataStore.error = `Some error occurred ${err}`;
    })
    .finally(window.renderApp);
}

function SearchRecipes() {
  const { searchedRecipe } = window.dataStore;
  return `<div class="${styles.searchForRecipeByNameContainer_header}">
    <h2>Search by recipe name</h2>
    <input 
      type="text" 
      value="${searchedRecipe}" 
      placeholder="enter recipe (ex: rice)" 
      onchange="performSearchRecipes(this.value)"
    />
  </div>`;
}

function RenderRecipes() {
  const {
    searchedRecipe,
    isDataLoading,
    error,
    detailedSearchedRecipes,
    recipesInCache,
  } = window.dataStore;
  let content = '';

  //initial state
  if (searchedRecipe === '') {
    content = 'Please enter recipe name.';
  } else {
    //loading state
    if (isDataLoading) {
      content = 'Loading...';
    }
    //error state
    if (error) {
      content = error;
    }
    //results state
    if (isCurrentRecipeInCache()) {
      const recipeCards = window.dataStore.detailedSearchedRecipes.map(detailedRecipeCardData => {
        const preparedRecipeCardData = getPreparedRecipeCardData(detailedRecipeCardData);
        return RecipeCard(preparedRecipeCardData);
      });
      content = recipeCards.join('');
    }
  }
  return `<div class="${styles.recipeCardsContainer}">${content}</div>`;
}

function getPreparedRecipeCardData({
  id,
  title,
  image,
  instructions,
  readyInMinutes,
  nutrition: { nutrients },
}) {
  const caloriesAmount = getNutrientAmount('Calories', nutrients);
  const fatAmount = getNutrientAmount('Fat', nutrients);
  const carbohydratesAmount = getNutrientAmount('Carbohydrates', nutrients);
  const proteinAmount = getNutrientAmount('Protein', nutrients);

  return {
    id,
    title,
    image,
    instructions,
    readyInMinutes,
    nutrients,
    caloriesAmount,
    fatAmount,
    carbohydratesAmount,
    proteinAmount,
  };
}

function getModalRecipeData(targetId) {
  const {
    detailedMealPlanRecipes,
    detailedSearchedRecipes,
    detailedMagicFridgeRecipes,
  } = window.dataStore;
  let modalRecipeData = '';
  if (detailedMealPlanRecipes.find(({ id }) => id == targetId)) {
    return detailedMealPlanRecipes.find(({ id }) => id == targetId);
  } else if (detailedSearchedRecipes.find(({ id }) => id == targetId)) {
    return detailedSearchedRecipes.find(({ id }) => id == targetId);
  } else if (detailedMagicFridgeRecipes.find(({ id }) => id == targetId)) {
    return detailedMagicFridgeRecipes.find(({ id }) => id == targetId);
  }
  return modalRecipeData;
}

function openModalRecipe(targetId) {
  const modalRecipeData = getModalRecipeData(targetId);
  window.dataStore.modalRecipeData = modalRecipeData;
  // window.dataStore.modalRecipeId += `<button onclick="window.dataStore.isModalRecipeOpened = false; window.renderApp();">Close Modal</button>`;
  window.dataStore.isModalRecipeOpened = true;
  window.renderApp();
}

function RecipeCard({
  id,
  title,
  image,
  instructions,
  readyInMinutes,
  nutrients,
  caloriesAmount,
  fatAmount,
  carbohydratesAmount,
  proteinAmount,
}) {
  return `<div class="${styles.recipeCard}" id="${id}" onclick="window.openModalRecipe(this.id);"><h4>${title}</h4>
  <image class="${styles.recipeCard_image}"src="${image}" alt="${title}"/>
  <div class="${styles.recipeCard_nutrientInfoLine}"><p>Calories:</p> <p>${caloriesAmount}</p></div>
  <div class="${styles.recipeCard_nutrientInfoLine}"><p>Protein:</p> <p>${proteinAmount}</p></div>
  <div class="${styles.recipeCard_nutrientInfoLine}"><p>Fat:</p> <p>${fatAmount}</p></div>
  <div class="${styles.recipeCard_nutrientInfoLine}"><p>Carbohydrates:</p> <p>${carbohydratesAmount}</p></div>
  </div>`;
}

function getPreparedModalRecipeData({
  id,
  image,
  instructions,
  nutrition: { nutrients },
  readyInMinutes,
  title,
}) {
  const caloriesAmount = getNutrientAmount('Calories', nutrients);
  const fatAmount = getNutrientAmount('Fat', nutrients);
  const carbohydratesAmount = getNutrientAmount('Carbohydrates', nutrients);
  const proteinAmount = getNutrientAmount('Protein', nutrients);
  return {
    id,
    image,
    instructions,
    readyInMinutes,
    title,
    caloriesAmount,
    fatAmount,
    carbohydratesAmount,
    proteinAmount,
  };
}

function CreateModalRecipeWindow({
  id,
  image,
  instructions,
  readyInMinutes,
  title,
  caloriesAmount,
  fatAmount,
  carbohydratesAmount,
  proteinAmount,
}) {
  return `<div class="${styles.modalRecipeContainer}">
  <div class="${styles.modalRecipeContainerInner}">
  <h1>${title}</h1>
  <div class="${styles.modalRecipeContainer_image}"><img  src="${image}" alt="${title}"></div>
  <div class="${styles.modalRecipeContainer_nutrientsContainer}">
  <div class="${styles.recipeCard_nutrientInfoLine}"><p>Calories:</p> <p>${caloriesAmount}</p></div>
  <div class="${styles.recipeCard_nutrientInfoLine}"><p>Protein:</p> <p>${proteinAmount}</p></div>
  <div class="${styles.recipeCard_nutrientInfoLine}"><p>Fat:</p> <p>${fatAmount}</p></div>
  <div class="${styles.recipeCard_nutrientInfoLine}"><p>Carbohydrates:</p> <p>${carbohydratesAmount}</p></div>
  </div>
  <p class="${styles.modalRecipeContainer_instructions}">${instructions}</p>
  <p>Ready in: ${readyInMinutes} minutes.</p>
  <button onclick="window.dataStore.isModalRecipeOpened = false; window.renderApp();">Close Modal</button></div></div>`;
}

function RenderModalRecipe() {
  const preparedModalRecipeData = getPreparedModalRecipeData(window.dataStore.modalRecipeData);
  const content = CreateModalRecipeWindow(preparedModalRecipeData);
  return content;
}

function App() {
  return `<div class="${styles.appContainer}" >
    <header class="${styles.header}"><h1>YummySpoon</h1></header>
    ${GetMealPlanByGoal()}
    ${GetRecipeByIngredients()}
    ${SearchForRecipesByName()}
    ${window.dataStore.isModalRecipeOpened ? RenderModalRecipe() : ``}
  </div>`;
}

renderApp();
