import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { JSONDoneRecipesReader } from '../helpers/JSONReaders';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [filterParameters, setFilterParameters] = useState('all');
  const doneRecipes = JSONDoneRecipesReader;
  const filtering = filterParameters === 'meal' ? (
    doneRecipes
      .filter((recipe) => recipe.type === 'meal')
  ) : (
    doneRecipes
      .filter((recipe) => recipe.type === 'drink'));
  return (
    <div>
      <Header title="Done Recipes" search={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilterParameters('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => setFilterParameters('meal') }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilterParameters('drink') }
      >
        Drinks
      </button>
      {(filterParameters === 'all' ? (doneRecipes) : (filtering))
        .map((recipe, index) => (
          <div key={ index }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h1
                data-testid={ `${index}-horizontal-name` }
                style={ {
                  textDecoration: 'none',
                } }
              >
                {recipe.name}
              </h1>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                style={ {
                  width: '180px',
                } }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{`${recipe.doneDate}`}</p>
            <div>
              <input
                src={ shareIcon }
                alt="share icon"
                type="image"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => {
                  console.log('hey');
                  copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                  const messageElement = document
                    .getElementById(`${index}-share-message`);
                  messageElement.innerText = 'Link copied!';
                } }
              />
              <p id={ `${index}-share-message` } />
            </div>
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
