import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from '../styles/Header.module.css';
import searchIcon from '../images/searchIcon.svg';
import { resultSearchAction } from '../redux/actions';
import { firstLetterApi, firstLetterCocktailApi, ingredientApi, ingredientCocktailApi,
  nameApi, nameCocktailApi } from '../services/searchApi';

function SearchBar() {
  // const maxArrayLength = 12;
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [typeRadio, setTypeRadio] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const [test, setTest] = useState(0);
  const history = useHistory();
  const { location: { pathname } } = history;
  const dispatch = useDispatch();

  const setRadio = ({ target: { value } }) => {
    setTypeRadio(value);
  };

  const searchMeal = async () => {
    switch (typeRadio) {
    case 'ingredient': return setResultSearch(await ingredientApi(searchInput));
    case 'firstLetter': return setResultSearch(await firstLetterApi(searchInput));
    default: return setResultSearch(await nameApi(searchInput));
    }
  };

  const searchCocktail = async () => {
    switch (typeRadio) {
    case 'ingredient': return setResultSearch(await ingredientCocktailApi(searchInput));
    case 'firstLetter': return setResultSearch(await firstLetterCocktailApi(searchInput));
    default: return setResultSearch(await nameCocktailApi(searchInput));
    }
  };

  useEffect(() => {
    dispatch(resultSearchAction(resultSearch));
    if (resultSearch === undefined) return [];
    if (resultSearch.length === 1) {
      switch (pathname) {
      case '/drinks': return history.push(`/drinks/${resultSearch[0].idDrink}`);
      default: return history.push(`/meals/${resultSearch[0].idMeal}`);
      }
    }
    if (resultSearch.length === 0 && test > 0) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } if (test === 0) setTest(1);
  }, [resultSearch]);

  return (

    <div>

      { loading ? <p>loading...</p>

        : (
          <div
            className={ styles.search__bar__div }
          >
            <div
              style={ {
                display: 'flex',
              } }
            >
              <button
                type="button"
                className={ styles.search__button }
                data-testid="exec-search-btn"
                onClick={ async () => {
                  if (pathname === '/meals') {
                    setLoading(true);
                    await searchMeal();
                    return setLoading(false);
                  } setLoading(true);
                  await searchCocktail();
                  setLoading(false);
                } }
              >
                <img
                  style={ {
                    filter: `invert(99%) sepia(7%) saturate(460%)
                    hue-rotate(76deg) brightness(113%) contrast(100%)`,
                  } }
                  src={ searchIcon }
                  alt="searchIcon"
                  data-testid="search-top-btn"
                />
              </button>
              <label htmlFor="searchInput">
                <input
                  className={ styles.search__input }
                  type="text"
                  data-testid="search-input"
                  id="searchInput"
                  onChange={ ({ target: { value } }) => setSearchInput(value) }
                />
              </label>
            </div>
            <div
              className={ styles.input__container }
            >
              <label
                htmlFor="ingredient"
              >
                Ingredient
                {' '}
                <input
                  name="inputRadio"
                  type="radio"
                  id="ingredient"
                  value="ingredient"
                  data-testid="ingredient-search-radio"
                  onChange={ setRadio }
                />
              </label>
              <label htmlFor="name">
                Name
                {' '}
                <input
                  type="radio"
                  name="inputRadio"
                  id="name"
                  value="name"
                  data-testid="name-search-radio"
                  onChange={ setRadio }
                />
              </label>
              <label htmlFor="firstLetter">
                First Letter
                {' '}
                <input
                  type="radio"
                  id="firstLetter"
                  name="inputRadio"
                  value="firstLetter"
                  data-testid="first-letter-search-radio"
                  onChange={ setRadio }
                />
              </label>
            </div>
            {/* {resultSearch.slice(0, maxArrayLength).map((recipe, index) => {
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
            })} */}
          </div>
        )}
    </div>
  );
}

export default SearchBar;
