import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function StartAndContinueBtnMeals({
  doneRecipes,
  inProgressRecipes,
  id,
}) {
  const API = useSelector((state) => state.recipeDetails.API);
  return (
    <div>
      <div>
        {!doneRecipes.some((entry) => entry.id === API[0].idMeal) && (
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
        {Object.keys(inProgressRecipes.meals)
          .some((entry) => entry === API[0].idMeal)
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

StartAndContinueBtnMeals.propTypes = ({
  doneRecipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  inProgressRecipes: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
});

export default StartAndContinueBtnMeals;
