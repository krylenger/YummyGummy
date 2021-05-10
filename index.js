// Start from here
import { getSearchRecipeUrl, getUrlOfDetailedRecipe } from './utils';
import styles from './style';

const appRoot = document.getElementById('app-root');

window.renderApp = renderApp;
window.FillFridgeOnChangeCB = FillFridgeOnChangeCB;
window.confirmButtonCB = confirmButtonCB;
window.performSearchRecipes = performSearchRecipes;
window.validateAndLoadData = validateAndLoadData;
window.getDailyMealPlan = getDailyMealPlan;

window.dataStore = {
  recipesInCache: [],
  currentGoal: 'lose',
  magicFridgeItems: [],
  usersWeight: '22',
  searchedRecipe: '',
  detailedRecipesInfo: [],
  detailedMealPlanRecipes: [],
  magicFridgeRecipes: [],
  magicFridgeDetailedRecipes: [],
  isMagicFridge: false,
  isDataLoading: false,
  error: null,
  dailyMealPlan: '',
};

if (module.hot) {
  module.hot.accept();
}

function getNutrientAmount(nutrientName, arrayOfAllNutrients) {
  let searchedNutrient = arrayOfAllNutrients.find(nutrient => nutrient.name === nutrientName);
  return searchedNutrient.amount;
}

function calculateMaxCalories(currentGoal, usersWeight) {
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

function GetMealPlanByGoal() {
  return `<div class="${styles.getMealPlanByGoal}">
    ${SetGoal()}
    ${RenderDailyMealPlan()}
  </div>`;
}

function GetRecipeByIngredients() {
  return `<div class="${styles.getRecipeByIngredientsContainer}">
    ${FillFridge()}
    ${RenderFridgeIngredients()}
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
  return `<div>
    <h2>Do you want to lose or to gain weight?</h2>
    ${GoalSwitch(currentGoal, setCurrentGoal)}
    <p>In case you want to lose weight, we're going to create a meal plan with a decreased amount of carbs.</p>
    <p>If your goal is to gain muscles - we're going to include more high protein dishes.
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
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '46c316dbf2msh22acfa650b43ca2p1df703jsnc4386fc8ea30',
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
    },
  )
    .then(response => response.json())
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
  let content = 'Please set your goal.';
  if (dailyMealPlan) {
    const {
      meals,
      nutrients: { calories, protein, fat, carbohydrates },
    } = dailyMealPlan;
    content = meals
      .map(({ id, title }) => `<div><div>${id}</div><div>${title}</div></div>`)
      .join('');
    content += `<div><p>Calories: ${calories}</p><p>protein: ${protein}</p><p>fat: ${fat}</p><p>carbohydrates: ${carbohydrates}</p></div>`;
  }
  if (detailedMealPlanRecipes.length) {
    content = `${window.dataStore.detailedMealPlanRecipes
      .map(({ title, image, instructions, readyInMinutes, nutrition: { nutrients } }) => {
        const caloriesAmount = getNutrientAmount('Calories', nutrients);
        const fatAmount = getNutrientAmount('Fat', nutrients);
        const carbohydratesAmount = getNutrientAmount('Carbohydrates', nutrients);
        const proteinAmount = getNutrientAmount('Protein', nutrients);
        let content = `<div><h1>${title}</h1>
        <image src="${image}" alt="${title}"/>
        <p>Ready in ${readyInMinutes} minutes.</p>
        <p>Calories: ${caloriesAmount}</p>
        <p>Protein: ${proteinAmount}</p>
        <p>Fat: ${fatAmount}</p>
        <p>Carbohydrates: ${carbohydratesAmount}</p>
        </div></div>`;
        return content;
      })
      .join('')}`;
  }

  return `<div class="${styles.RenderDailyMealPlanContainer}">${content}</div>`;
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

