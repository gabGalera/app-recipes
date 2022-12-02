import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MealsDetailsInformations from '../components/MealsDetailsInformations';
import DrinksDetailsInformations from '../components/DrinksDetailsInformations';
import { fecthDrinkDetails,
  fecthMealsDetails,
  fetchDrinksRecommendations, fetchMealsRecommendations } from '../services/searchApi';
import FavAndShareBtnMeals from '../components/FavAndShareBtnMeals';
import FavAndShareBtnDrinks from '../components/FavAndShareBtnDrinks';
import StartAndContinueBtnDrinks from '../components/StartAndContinueBtnDrinks';
import StartAndContinueBtnMeals from '../components/StartAndContinueBtnMeals';

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
    if (pathname.split('/')[1] === 'meals') {
      fecthMealsDetails({ pathname,
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
        setAPI,
        setIsLoadingMain,
      });
      setIsFood(false);
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
        <FavAndShareBtnMeals
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
        <StartAndContinueBtnMeals
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
      <FavAndShareBtnDrinks
        favoriteRecipes={ favoriteRecipes }
        setFavoriteRecipes={ setFavoriteRecipes }
        API={ API }
      />
      <DrinksDetailsInformations
        API={ API }
        renderIngredients={ renderIngredients }
        recommendations={ recommendations }
        doneRecipes={ doneRecipes }
        id={ id }
        inProgressRecipes={ inProgressRecipes }
      />
      <StartAndContinueBtnDrinks
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
