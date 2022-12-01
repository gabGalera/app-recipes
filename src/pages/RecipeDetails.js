import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MealsDetails from '../components/MealsDetails';
import DrinksDetails from '../components/DrinksDetails';

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
    return (<MealsDetails
      API={ API }
      renderIngredients={ renderIngredients }
      recommendations={ recommendations }
      doneRecipes={ doneRecipes }
      id={ id }
      inProgressRecipes={ inProgressRecipes }

    />);
  }

  return (<DrinksDetails
    API={ API }
    renderIngredients={ renderIngredients }
    recommendations={ recommendations }
    doneRecipes={ doneRecipes }
    id={ id }
    inProgressRecipes={ inProgressRecipes }
  />
  );
}

export default RecipeDetails;
