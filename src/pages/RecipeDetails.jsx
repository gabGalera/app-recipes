import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MealsDetailsInformations from '../components/MealsDetailsInformations';
import DrinksDetailsInformations from '../components/DrinksDetailsInformations';
import { fecthDrinkDetails,
  fecthMealsDetails,
  fetchDrinksRecommendations, fetchMealsRecommendations } from '../services/searchApi';
import FavoriteAndShareButtons from '../components/FavoriteAndShareButtons';
import StartAndContinueButtons from '../components/StartAndContinueButtons';

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
        <StartAndContinueButtons
          doneRecipes={ doneRecipes }
          API={ API }
          id={ id }
          inProgressRecipes={ inProgressRecipes }
          pathname={ pathname }
        />
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
      <StartAndContinueButtons
        doneRecipes={ doneRecipes }
        API={ API }
        id={ id }
        inProgressRecipes={ inProgressRecipes }
        pathname={ pathname }
      />
    </div>
  );
}

export default RecipeDetails;
