import React, { useState } from 'react';
import { mealDescription, recipeCardsContainer } from './FridgeRecipes.css';
import { getPreparedRecipeCardData, RecipeCard } from '../RecipeCard/RecipeCard';
import { openModalRecipe, ModalRecipe } from '../ModalRecipe';

function findElementAndOpenModal(
  target,
  setIsModalRecipeOpened,
  setModalRecipeData,
  detailedRecipes,
) {
  let card = target.closest('li');
  if (!card) return;
  openModalRecipe(card.id, setIsModalRecipeOpened, setModalRecipeData, detailedRecipes);
}

export default function FridgeRecipes({ detailedRecipes, isMagicFridge, errorInTheFridge }) {
  const [isModalRecipeOpened, setIsModalRecipeOpened] = useState(false);
  const [modalRecipeData, setModalRecipeData] = useState([]);
  let content = '';
  let contentDescription = '';
  if (errorInTheFridge) {
    contentDescription = <div>Please add at least one valid ingredient.</div>;
    return <div>{contentDescription}</div>;
  }
  if (isMagicFridge) {
    contentDescription = (
      <>
        <h3>Here we go!</h3>
        <p>
          We have tried to select the best fitting recipes based on your fridge ingredients. Some
          ingredients may be missing so your imagination can help you how to change them and cook
          the best meal ever!
        </p>
      </>
    );
  }
  if (detailedRecipes.length) {
    const recipeCards = detailedRecipes.map(detailedRecipeCardData => {
      const preparedRecipeCardData = getPreparedRecipeCardData(detailedRecipeCardData);
      return RecipeCard(preparedRecipeCardData);
    });
    content = recipeCards;
  }
  return (
    <div>
      <div className={mealDescription}>{contentDescription}</div>
      <ul
        className={recipeCardsContainer}
        onClick={event =>
          findElementAndOpenModal(
            event.target,
            setIsModalRecipeOpened,
            setModalRecipeData,
            detailedRecipes,
          )
        }
        onKeyDown={event => {
          if (event.key === 'Enter' || event.code === 'Space' || event.key === 'EnterNum') {
            findElementAndOpenModal(
              event.target,
              setIsModalRecipeOpened,
              setModalRecipeData,
              detailedRecipes,
            );
          }
        }}
      >
        {content}
      </ul>
      {isModalRecipeOpened ? (
        <ModalRecipe
          modalRecipeData={modalRecipeData}
          setIsModalRecipeOpened={setIsModalRecipeOpened}
        />
      ) : null}
    </div>
  );
}
