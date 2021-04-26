// Start from here
import { recipesByName, dailyMealPlan, recipesByIngredients } from './apiData';
import styles from './style';

const appRoot = document.getElementById('app-root');

window.renderApp = renderApp;
window.FillFridgeOnChangeCB = FillFridgeOnChangeCB;
window.confirmButtonCB = confirmButtonCB;

window.dataStore = {
  currentGoal: '',
  fridgeItems: [],
  usersWeight: '',
  searchedRecipe: '',
  fridgeIsMagic: false,
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
  window.dataStore.fridgeIsMagic = true;
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
  const { fridgeIsMagic } = window.dataStore;
  let content = '';
  if (fridgeIsMagic) {
    content = `
      ${recipesByIngredients
        .map(({ title }) => `<div><p>${title}</p></div>`)
        .slice(5)
        .join('')}
    `;
  }
  return content ? `<div class="${styles.RenderDailyMealPlanContainer}">${content}</div>` : '';
}

function SearchRecipes() {
  const { searchedRecipe } = window.dataStore;
  return `<div>
    <h2>Search by recipe name</h2>
    <input 
      type="text" 
      value="${searchedRecipe}" 
      placeholder="enter recipe (ex: rice)" 
      onchange="window.dataStore.searchedRecipe = this.value; window.renderApp()"
    />
  </div>`;
}

function RenderRecipes() {
  const recipesData = recipesByName.results;
  const { searchedRecipe } = window.dataStore;
  let content = '';

  content = searchedRecipe
    ? `
  ${recipesData
    .filter(recipe => recipe.title.toLowerCase().includes(searchedRecipe))
    .map(recipeObj => `<div>${recipeObj.title}</div>`)
    .join('')}
  `
    : '';
  return content ? `<div>${content}</div>` : '';
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
