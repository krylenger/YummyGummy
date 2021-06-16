import React from 'react';
import { getPreparedRecipeCardData, RecipeCard } from '../RecipeCard';
import { recipesContainer, mealDescription, recipeCardsContainer } from './DailyMealPlan.css';

export default function DailyMealPlan({
  dailyMealPlan,
  detailedRecipes,
  setIsModalRecipeOpened,
  setModalRecipeData,
}) {
  let content = null;
  let contentDescription = null;

  if (dailyMealPlan) {
    const {
      meals,
      nutrients: { calories, protein, fat, carbohydrates },
    } = dailyMealPlan;
    contentDescription = (
      <>
        <h3>Meal Description</h3>
        <div>
          <p>Here is your daily meal plan: breakfast, lunch and dinner.</p>
          <p>Enjoy it!</p>
          <p>Calories: {calories}</p>
          <p>Protein: {protein}</p>
          <p>Fat: {fat}</p>
          <p>Carbohydrates: {carbohydrates}</p>
        </div>
      </>
    );
  }

  if (detailedRecipes.length) {
    const recipeCards = detailedRecipes.map(detailedRecipeCardData => {
      const preparedRecipeCardData = getPreparedRecipeCardData(detailedRecipeCardData);
      return (
        <RecipeCard
          preparedRecipeCardData={preparedRecipeCardData}
          key={preparedRecipeCardData.id}
          detailedRecipes={detailedRecipes}
          setIsModalRecipeOpened={setIsModalRecipeOpened}
          setModalRecipeData={setModalRecipeData}
        />
      );
    });
    content = recipeCards;
  }

  return (
    <div className={recipesContainer}>
      <div className={mealDescription}>{contentDescription}</div>
      <ul className={recipeCardsContainer}>{content}</ul>
    </div>
  );
}
