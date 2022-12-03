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
import { JSONFavRecipesReader,
  JSONInProgressRecipesReader,
  JSONDoneRecipesReader } from '../helpers/JSONReaders';
import FavAndShareBtnMeals from '../components/FavAndShareBtnMeals';
import FavAndShareBtnDrinks from '../components/FavAndShareBtnDrinks';
import StartAndContinueBtnDrinks from '../components/StartAndContinueBtnDrinks';
import StartAndContinueBtnMeals from '../components/StartAndContinueBtnMeals';

function RecipeDetails() {
  const [isLoadingMain, setIsLoadingMain] = useState(true);
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(true);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState([]);
  const [id, setId] = useState('');
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const { location: { pathname } } = history;

  useEffect(() => {
    setFavoriteRecipes(JSONFavRecipesReader);
    setId(pathname.split('/')[2]);
    setInProgressRecipes(JSONInProgressRecipesReader);
    setDoneRecipes(JSONDoneRecipesReader);
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
        <FavAndShareBtnMeals
          favoriteRecipes={ favoriteRecipes }
          setFavoriteRecipes={ setFavoriteRecipes }
          pathname={ pathname }
        />
        <DetailsInformationsMeals />
        <StartAndContinueBtnMeals
          doneRecipes={ doneRecipes }
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
      />
      <DetailsInformationsDrinks />
      <StartAndContinueBtnDrinks
        doneRecipes={ doneRecipes }
        id={ id }
        inProgressRecipes={ inProgressRecipes }
        pathname={ pathname }
      />
    </div>
  );
}

export default RecipeDetails;