function FillFridge() {
  return `<div>
      <h2>What's in your fridge?</h2>
      <p>Enter up to 5 products you have in the fridge to cook the best meal. Example: apple, milk, sugar. </p>
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
    `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${ingredientsQueryString}&number=3&ignorePantry=false&ranking=1`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '46c316dbf2msh22acfa650b43ca2p1df703jsnc4386fc8ea30',
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
    },
  )
    .then(response => response.json())
    .then(data => {
      window.dataStore.magicFridgeRecipes = data;
      return data;
    })
    .catch(err => {
      window.dataStore.err = err;
    })
    .finally(window.renderApp);
}

function confirmButtonCB() {
  window.dataStore.isMagicFridge = true;
  let promise = loadMagicFridgeRecipes();
  promise.then(data => loadDetailedRecipesInfo({ results: data }, 'magicFridgeDetailedRecipes'));
  window.renderApp();
}

function RenderFridgeIngredients() {
  let confirmButton = '';
  if (window.dataStore.magicFridgeItems.length > 0) {
    confirmButton = `<button onclick="window.confirmButtonCB()" >Magic time!</button>`;
  }
  return `${window.dataStore.magicFridgeItems
    .map(
      fridgeItem => `<div>
  ${fridgeItem}
  </div>`,
    )
    .join('')}
    ${confirmButton}`;
}

function RenderFridgeRecipes() {
  const { isMagicFridge, magicFridgeRecipes, magicFridgeDetailedRecipes } = window.dataStore;
  let content = '';
  if (isMagicFridge) {
    content = `
      ${magicFridgeRecipes
        .map(
          ({ title, image }) =>
            `<div class="magicFridgeRecipe"><p>${title}</p><img src="${image}" alt="oops"></div>`,
        )
        .join('')}
    `;
  }
  if (magicFridgeDetailedRecipes.length) {
    content = `${magicFridgeDetailedRecipes
      .map(({ title, image, instructions, readyInMinutes, nutrition: { nutrients } }) => {
        const caloriesAmount = getNutrientAmount('Calories', nutrients);
        const fatAmount = getNutrientAmount('Fat', nutrients);
        const carbohydratesAmount = getNutrientAmount('Carbohydrates', nutrients);
        const proteinAmount = getNutrientAmount('Protein', nutrients);
        let cardContent = `<div><h1>${title}</h1>
        <image src="${image}" alt="${title}"/>
        <p>Calories: ${caloriesAmount}</p>
        <p>Protein: ${proteinAmount}</p>
        <p>Fat: ${fatAmount}</p>
        <p>Carbohydrates: ${carbohydratesAmount}</p>
        </div></div>`;
        return cardContent;
      })
      .join('')}`;
  }
  return `<div class="aaa">${content}</div>`;
}

function isCurrentRecipeInCache() {
  const { recipesInCache, searchedRecipe } = window.dataStore;
  return Boolean(recipesInCache[searchedRecipe]);
}

function loadDetailedRecipesInfo({ results }, whereToLoad) {
  const urlsOfDetailedRecipes = results.map(result => getUrlOfDetailedRecipe(result.id));
  let requests = urlsOfDetailedRecipes.map(url =>
    fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': `${process.env.YUMMY_SPOON_API_KEY}`,
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
    }),
  );
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
    return fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': `${process.env.YUMMY_SPOON_API_KEY}`,
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
    })
      .then(response => response.json())
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
        loadDetailedRecipesInfo(data, 'detailedRecipesInfo');
      }
    })
    .catch(err => {
      window.dataStore.error = `Some error occurred ${err}`;
    })
    .finally(window.renderApp);
}

function SearchRecipes() {
  const { searchedRecipe } = window.dataStore;
  return `<div>
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
    detailedRecipesInfo,
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
      content = `${window.dataStore.detailedRecipesInfo
        .map(({ title, image, instructions, readyInMinutes, nutrition: { nutrients } }) => {
          const caloriesAmount = getNutrientAmount('Calories', nutrients);
          const fatAmount = getNutrientAmount('Fat', nutrients);
          const carbohydratesAmount = getNutrientAmount('Carbohydrates', nutrients);
          const proteinAmount = getNutrientAmount('Protein', nutrients);
          let cardContent = `<div><h1>${title}</h1>
          <image src="${image}" alt="${title}"/>
          <p>Calories: ${caloriesAmount}</p>
          <p>Protein: ${proteinAmount}</p>
          <p>Fat: ${fatAmount}</p>
          <p>Carbohydrates: ${carbohydratesAmount}</p>
          </div></div>`;
          return cardContent;
        })
        .join('')}`;
    }
  }
  return `<div>${content}</div>`;
}

function renderApp() {
  appRoot.innerHTML = App();
}

function App() {
  return `<div class="${styles.appContainer}" >
    <header class="${styles.header}"><h1>YummySpoon</h1></header>
    ${GetMealPlanByGoal()}
    ${GetRecipeByIngredients()}
    ${SearchForRecipesByName()}
  </div>`;
}

renderApp();
