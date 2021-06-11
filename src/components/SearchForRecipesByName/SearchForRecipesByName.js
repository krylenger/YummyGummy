import React, { useState } from 'react';
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
    isDataLoading,
    setIsDataLoading,
    setError,
    error,
    shortRecipesDataCache,
  } = getShortRecipesSearchData();
  const { detailedRecipes } = getDetailedRecipesData({
    isShortRecipesInfoLoaded,
    shortRecipesData,
    isDataLoading,
    setIsDataLoading,
    setError,
  });
  const [isModalRecipeOpened, setIsModalRecipeOpened] = useState(false);
  const [modalRecipeData, setModalRecipeData] = useState([]);
  return (
    <div className={searchForRecipeByNameContainer}>
      <InputRecipeName searchedRecipe={searchedRecipe} setSearchedRecipe={setSearchedRecipe} />
      <SearchedRecipes
        detailedRecipes={detailedRecipes}
        isDataLoading={isDataLoading}
        error={error}
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
