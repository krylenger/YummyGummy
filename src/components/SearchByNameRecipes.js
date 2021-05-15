import { RecipeCard, getPreparedRecipeCardData } from './RecipeCard';
import { isCurrentRecipeInCache } from '../utils';
import styles from '../../style.css';

export default function SearchByNameRecipes() {
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
