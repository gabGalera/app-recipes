import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MealsDetailsInformations from '../components/MealsDetailsInformations';
import DrinksDetailsInformations from '../components/DrinksDetailsInformations';
import { fecthDrinkDetails,
  fecthMealsDetails,
  fetchDrinksRecommendations, fetchMealsRecommendations } from '../services/searchApi';
import FavoriteAndShareButtons from '../components/FavoriteAndShareButtons';

function RecipeDetails() {
  const [API, setAPI] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoadingMain, setIsLoadingMain] = useState(true);
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(true);
  const [isFood, setIsFood] = useState(true);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState([]);
  const [id, setId] = useState('');
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    setFavoriteRecipes(JSON
      .parse(localStorage.getItem('favoriteRecipes')) ? JSON
        .parse(localStorage.getItem('favoriteRecipes')) : []);
    if (pathname.split('/')[1] === 'meals') {
      fecthMealsDetails({ pathname,
        setId,
        setInProgressRecipes,
        setDoneRecipes,
        setAPI,
        setIsLoadingMain });
      fetchMealsRecommendations({
        setRecommendations,
        setIsLoadingRecommendation,
      });
    }
    if (pathname.split('/')[1] === 'drinks') {
      fecthDrinkDetails({
        pathname,
        setId,
        setInProgressRecipes,
        setDoneRecipes,
        setAPI,
        setIsLoadingMain,
        setIsFood,
      });
      fetchDrinksRecommendations({
        setRecommendations,
        setIsLoadingRecommendation,
      });
    }
  }, [pathname]);

  const renderIngredients = () => {
    const keys = Object.keys(API[0]);
    const ingredients = [];
    keys.forEach((entry) => {
      if (entry.includes('strIngredient') && API[0][entry]) {
        ingredients.push(entry);
      }
    });

    const JSX = ingredients.map((entry, index) => (
      <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
        {API[0][entry]}
        {' '}
        {API[0][`strMeasure${index + 1}`]}
      </p>
    ));

    return JSX;
  };

  if (isLoadingMain || isLoadingRecommendation) return <h1>Loading...</h1>;

  if (isFood) {
    return (
      <div>
        <FavoriteAndShareButtons
          favoriteRecipes={ favoriteRecipes }
          setFavoriteRecipes={ setFavoriteRecipes }
          API={ API }
          pathname={ pathname }
        />
        <MealsDetailsInformations
          API={ API }
          renderIngredients={ renderIngredients }
          recommendations={ recommendations }
          doneRecipes={ doneRecipes }
          id={ id }
          inProgressRecipes={ inProgressRecipes }
        />
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
    );
  }

  return (
    <div>
      <FavoriteAndShareButtons
        favoriteRecipes={ favoriteRecipes }
        setFavoriteRecipes={ setFavoriteRecipes }
        API={ API }
        pathname={ pathname }
      />
      <DrinksDetailsInformations
        API={ API }
        renderIngredients={ renderIngredients }
        recommendations={ recommendations }
        doneRecipes={ doneRecipes }
        id={ id }
        inProgressRecipes={ inProgressRecipes }
      />
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

export default RecipeDetails;
