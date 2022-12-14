import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import styles from '../styles/RecipeDetails.module.css';
import { JSONInProgressRecipesReader } from '../helpers/JSONReaders';
import renderIngredients from '../helpers/renderIngredients';

function DetailsInformationsDrinks() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const type = pathname.split('/')[1];
  const id = pathname.split('/')[2];
  const isInProgress = pathname.split('/')[3];
  const recommendations = useSelector((state) => state.recipeDetails.recommendations);
  const API = useSelector((state) => state.recipeDetails.API);

  useEffect(() => {
    const inProgressRecipes = JSONInProgressRecipesReader;
    if (inProgressRecipes[type][id] && isInProgress) {
      inProgressRecipes[type][id]
        .forEach((entry, index) => {
          const marked = Object.values(entry)[0];
          if (marked) {
            document
              .getElementById(`check-ingredients-${index}`)
              .checked = marked;
            document
              .getElementById(`${index}-ingredient-step`)
              .style.textDecoration = 'line-through solid rgb(0, 0, 0)';
          }
        });
    }
  }, []);

  return (
    <div
      style={ {
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        minHeight: '100vh',
      } }
    >
      <div>
        <img
          className={ styles.main__img }
          src={ API[0].strDrinkThumb }
          alt={ API[0].strDrink }
          data-testid="recipe-photo"
        />
      </div>
      <p id="share-message" />
      <p
        data-testid="recipe-title"
        className={ styles.recipe__title }
      >
        {API[0].strDrink}
      </p>
      <div
        className={ styles.img__container }
      >
        <div
          className={ styles.img__circle }
        >
          <img
            className={ styles.meal__icon }
            src={ drinkIcon }
            alt="drink icon"
          />
        </div>
        <p
          data-testid="recipe-category"
          className={ styles.recipe__category }
        >
          {API[0].strAlcoholic}
        </p>
      </div>
      <h1>
        Ingredients
      </h1>
      {renderIngredients(API, pathname)}
      <p
        className={ styles.instructions }
        data-testid="instructions"
      >
        {API[0].strInstructions}
      </p>
      {API[0].strVideo && (
        <h1>
          Video
        </h1>
      )}
      <iframe
        height={ !API[0].strVideo && '0px' }
        className={ API[0].strVideo && styles.video }
        data-testid="video"
        title={ API[0].strMeal }
        src={ API[0].strVideo && API[0].strVideo.replace('watch?v=', 'embed/') }
      />
      <h1>
        Recommended
      </h1>
      <div
        className={ styles.carousel }
      >
        {recommendations
          .filter((value, index) => {
            const maxRecommendations = 6;
            return index < maxRecommendations;
          })
          .map((entry, index) => (
            <div
              className={ styles.recommendation__card }
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                src={ entry.strMealThumb }
                alt={ entry.strMeal }
                style={ {
                  padding: '1vw',
                  width: '180px',
                } }
              />
              <p data-testid={ `${index}-recommendation-title` }>
                {
                  entry.strMeal
                }
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DetailsInformationsDrinks;
