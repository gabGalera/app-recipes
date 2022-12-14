import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import styles from '../styles/RecipeDetails.module.css';
import { JSONInProgressRecipesReader } from '../helpers/JSONReaders';

function StartAndContinueBtnDrinks() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];
  const [inProgressRecipes] = useState(JSONInProgressRecipesReader);
  const API = useSelector((state) => state.recipeDetails.API);
  return (
    <div>
      <div>
        {!Object.keys(inProgressRecipes.drinks)
          .some((entry) => entry === API[0].idDrink)
          && (
            <Link to={ `./${id}/in-progress` }>
              <button
                type="button"
                data-testid="start-recipe-btn"
                className={ styles.start__btn }
              >
                Start Recipe
              </button>
            </Link>
          )}
        {Object.keys(inProgressRecipes.drinks)
          .some((entry) => entry === API[0].idDrink)
          && (
            <Link to={ `./${id}/in-progress` }>
              <button
                type="button"
                data-testid="start-recipe-btn"
                className={ styles.continue__btn }
              >
                Continue Recipe
              </button>
            </Link>
          )}
      </div>
    </div>
  );
}

export default StartAndContinueBtnDrinks;
