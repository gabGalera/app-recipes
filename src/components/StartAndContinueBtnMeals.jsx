import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import styles from '../styles/RecipeDetails.module.css';
import {
  JSONInProgressRecipesReader } from '../helpers/JSONReaders';

function StartAndContinueBtnMeals() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];
  // const [doneRecipes] = useState(JSONDoneRecipesReader);
  const [inProgressRecipes] = useState(JSONInProgressRecipesReader);
  const API = useSelector((state) => state.recipeDetails.API);
  return (
    <div>
      <div>
        {!Object.keys(inProgressRecipes.meals)
          .some((entry) => entry === API[0].idMeal)
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
        {Object.keys(inProgressRecipes.meals)
          .some((entry) => entry === API[0].idMeal)
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

export default StartAndContinueBtnMeals;
