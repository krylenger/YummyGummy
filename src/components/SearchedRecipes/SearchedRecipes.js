/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import { RecipeCard, getPreparedRecipeCardData } from '../RecipeCard';
import { openModalRecipe } from '../ModalRecipe';
import { isCurrentRecipeInCache } from '../../utils';
import { recipeCardsContainer } from './SearchedRecipes.css';

function findTargetCardAndOpenModal(
  { target },
  setIsModalRecipeOpened,
  setModalRecipeData,
  detailedRecipes,
) {
  let card = target.closest('li');
  if (!card) return;
  openModalRecipe(card.id, setIsModalRecipeOpened, setModalRecipeData, detailedRecipes);
}

export default function SearchedRecipes({
  detailedRecipes,
  setIsModalRecipeOpened,
  setModalRecipeData,
}) {
  // const {
  //   searchedRecipe,
  //   isDataLoading,
  //   error,
  //   detailedSearchedRecipes,
  //   recipesInCache,
  // } = window.dataStore;
  let content = '';

  //initial state
  // if (searchedRecipe === '') {
  //   content = <p>Please enter recipe name.</p>;
  // } else {
  //   //loading state
  //   if (isDataLoading) {
  //     content = <p>Loading...</p>;
  //   }
  //   //error state
  //   if (error) {
  //     content = error;
  //   }
  //results state
  // if (isCurrentRecipeInCache()) {
  const recipeCards = detailedRecipes.map(detailedRecipeCardData => {
    const preparedRecipeCardData = getPreparedRecipeCardData(detailedRecipeCardData);
    return RecipeCard(preparedRecipeCardData);
  });
  content = recipeCards;
  // }
  // }
  return (
    <ul
      class={recipeCardsContainer}
      onClick={event =>
        findTargetCardAndOpenModal(
          event,
          setIsModalRecipeOpened,
          setModalRecipeData,
          detailedRecipes,
        )
      }
    >
      {content}
    </ul>
  );
}
