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
import Loading from './Loading';

function RecipeDetails() {
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

  if (isLoadingMain || isLoadingRecommendation) return <Loading />;

  if (pathname.split('/')[1] === 'meals') {
    return (
      <div
        id="main div"
        style={ {
          display: 'flex',
          justifyContent: 'center',
          background: 'rgba(65, 25, 127, 1)',
        } }
      >
        <FavAndShareBtnMeals />
        <DetailsInformationsMeals />
        <StartAndContinueBtnMeals />
      </div>
    );
  }

  return (
    <div
      id="main div"
      style={ {
        display: 'flex',
        justifyContent: 'center',
        background: 'rgba(65, 25, 127, 1)',
      } }
    >
      <FavAndShareBtnDrinks />
      <DetailsInformationsDrinks />
      <StartAndContinueBtnDrinks />
    </div>
  );
}

export default RecipeDetails;
