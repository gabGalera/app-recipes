import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { JSONDoneRecipesReader,
  JSONInProgressRecipesReader } from '../helpers/JSONReaders';

function StartAndContinueBtnMeals() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];
  const [doneRecipes] = useState(JSONDoneRecipesReader);
  const [inProgressRecipes] = useState(JSONInProgressRecipesReader);
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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                bottom: '0px',
                width: '90%',
                height: 'auto',
                left: '4.5%',

                fontFamily: 'Epilogue',
                fontStyle: 'normal',
                fontWeight: '700',
                // fontSize: '14px',
                // lineHeight: '14px',
                textAlign: 'center',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',

                color: '#FFFFFF',

                background: '#FCC436',
                borderRadius: '5px',
              } }
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
            style={ {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'fixed',
              bottom: '0px',
              width: '90%',
              height: 'auto',
              left: '4.5%',

              fontFamily: 'Epilogue',
              fontStyle: 'normal',
              fontWeight: '700',
              // fontSize: '14px',
              // lineHeight: '14px',
              textAlign: 'center',
              letterSpacing: '0.03em',
              textTransform: 'uppercase',

              color: '#FFFFFF',

              background: '#FCC436',
              borderRadius: '5px',
            } }
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
