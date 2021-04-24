// Start from here
import { recipesByName, dailyMealPlan, recipesByIngredients } from './apiData';

// console.log(dailyMealPlan);

window.renderApp = renderApp;

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
  // console.log(meals);

  if (currentGoal && usersWeight) {
    return meals.map(
      meal => `<div>${meal.title}</div>
    <a href="${meal.sourceUrl}">link</a>`,
    );
  } else {
    return '';
  }
}

function FillFridgeOnChangeCB(value) {
  if (window.dataStore.fridgeItems.length < 5) {
    window.dataStore.fridgeItems.push(value);
    value = '';
    window.renderApp();
  } else {
    alert('5 ingridients are maximum');
  }
}

window.FillFridgeOnChangeCB = FillFridgeOnChangeCB;

function FillFridge() {
  const { fridgeItems } = window.dataStore;
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
// <input type="submit">

window.confirmButtonCB = confirmButtonCB;

function confirmButtonCB() {
  window.dataStore.fridgeIsMagic = true;
  window.renderApp();
}

function RenderFridgeIngredients() {
  let confirmButton = '';
  if (window.dataStore.fridgeItems.length > 0) {
    confirmButton = `<button onclick="window.confirmButtonCB()" >Magic time!</button>`;
  }
  // console.log(window.dataStore.fridgeItems);
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
  if (window.dataStore.fridgeIsMagic) {
    return `<div>
      ${recipesByIngredients
        .map(recipe => `<div><p>${recipe.title}</p></div>`)
        .slice(5)
        .join('')}
    </div>`;
  } else {
    return ``;
  }
}

function SearchRecipes() {
  return `<div>
    <h2>Search by recipe name</h2>
    <input 
      type="text" 
      value="${window.dataStore.searchedRecipe}" 
      placeholder="enter recipe (ex: rice)" 
      onchange="window.dataStore.searchedRecipe = this.value; window.renderApp()"
    />

  </div>`;
}

function RenderRecipes() {
  const recipesData = recipesByName.results;
  // console.log(recipesData);

  return window.dataStore.searchedRecipe
    ? `
  ${recipesData
    .filter(recipe => recipe.title.toLowerCase().includes(window.dataStore.searchedRecipe))
    .map(recipeObj => `<div>${recipeObj.title}</div>`)
    .join('')}
  `
    : '';
}

function renderApp() {
  const appRoot = document.getElementById('app-root');
  appRoot.innerHTML = App();
}

function App() {
  return `<div>
    <h1>YummySpoon</h1>
    ${SetGoal()}
    ${RenderDailyMealPlan()}
    ${FillFridge()}
    ${RenderFridgeIngredients()}
    ${RenderFridgeRecipes()}
    ${SearchRecipes()}
    ${RenderRecipes()}
  </div>`;
}

renderApp();