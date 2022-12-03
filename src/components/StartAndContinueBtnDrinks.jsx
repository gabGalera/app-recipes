import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function StartAndContinueBtnDrinks({
  doneRecipes,
  inProgressRecipes,
  id,
}) {
  const API = useSelector((state) => state.recipeDetails.API);
  return (
    <div>
      <div>
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
    </div>
  );
}

StartAndContinueBtnDrinks.propTypes = ({
  doneRecipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  inProgressRecipes: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
});

export default StartAndContinueBtnDrinks;
