import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setAPIDetails, setRecommendationsDetails } from '../redux/actions';
import { fecthDrinkDetails,
  fecthMealsDetails,
  fetchDrinksRecommendations,
  fetchMealsRecommendations } from '../services/recipeDetails';
import DetailsInformationsDrinks from '../components/DetailsInformationsDrinks';
import DetailsInformationsMeals from '../components/DetailsInformationsMeals';
import FavAndShareBtnDrinks from '../components/FavAndShareBtnDrinks';
import FavAndShareBtnMeals from '../components/FavAndShareBtnMeals';

function RecipeInProgress() {
  const [isLoadingMain, setIsLoadingMain] = useState(true);
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();
  const { location: { pathname } } = history;

  const componentDidMount = async () => {
    if (pathname.split('/')[1] === 'meals') {
      dispatch(setRecommendationsDetails(await fetchMealsRecommendations()));
      dispatch(setAPIDetails(await fecthMealsDetails(pathname)));
      setIsLoadingRecommendation(false);
      setIsLoadingMain(false);
    }
    if (pathname.split('/')[1] === 'drinks') {
      dispatch(setAPIDetails(await fecthDrinkDetails(pathname)));
      dispatch(setRecommendationsDetails(await fetchDrinksRecommendations()));
      setIsLoadingRecommendation(false);
      setIsLoadingMain(false);
    }
  };

  useEffect(() => {
    componentDidMount();
  }, []);

  if (isLoadingMain || isLoadingRecommendation) return <h1>Loading...</h1>;

  if (pathname.split('/')[1] === 'meals') {
    return (
      <>
        <FavAndShareBtnMeals />
        <DetailsInformationsMeals />
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finish Recipe
        </button>
      </>
    );
  }
  return (
    <>
      <FavAndShareBtnDrinks />
      <DetailsInformationsDrinks />
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </>
  );
}

export default RecipeInProgress;
