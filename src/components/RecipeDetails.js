import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

function RecipeDetails() {
  const [API, setAPI] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoadingMain, setIsLoadingMain] = useState(true);
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(true);
  const [isFood, setIsFood] = useState(true);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState([]);
  const [id, setId] = useState('');

  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    if (pathname.split('/')[1] === 'meals') {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`)
        .then((report) => report.json())
        .then((data) => {
          setId(pathname.split('/')[2]);
          setInProgressRecipes(JSON
            .parse(localStorage.getItem('inProgressRecipes')) ? JSON
              .parse(localStorage.getItem('inProgressRecipes')) : {
              meals: { id: [] },
              drinks: { id: [] },
            });
          setDoneRecipes(JSON
            .parse(localStorage.getItem('doneRecipes')) ? JSON
              .parse(localStorage.getItem('doneRecipes')) : []);
          setAPI(data.meals);
          setIsLoadingMain(false);
        });
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((report) => report.json())
        .then((data) => {
          setRecommendations(data.drinks);
          setIsLoadingRecommendation(false);
        });
    }
    if (pathname.split('/')[1] === 'drinks') {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`)
        .then((report) => report.json())
        .then((data) => {
          setId(pathname.split('/')[2]);
          setInProgressRecipes(JSON
            .parse(localStorage.getItem('inProgressRecipes')) ? JSON
              .parse(localStorage.getItem('inProgressRecipes')) : {
              meals: { id: [] },
              drinks: { id: [] },
            });
          setDoneRecipes(JSON
            .parse(localStorage.getItem('doneRecipes')) ? JSON
              .parse(localStorage.getItem('doneRecipes')) : []);
          setIsFood(false);
          setAPI(data.drinks);
          setIsLoadingMain(false);
        });
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((report) => report.json())
        .then((data) => {
          setIsLoadingRecommendation(false);
          setRecommendations(data.meals);
        });
    }
  }, [pathname]);

  const renderIngredients = () => {
    console.log(API);
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
        <button
          type="button"
          data-testid="share-btn"
        >
          Share Recipe
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favorite
        </button>
        <img
          src={ API[0].strMealThumb }
          alt={ API[0].strMeal }
          data-testid="recipe-photo"
        />
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
      <button
        type="button"
        data-testid="share-btn"
      >
        Share Recipe
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
      </button>
      <img
        src={ API[0].strDrinkThumb }
        alt={ API[0].strDrink }
        data-testid="recipe-photo"
      />
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

export default RecipeDetails;
