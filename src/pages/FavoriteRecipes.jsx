import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import share from '../images/shareIcon.svg';
import fav from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const componentDidMount = () => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return favRecipes !== null ? setFavoriteRecipes(favRecipes)
      : global.alert('sem receitas');
  };
  useEffect(() => { componentDidMount(); }, []);

  const UnFavRecipe = ({ target: { name } }) => {
    // setIsLoading(true);
    const favRecipesFilter = favoriteRecipes.filter(({ id }) => +id !== +name);
    setFavoriteRecipes(favRecipesFilter);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favRecipesFilter));
    // setIsLoading(false);
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
    <div>
      <Header title="Favorite Recipes" search={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        name="All"
        onClick={ filterType }
      >
        All

      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        name="Meals"
        onClick={ filterType }
      >
        Meals

      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="Drinks"
        onClick={ filterType }
      >
        Drinks

      </button>
      {favoriteRecipes.map((favRecipe, index) => (
        <div key={ favRecipe.id } id={ favRecipe.id }>
          <Link
            to={ `${favRecipe
              .type}s/${favRecipe.id}` }
          >
            <img
              width="100px"
              height="100px"
              src={ favRecipe.image }
              data-testid={ `${index}-horizontal-image` }
              alt={ favRecipe.name }
            />
            <p data-testid={ `${index}-horizontal-name` }>{favRecipe.name}</p>
          </Link>
          <button
            type="button"
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
          >
            <img data-testid={ `${index}-horizontal-share-btn` } src={ share } alt="" />
          </button>

          <input
            name={ favRecipe.id }
            onClick={ UnFavRecipe }
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ fav }
            alt=""
            type="image"
          />

          <p data-testid={ `${index}-horizontal-top-text` }>
            {favRecipe.type === 'drink' ? favRecipe.alcoholicOrNot
              : `${favRecipe.nationality} - ${favRecipe.category}`}
          </p>
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
