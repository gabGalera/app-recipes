import React from 'react';
import Header from '../components/Header';
import { JSONDoneRecipesReader } from '../helpers/JSONReaders';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const doneRecipes = JSONDoneRecipesReader;
  return (
    <div>
      <Header title="Done Recipes" search={ false } />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-meal-btn">Meals</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      {console.log(doneRecipes)}
      {doneRecipes.map((recipe, index) => (
        <div key={ index }>
          <h1 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h1>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <input
            src={ shareIcon }
            alt="share icon"
            type="image"
            data-testid={ `${index}-horizontal-share-btn` }
          />

          {recipe.tags.map((tag, tagIndex) => (
            <div
              key={ tagIndex }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </div>
          ))}
          {recipe.type === 'meal' ? (
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.nationality} - ${recipe.category}`}
            </p>
          ) : (
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.alcoholicOrNot} - ${recipe.category}`}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
