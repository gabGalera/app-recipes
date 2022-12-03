import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAPIDetails, setRecommendationsDetails } from '../redux/actions';
import DetailsInformationsMeals from '../components/DetailsInformationsMeals';
import DetailsInformationsDrinks from '../components/DetailsInformationsDrinks';
import { fecthDrinkDetails,
  fecthMealsDetails,
  fetchDrinksRecommendations,
  fetchMealsRecommendations } from '../services/recipeDetails';
import FavAndShareBtnMeals from '../components/FavAndShareBtnMeals';
import FavAndShareBtnDrinks from '../components/FavAndShareBtnDrinks';
import StartAndContinueBtnDrinks from '../components/StartAndContinueBtnDrinks';
import StartAndContinueBtnMeals from '../components/StartAndContinueBtnMeals';

function RecipeDetails() {
  const [isLoadingMain, setIsLoadingMain] = useState(true);
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    if (pathname.split('/')[1] === 'meals') {
      fecthMealsDetails({ pathname,
        setAPIDetails,
        dispatch,
        setIsLoadingMain });
      fetchMealsRecommendations({
        setRecommendationsDetails,
        dispatch,
        setIsLoadingRecommendation,
      });
    }
    if (pathname.split('/')[1] === 'drinks') {
      fecthDrinkDetails({
        pathname,
        setAPIDetails,
        dispatch,
        setIsLoadingMain,
      });
      fetchDrinksRecommendations({
        setRecommendationsDetails,
        dispatch,
        setIsLoadingRecommendation,
      });
    }
  }, [pathname, dispatch]);

  if (isLoadingMain || isLoadingRecommendation) return <h1>Loading...</h1>;

  if (pathname.split('/')[1] === 'meals') {
    return (
      <div>
        <FavAndShareBtnMeals />
        <DetailsInformationsMeals />
        <StartAndContinueBtnMeals />
      </div>
    );
  }

  return (
    <div>
      <FavAndShareBtnDrinks />
      <DetailsInformationsDrinks />
      <StartAndContinueBtnDrinks />
    </div>
  );
}

export default RecipeDetails;
