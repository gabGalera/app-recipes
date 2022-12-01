import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const copy = require('clipboard-copy');

function DrinksDetails({
  API, renderIngredients, recommendations, doneRecipes, id, inProgressRecipes }) {
  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          copy(window.location.href);
          const messageElement = document.getElementById('share-message');
          messageElement.innerText = 'Link copied!';
        } }
      >
        Share Recipe
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
      </button>
      <div>
        <p id="share-message" />
        <img
          src={ API[0].strDrinkThumb }
          alt={ API[0].strDrink }
          data-testid="recipe-photo"
        />
      </div>
      <p data-testid="recipe-title">{API[0].strDrink}</p>
      <p data-testid="recipe-category">{API[0].strAlcoholic}</p>
      {renderIngredients()}
      <p data-testid="instructions">{API[0].strInstructions}</p>
      <p data-testid="video">{API[0].strVideo}</p>
      <h1>Recommended</h1>
      <div
        style={ {
          display: 'flex',
          width: '100%',
          overflowX: 'scroll',
        } }
      >
        {recommendations
          .filter((value, index) => {
            const maxRecommendations = 6;
            return index < maxRecommendations;
          })
          .map((entry, index) => (
            <div key={ index } data-testid={ `${index}-recommendation-card` }>
              <p data-testid={ `${index}-recommendation-title` }>
                {
                  entry.strMeal
                }
              </p>
              <img
                src={ entry.strMealThumb }
                alt={ entry.strMeal }
                style={ {
                  padding: '1vw',
                  width: '180px',
                } }
              />
            </div>
          ))}
      </div>
      {!doneRecipes.some((entry) => entry.id === API[0].idDrink) && (
        <Link to={ `./${id}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            style={ {
              position: 'fixed',
              bottom: '0px',
            } }
          >
            Start Recipe
          </button>
        </Link>
      )}
      {Object.keys(inProgressRecipes.drinks)
        .some((entry) => entry === API[0].idDrink)
          && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              style={ {
                position: 'fixed',
                bottom: '0px',
              } }
            >
              Continue Recipe
            </button>
          )}
    </div>
  );
}

DrinksDetails.propTypes = ({
  API: PropTypes.arrayOf().isRequired,
  renderIngredients: PropTypes.func.isRequired,
  recommendations: PropTypes.arrayOf().isRequired,
  doneRecipes: PropTypes.arrayOf().isRequired,
  id: PropTypes.string.isRequired,
  inProgressRecipes: PropTypes.shape().isRequired,
});

export default DrinksDetails;
