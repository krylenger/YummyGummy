/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, useState, useEffect } from '../../framework';
import { searchForRecipeByNameContainer } from './SearchForRecipesByName.css';
import InputRecipeName from '../InputRecipeName';
import SearchedRecipes from '../SearchedRecipes';
import { getDetailedRecipesData, getShortRecipesSearchData } from '../../framework/customHooks';
import { ModalRecipe } from '../ModalRecipe';

export default function SearchForRecipesByName() {
  const {
    searchedRecipe,
    setSearchedRecipe,
    shortRecipesData,
    isShortRecipesInfoLoaded,
  } = getShortRecipesSearchData();
  const { detailedRecipes } = getDetailedRecipesData({
    isShortRecipesInfoLoaded,
    shortRecipesData,
  });
  const [isModalRecipeOpened, setIsModalRecipeOpened] = useState(false);
  const [modalRecipeData, setModalRecipeData] = useState([]);
  return (
    <div class={searchForRecipeByNameContainer}>
      <InputRecipeName searchedRecipe={searchedRecipe} setSearchedRecipe={setSearchedRecipe} />
      <SearchedRecipes
        detailedRecipes={detailedRecipes}
        setIsModalRecipeOpened={setIsModalRecipeOpened}
        setModalRecipeData={setModalRecipeData}
      />
      {isModalRecipeOpened ? (
        <ModalRecipe
          modalRecipeData={modalRecipeData}
          setIsModalRecipeOpened={setIsModalRecipeOpened}
        />
      ) : null}
    </div>
  );
}
