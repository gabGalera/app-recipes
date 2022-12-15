import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from '../styles/FavAndShareBtns.module.css';
import { JSONFavRecipesReader } from '../helpers/JSONReaders';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function FavAndShareBtnDrinks() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [favoriteRecipes, setFavoriteRecipes] = useState(JSONFavRecipesReader);
  const API = useSelector((state) => state.recipeDetails.API);
  return (
    <div className={ styles.main__container }>
      <input
        alt="share"
        src={ shareIcon }
        type="image"
        data-testid="share-btn"
        className={ styles.share__icon }
        onClick={ () => {
          copy(`http://localhost:3000/drinks/${pathname.split('/')[2]}`);
          const messageElement = document.getElementById('share-message');
          messageElement.innerText = 'Link copied!';
        } }
      />
      <input
        alt="favoritar"
        type="image"
        data-testid="favorite-btn"
        className={ styles.fav__icon }
        src={ favoriteRecipes.some((entry) => entry.id === API[0].idDrink)
          ? blackHeartIcon
          : whiteHeartIcon }
        onClick={ () => {
          let newFavoriteRecipes = [];
          newFavoriteRecipes = [...favoriteRecipes];
          if (favoriteRecipes.some((entry) => entry.id === API[0].idDrink)) {
            console.log('hey');
            newFavoriteRecipes = newFavoriteRecipes
              .filter((entry) => entry.id !== API[0].idDrink);
            setFavoriteRecipes(newFavoriteRecipes);
            localStorage.setItem(
              'favoriteRecipes',
              JSON.stringify(newFavoriteRecipes),
            );
          } else {
            console.log('yo!');
            newFavoriteRecipes.push({
              id: API[0].idDrink,
              type: 'drink',
              nationality: '',
              category: API[0].strCategory,
              alcoholicOrNot: API[0].strAlcoholic,
              name: API[0].strDrink,
              image: API[0].strDrinkThumb,
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

export default FavAndShareBtnDrinks;
