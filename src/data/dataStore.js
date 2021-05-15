const dataStore = {
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
  errorInTheFridge: null,
  dailyMealPlan: '',
  isModalRecipeOpened: false,
  modalRecipeData: '',
};

export default dataStore;
