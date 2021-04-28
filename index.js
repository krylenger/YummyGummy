// Start from here
import { recipesByName, dailyMealPlan, recipesByIngredients } from './apiData';
import { getSearchRecipeUrl, getUrlOfDetailedRecipe } from './utils';
import styles from './style';

const appRoot = document.getElementById('app-root');

window.renderApp = renderApp;
window.FillFridgeOnChangeCB = FillFridgeOnChangeCB;
window.confirmButtonCB = confirmButtonCB;
window.performSearchRecipes = performSearchRecipes;
window.validateAndLoadData = validateAndLoadData;

window.dataStore = {
  currentGoal: '',
  fridgeItems: [],
  usersWeight: '',
  searchedRecipe: '',
  detailedRecipesInfo: [],
  isMagicFridge: false,
  isDataLoading: false,
  error: null,
  recipesInCache: [],
};

if (module.hot) {
  module.hot.accept();
}

function GetMealPlanByGoal() {
  return `<div class="${styles.getMealPlanByGoal}">
    ${SetGoal()}
    ${RenderDailyMealPlan()}
  </div>`;
}

function GetRecipeByIngredients() {
  return `<div class="${styles.getMealPlanByGoal}">
    ${FillFridge()}
    ${RenderFridgeIngredients()}
    ${RenderFridgeRecipes()}
  </div>`;
}

function SearchForRecipesByName() {
  return `<div>
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
  </div>`;
}

function RenderDailyMealPlan() {
  const { currentGoal, usersWeight } = window.dataStore;
  const { meals } = dailyMealPlan;
  let content = '';

  if (currentGoal && usersWeight) {
    content += meals.map(
      ({ title, sourceUrl }) => `<div>${title}</div>
    <a href="${sourceUrl}">link</a>`,
    );
  }
  return content ? `<div class="${styles.RenderDailyMealPlanContainer}">${content}</div>` : '';
}

function FillFridgeOnChangeCB(value) {
  const { fridgeItems } = window.dataStore;

  if (fridgeItems.length < 5) {
    fridgeItems.push(value);
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

function confirmButtonCB() {
  window.dataStore.isMagicFridge = true;
  window.renderApp();
}

function RenderFridgeIngredients() {
  let confirmButton = '';
  if (window.dataStore.fridgeItems.length > 0) {
    confirmButton = `<button onclick="window.confirmButtonCB()" >Magic time!</button>`;
  }
  return `${window.dataStore.fridgeItems
    .map(
      fridgeItem => `<div>
  ${fridgeItem}
  </div>`,
    )
    .join('')}
    ${confirmButton}`;
}

function RenderFridgeRecipes() {
  const { isMagicFridge } = window.dataStore;
  let content = '';
  if (isMagicFridge) {
    content = `
      ${recipesByIngredients
        .map(({ title }) => `<div><p>${title}</p></div>`)
        .slice(5)
        .join('')}
    `;
  }
  return content ? `<div class="${styles.RenderDailyMealPlanContainer}">${content}</div>` : '';
}

function isCurrentRecipeInCache() {
  const { recipesInCache, searchedRecipe } = window.dataStore;
  return Boolean(recipesInCache[searchedRecipe]);
}

function loadDetailedRecipesInfo({ results }) {
  const urlsOfDetailedRecipes = results.map(result => getUrlOfDetailedRecipe(result.id));
  let requests = urlsOfDetailedRecipes.map(url => fetch(url));
  return Promise.all(requests)
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(data => {
      window.dataStore.detailedRecipesInfo = data;
    })
    .catch(error => console.error(error + ' inside loadDetailedRecipesInfo'));
}

function validateAndLoadData() {
  const { searchedRecipe } = window.dataStore;
  const url = getSearchRecipeUrl(searchedRecipe);

  if (!isCurrentRecipeInCache()) {
    return fetch(url)
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
        loadDetailedRecipesInfo(data);
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
  const { searchedRecipe, isDataLoading, error, detailedRecipesInfo } = window.dataStore;
  let content = '';

  //initial state
  if (searchedRecipe === '') {
    content = 'Please enter recipe name.';
  } else {
    //loading state
    if (isDataLoading) {
      content = 'Loading...';
    }
    if (error) {
      content = error;
    }
    if (isCurrentRecipeInCache()) {
      content = `${window.dataStore.recipesInCache[searchedRecipe].results
        .map(result => `<div>${result.title}</div>`)
        .join('')}`;
    }

    //error state
    //results state
  }

  return `<div>${content}</div>`;
}

function renderApp() {
  appRoot.innerHTML = App();
}

function App() {
  return `<div class="${styles.apps}" >
    <header class="${styles.header}"><h1>YummySpoon</h1></header>
    ${GetMealPlanByGoal()}
    ${GetRecipeByIngredients()}
    ${SearchForRecipesByName()}
  </div>`;
}

renderApp();
