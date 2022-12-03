import React from 'react';
import { useSelector } from 'react-redux';
import renderIngredients from '../helpers/renderIngredients';

function DetailsInformationsDrinks() {
  const recommendations = useSelector((state) => state.recipeDetails.recommendations);
  const API = useSelector((state) => state.recipeDetails.API);
  return (
    <div>
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
      {renderIngredients(API)}
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
    </div>
  );
}

export default DetailsInformationsDrinks;
