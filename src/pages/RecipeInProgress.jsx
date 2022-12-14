import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { JSONDoneRecipesReader } from '../helpers/JSONReaders';

function RecipeInProgress() {
  const API = useSelector((state) => state.recipeDetails.API);
  const [isLoadingMain, setIsLoadingMain] = useState(true);
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();
  const { location: { pathname } } = history;
  const type = pathname.split('/')[1];

  const componentDidMount = async () => {
    if (type === 'meals') {
      dispatch(setRecommendationsDetails(await fetchMealsRecommendations()));
      dispatch(setAPIDetails(await fecthMealsDetails(pathname)));
      setIsLoadingRecommendation(false);
      setIsLoadingMain(false);
    }
    if (type === 'drinks') {
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

  if (type === 'meals') {
    return (
      <div
        style={ {
          display: 'flex',
          justifyContent: 'center',
          background: 'rgba(65, 25, 127, 1)',
        } }
      >
        <FavAndShareBtnMeals />
        <DetailsInformationsMeals />
        <button
          type="button"
          id="finish-recipe-btn"
          // disabled
          data-testid="finish-recipe-btn"
          onClick={ () => {
            const doneRecipes = JSONDoneRecipesReader;
            doneRecipes.push({
              id: API[0].idMeal,
              doneDate: new Date(),
              type: 'meal',
              nationality: API[0].strArea,
              category: API[0].strCategory,
              alcoholicOrNot: '',
              name: API[0].strMeal,
              image: API[0].strMealThumb,
              tags: API[0].strTags.split(','),
            });
            localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
            history.push('/done-recipes');
          } }
          style={ {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            bottom: '0px',
            width: '90%',
            height: 'auto',
            left: '4.5%',

            fontFamily: 'Epilogue',
            fontStyle: 'normal',
            fontWeight: '700',
            // fontSize: '14px',
            // lineHeight: '14px',
            textAlign: 'center',
            letterSpacing: '0.03em',
            textTransform: 'uppercase',

            color: '#FFFFFF',

            background: '#FCC436',
            textShadow: '0.5px 0.5px gray',
            borderRadius: '5px',
          } }
        >
          Finish Recipe
        </button>
      </div>
    );
  }
  return (
    <div
      style={ {
        display: 'flex',
        justifyContent: 'center',
        background: 'rgba(65, 25, 127, 1)',
      } }
    >
      <FavAndShareBtnDrinks />
      <DetailsInformationsDrinks />
      <button
        type="button"
        id="finish-recipe-btn"
        data-testid="finish-recipe-btn"
        onClick={ () => {
          const doneRecipes = JSONDoneRecipesReader;
          doneRecipes.push({
            id: API[0].idDrink,
            doneDate: new Date(),
            type: 'drink',
            nationality: '',
            category: API[0].strCategory,
            alcoholicOrNot: API[0].strAlcoholic,
            name: API[0].strDrink,
            image: API[0].strDrinkThumb,
            tags: [],
          });
          localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
          history.push('/done-recipes');
        } }
        style={ {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          bottom: '0px',
          width: '90%',
          height: 'auto',
          left: '4.5%',

          fontFamily: 'Epilogue',
          fontStyle: 'normal',
          fontWeight: '700',
          // fontSize: '14px',
          // lineHeight: '14px',
          textAlign: 'center',
          letterSpacing: '0.03em',
          textTransform: 'uppercase',

          color: '#FFFFFF',

          background: '#FCC436',
          textShadow: '0.5px 0.5px gray',
          borderRadius: '5px',
        } }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
