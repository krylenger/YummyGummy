/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, useEffect, useState } from '../../framework';
import { searchForRecipeByNameContainer } from './SearchForRecipesByName.css';
import SearchRecipes from '../SearchRecipes';
import SearchByNameRecipes from '../SearchByNameRecipes';
import { isCurrentRecipeInCache } from '../../utils';
import {
  getRapidAPIFetchOptionsData,
  getUrlOfDetailedRecipe,
  getSearchRecipeUrl,
} from '../../data/spoonacularAPI';

export default function SearchForRecipesByName() {
  const [searchedRecipe, setSearchedRecipe] = useState('');
  const [error, setError] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState('');
  const [detailedRecipes, setDetailedRecipes] = useState([]);
  useEffect(() => {
    if (searchedRecipe) {
      performSearchRecipes(searchedRecipe);
      function performSearchRecipes(recipeName) {
        setError(null)
        setIsDataLoading(true);
        validateAndLoadData()
          .then(({ error, data }) => {
            // console.log('works');
            setIsDataLoading(true);
            if (error) {
              setError(error);
            } else if (data) {
              if (!data.results.length) {
                throw new Error('wrong input');
              }
              // window.dataStore.recipesInCache[recipeName] = data;
              loadDetailedRecipesInfo(data);
            } 
            // else {
            //   loadDetailedRecipesInfo(
            //     window.dataStore.recipesInCache[recipeName],
            //     'detailedSearchedRecipes',
            //   );
            // }
          })
          .catch(err => {
            setError(err);
          })
          // .finally(() => console.log('data loaded'));
      }
      function validateAndLoadData() {
        // const { searchedRecipe } = window.dataStore;
        const url = getSearchRecipeUrl(searchedRecipe);

        // if (!isCurrentRecipeInCache()) {
          return fetch(url, getRapidAPIFetchOptionsData())
            .then(response => {
              if (response.ok) return response.json();
              throw new Error(`Error` + response.status + response.json);
            })
            .then(data => ({ data }));
        // }
        return Promise.resolve({});
      }
      function loadDetailedRecipesInfo({ results }) {
        const urlsOfDetailedRecipes = results.map(result => getUrlOfDetailedRecipe(result.id));
        let requests = urlsOfDetailedRecipes.map(url => fetch(url, getRapidAPIFetchOptionsData()));
        return Promise.all(requests)
          .then(responses => Promise.all(responses.map(r => r.json())))
          .then(data => {
            if (!data.length) {
              throw new Error('Please enter valid ingredient.');
            }
            // window.dataStore[whereToLoad] = data;
            setDetailedRecipes(data);
            // console.log('works');
          })
          .catch(error => {
            // window.dataStore.error = 'Error inside loadDetailedRecipesInfo';
            setError('Error inside loadDetailedRecipesInfo');
          })
          // .finally(() => console.log('detailed data loaded'));
      }
    }
  }, [searchedRecipe]);
  // console.log(detailedRecipes);
  return (
    <div class={searchForRecipeByNameContainer}>
      <SearchRecipes searchedRecipe={searchedRecipe} setSearchedRecipe={setSearchedRecipe} />
      <SearchByNameRecipes />
    </div>
  );
}
