import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/FavoriteRecipes.module.css';
import Header from '../components/Header';
import share from '../images/shareIcon.svg';
import fav from '../images/blackHeartIcon.svg';
import allButton from '../images/allButton.svg';
import foodIcon from '../images/foodIcon.svg';
import beverageIcon from '../images/beverageIcon.svg';
import shareHeart from '../images/shareHeart.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const componentDidMount = () => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return favRecipes !== null ? setFavoriteRecipes(favRecipes)
      : global.alert('sem receitas');
  };
  useEffect(() => { componentDidMount(); }, []);

  const UnFavRecipe = ({ target: { name } }) => {
    const favRecipesFilter = favoriteRecipes.filter(({ id }) => +id !== +name);
    setFavoriteRecipes(favRecipesFilter);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favRecipesFilter));
  };

  const filterAll = () => {
    componentDidMount();
  };

  const filterMeals = () => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favRecipesMeals = favRecipes.filter(({ type }) => type.includes('meal'));
    setFavoriteRecipes(favRecipesMeals);
  };

  const filterDrinks = () => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favRecipesDrinks = favRecipes.filter(({ type }) => type.includes('drink'));
    setFavoriteRecipes(favRecipesDrinks);
  };

  const filterType = ({ target: { name } }) => {
    switch (name) {
    case 'Drinks': return filterDrinks();
    case 'Meals': return filterMeals();
    default: return filterAll();
    }
  };
  return (
    <div
      style={ {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'rgba(65, 25, 127, 1)',
        width: '100%',
      } }
    >
      <div
        className={ styles.main__div }
      >
        <Header
          title="Favorite Recipes"
          search={ false }
          image={
            <img
              src={ shareHeart }
              alt="heart icon"
              style={ {
                display: 'flex',
                textAlign: 'center',
                height: '15%',
                padding: '2%',
                width: '20%',
                justifyContent: 'center',
              } }
            />
          }
        />
        <div
          className={ styles.btn__div }
        >
          <input
            className={ styles.input__images }
            src={ allButton }
            alt="all button"
            type="image"
            data-testid="filter-by-all-btn"
            onClick={ filterType }
          />
          <input
            className={ styles.input__images }
            src={ foodIcon }
            alt="food icon"
            type="image"
            data-testid="filter-by-meal-btn"
            onClick={ filterType }
          />
          <input
            className={ styles.input__images }
            src={ beverageIcon }
            alt="beverage icon"
            type="image"
            data-testid="filter-by-drink-btn"
            onClick={ filterType }
          />
        </div>
        {favoriteRecipes.map((favRecipe, index) => (
          <div
            key={ favRecipe.id }
            id={ favRecipe.id }
            className={ styles.recipe__container }
          >
            <Link
              to={ `${favRecipe
                .type}s/${favRecipe.id}` }
              style={ { width: '50%', height: '100%' } }
            >
              <img
                className={ styles.recipe__image }
                src={ favRecipe.image }
                data-testid={ `${index}-horizontal-image` }
                alt={ favRecipe.name }
              />
            </Link>
            <div className={ styles.text__div }>
              <Link
                to={ `${favRecipe
                  .type}s/${favRecipe.id}` }
                style={ {
                  textDecoration: 'none',
                  color: 'black',
                } }
              >
                <p
                  className={ styles.recipe__name }
                  data-testid={ `${index}-horizontal-name` }
                >
                  {favRecipe.name}
                </p>
              </Link>
              <p
                className={ styles.recipe__type }
                data-testid={ `${index}-horizontal-top-text` }
              >
                {favRecipe.type === 'drink' ? favRecipe.alcoholicOrNot
                  : `${favRecipe.nationality} - ${favRecipe.category}`}
              </p>
              <div className={ styles.div__done }>
                <input
                  className={ styles.share__fav__btn }
                  type="image"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ share }
                  alt=""
                  onClick={ () => {
                    navigator.clipboard.writeText(
                      `${window.location.protocol}//${window.location.host}/${favRecipe
                        .type}s/${favRecipe.id}`,
                    );
                    const div = document.getElementById(favRecipe.id);
                    const p = document.createElement('p');
                    p.innerText = 'Link copied!';
                    div.appendChild(p);
                  } }
                />
                <input
                  className={ styles.share__fav__btn }
                  name={ favRecipe.id }
                  onClick={ UnFavRecipe }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ fav }
                  alt=""
                  type="image"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
