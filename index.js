// Start from here
import {recipesByName, dailyMealPlan} from './apiData';

console.log(dailyMealPlan);

window.dataStore = {
  currentGoal: '',
  fridgeItems: [],
  usersWeight: '',
  searchedRecipe: '',
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
    ${[{ id: 'goalGain', goal: 'gain' }, { id: 'goalLose', goal: 'lose' }].map(
      ({ goal, id }) => `
      <input 
        id="${id}" 
        type="radio" 
        value="${goal}"
        ${currentGoal === goal ? 'checked' : ''}
        onchange="(${setCurrentGoal})(this.value);"
       />
      <label for="${id}">${goal}</label>  
    `
     ).join('')}`;
}

function SetGoal() {
  const {currentGoal, usersWeight} = window.dataStore;
  return `<div>
    <h2>Do you want to lose or to gain weight?</h2>
    ${GoalSwitch(currentGoal, setCurrentGoal)}
    <p>Meal description ... Meal description ... Meal description ... Meal description ...  </p>
    <h2>What's your weight?</h2>
    <input type="number" value="${usersWeight}" placeholder="your weight" onchange="window.dataStore.usersWeight = this.value; window.renderApp();">
  </div>`
}

function RenderDailyMealPlan() {
  const {currentGoal, usersWeight} = window.dataStore;
  const {meals} = dailyMealPlan;
  console.log(meals);

  if (currentGoal && usersWeight) {
    return meals.map(meal => `<div>${meal.title}</div>
    <a href="${meal.sourceUrl}">link</a>`)
  } else {
    return '';
  }
  
}

function FillFridgeOnChangeCB(value) {
  if (window.dataStore.fridgeItems.length < 5) {
    window.dataStore.fridgeItems.push(value); 
    value=''; 
    window.renderApp();
  } else {
    alert('5 ingridients are maximum')
  }
}

window.FillFridgeOnChangeCB = FillFridgeOnChangeCB;

function FillFridge() {
  const {fridgeItems} = window.dataStore;
  return `<div>
      <h2>fridge</h2>
      <p>Enter up to 5 products you have in the fridge to cook the best meal </p>
      <input 
        type="text" 
        placeholder="what is in your fridge?" 
        onchange="window.FillFridgeOnChangeCB(this.value)">
      
  </div>`
}
// <input type="submit">

function RenderFridgeRecipes() {
  if (window.dataStore.fridgeItems.length > 0) {
    console.log('hi');
  }
  console.log(window.dataStore.fridgeItems);
  return `${window.dataStore.fridgeItems.map(fridgeItem => `<div>
  ${fridgeItem}
  </div>`).join('')}`
}

function SearchRecipes() {
  return `<div>
    <input 
      type="text" 
      value="${window.dataStore.searchedRecipe}" 
      placeholder="enter recipe name" 
      onchange="window.dataStore.searchedRecipe = this.value; window.renderApp()"
    />

  </div>`
}

function RenderRecipes() {
  
  const recipesData = recipesByName.results;
  // console.log(recipesData);

  return (window.dataStore.searchedRecipe) ? `
  ${recipesData.filter(recipe => 
   recipe.title.toLowerCase().includes(window.dataStore.searchedRecipe)
   ).map(recipeObj =>  `<div>${recipeObj.title}</div>`
    ).join('')
  }
  ` : '';


}

window.renderApp = renderApp;

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
    ${RenderFridgeRecipes()}
    
    ${SearchRecipes()}
    ${RenderRecipes()}
  </div>`;
}

renderApp()
 