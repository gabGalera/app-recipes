import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import { firstLetterApi, firstLetterCocktailApi, ingredientApi, ingredientCocktailApi,
  nameApi, nameCocktailApi } from '../services/searchApi';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [typeRadio, setTypeRadio] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const history = useHistory();
  const { pathname } = history;

  const setRadio = ({ target: { name } }) => {
    setTypeRadio(name);
  };

  const searchMeal = () => {
    switch (typeRadio) {
    case 'ingredient': return setResultSearch(ingredientApi(searchInput));
    case 'firstLetter': return setResultSearch(firstLetterApi(searchInput));
    default: return setResultSearch(nameApi(searchInput));
    }
  };

  const searchCocktail = () => {
    switch (typeRadio) {
    case 'ingredient': return ingredientCocktailApi(searchInput);
    case 'firstLetter': return firstLetterCocktailApi(searchInput);
    default: return nameCocktailApi(searchInput);
    }
  };

  useEffect(() => {
    if (resultSearch.length === 1) {
      switch (pathname) {
      case '/drinks': return history.push(`/drinks/${resultSearch[0].idDrink}`);
      default: return history.push(`/meals/${resultSearch[0].idMeal}`);
      }
    }
    if (resultSearch.length === 0) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [resultSearch]);

  return (

    <div>
      <label htmlFor="ingredient">
        Ingredient
        <input
          name="ingredient"
          type="radio"
          id="ingredient"
          value={ typeRadio === 'ingredient' }
          data-testid="ingredient-search-radio"
          onChange={ setRadio }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          name="name"
          id="name"
          value={ typeRadio === 'name' }
          data-testid="name-search-radio"
          onChange={ setRadio }
        />
      </label>
      <label htmlFor="firstLetter">
        First Letter
        <input
          type="radio"
          id="firstLetter"
          name="firstLetter"
          value={ typeRadio === 'firstLetter' }
          data-testid="first-letter-search-radio"
          onChange={ setRadio }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ pathname === '/meals' ? searchMeal : searchCocktail }
      >
        <object
          className="searchIcon"
          type="image/svg+xml"
          data={ searchIcon }
          data-testid="profile-top-btn"
        >
          searchIcon
        </object>
      </button>
      <label htmlFor="searchInput">
        <input
          type="text"
          data-testid="search-input"
          id="searchInput"
          onChange={ ({ target: { value } }) => setSearchInput(value) }
        />
      </label>
      {resultSearch.map((recipe, index) => {
        if (pathname === '/meals') {
          return (
            <div key={ recipe.idMeal } data-testid={ `${index}-recipe-card` }>
              <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
              />
            </div>
          );
        }
        return (
          <div key={ recipe.idDrink } data-testid={ `${index}-recipe-card` }>
            <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
            />
          </div>
        );
      })}
    </div>
  );
}

export default SearchBar;
