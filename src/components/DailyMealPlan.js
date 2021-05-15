import styles from '../../style.css';
import { getPreparedRecipeCardData, RecipeCard } from './RecipeCard';

export default function DailyMealPlan() {
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
