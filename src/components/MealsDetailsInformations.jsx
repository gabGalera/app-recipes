import React from 'react';
import PropTypes from 'prop-types';

function MealsDetailsInformations({
  API, renderIngredients, recommendations,
}) {
  return (
    <div>
      <div>
        <p id="share-message" />
        <img
          src={ API[0].strMealThumb }
          alt={ API[0].strMeal }
          data-testid="recipe-photo"
        />
      </div>
      <p data-testid="recipe-title">{API[0].strMeal}</p>
      <p data-testid="recipe-category">
        {API[0].strCategory}
      </p>
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
                  entry.strDrink
                }
              </p>
              <img
                src={ entry.strDrinkThumb }
                alt={ entry.strDrink }
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

MealsDetailsInformations.propTypes = ({
  API: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  renderIngredients: PropTypes.func.isRequired,
  recommendations: PropTypes.arrayOf(PropTypes.shape()).isRequired,
});

export default MealsDetailsInformations;
