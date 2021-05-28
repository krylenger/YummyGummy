/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, useState, useEffect } from '../../framework';
import { searchForRecipeByNameContainer } from './SearchForRecipesByName.css';
import InputRecipeName from '../InputRecipeName';
import SearchedRecipes from '../SearchedRecipes';

export default function SearchForRecipesByName() {
  const [searchedRecipe, setSearchedRecipe] = useState('');
  useEffect(() => {
    function validateAndLoadData() {
      const { searchedRecipe } = window.dataStore;
      const url = getSearchRecipeUrl(searchedRecipe);

      if (!isCurrentRecipeInCache()) {
        return fetch(url, getRapidAPIFetchOptionsData())
          .then(response => {
            if (response.ok) return response.json();
            throw new Error(`Error` + response.status + response.json);
          })
          .then(data => ({ data }));
      }
      return Promise.resolve({});
    }

    function performSearchRecipes(recipeName) {
      window.dataStore.searchedRecipe = recipeName;
      window.dataStore.error = null;
      window.dataStore.isDataLoading = true;
      renderApp();
      validateAndLoadData()
        .then(({ error, data }) => {
          window.dataStore.isDataLoading = false;
          if (error) {
            window.dataStore.error = error;
          } else if (data) {
            if (!data.results.length) {
              throw new Error('wrong input');
            }
            window.dataStore.recipesInCache[recipeName] = data;
            loadDetailedRecipesInfo(data, 'detailedSearchedRecipes');
          } else {
            loadDetailedRecipesInfo(
              window.dataStore.recipesInCache[recipeName],
              'detailedSearchedRecipes',
            );
          }
        })
        .catch(err => {
          window.dataStore.error = `Ooops.. ${err}`;
        })
        .finally(renderApp);
    }
  }, []);
  console.log(searchedRecipe);
  return (
    <div class={searchForRecipeByNameContainer}>
      <InputRecipeName searchedRecipe={searchedRecipe} setSearchedRecipe={setSearchedRecipe} />
      <SearchedRecipes />
    </div>
  );
}
