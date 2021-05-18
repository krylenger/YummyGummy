// Start from here
import dataStore from './data/dataStore';
import { performSearchRecipes, validateAndLoadData, getDailyMealPlan } from './data/spoonacularAPI';
import { openModalRecipe } from './components/ModalRecipe';
import renderApp from './framework/render';
import App from './components/App';

window.dataStore = dataStore;
window.renderApp = renderApp;
// window.FillFridgeOnChangeCB = FillFridgeOnChangeCB;
// window.magicButtonCB = magicButtonCB;
window.performSearchRecipes = performSearchRecipes;
window.validateAndLoadData = validateAndLoadData;
window.getDailyMealPlan = getDailyMealPlan;
window.openModalRecipe = openModalRecipe;
window.removeFridgeItem = removeFridgeItem;

if (module.hot) {
  module.hot.accept();
}

renderApp(App, 'app-root');
