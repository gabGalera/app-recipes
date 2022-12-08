import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from '../styles/FavAndShareBtns.module.css';
import { JSONFavRecipesReader } from '../helpers/JSONReaders';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function FavAndShareBtnMeals() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [favoriteRecipes, setFavoriteRecipes] = useState(JSONFavRecipesReader);
  const API = useSelector((state) => state.recipeDetails.API);
  return (
    <div
      className={ styles.main__container }
    >
      <input
        alt="share"
        src={ shareIcon }
        type="image"
        data-testid="share-btn"
        className={ styles.share__icon }
        onClick={ () => {
          copy(`http://localhost:3000/meals/${pathname.split('/')[2]}`);
          const messageElement = document.getElementById('share-message');
          messageElement.innerText = 'Link copied!';
        } }
      />
      <input
        alt="Favoritar"
        type="image"
        data-testid="favorite-btn"
        className={ styles.fav__icon }
        src={ favoriteRecipes.some((entry) => entry.id === API[0].idMeal)
          ? blackHeartIcon
          : whiteHeartIcon }
        onClick={ () => {
          let newFavoriteRecipes = [].concat(favoriteRecipes);
          if (favoriteRecipes.some((entry) => entry.id === API[0].idMeal)) {
            newFavoriteRecipes = newFavoriteRecipes
              .filter((entry) => entry.id !== API[0].idMeal);
            setFavoriteRecipes(newFavoriteRecipes);
            localStorage.setItem(
              'favoriteRecipes',
              JSON.stringify(newFavoriteRecipes),
            );
          } else {
            newFavoriteRecipes.push({
              id: API[0].idMeal,
              type: 'meal',
              nationality: API[0].strArea,
              category: API[0].strCategory,
              alcoholicOrNot: '',
              name: API[0].strMeal,
              image: API[0].strMealThumb,
            });
            setFavoriteRecipes(newFavoriteRecipes);
            localStorage.setItem(
              'favoriteRecipes',
              JSON.stringify(newFavoriteRecipes),
            );
          }
        } }
      />

    </div>
  );
}

export default FavAndShareBtnMeals;
