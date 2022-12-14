import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GiRiceCooker } from 'react-icons/gi';
import styles from '../styles/Recipes.module.css';
import { resultSearchAction } from '../redux/actions';
import { allCategoryDrinksApi,
  firstTwelveCocktailApi, firstTwelveCocktailByCategoryApi } from '../services/searchApi';
import imgAll from '../images/allDrink.svg';
import imgDrink from '../images/drink.svg';
import imgCocktail from '../images/cocktail.svg';
import imgShake from '../images/shake.svg';
import imgOther from '../images/other.svg';
import imgCocoa from '../images/cocoa.svg';
import Footer from './Footer';
import Header from './Header';

function Drinks() {
  const objImages = {
    'Ordinary Drink': imgDrink,
    Cocktail: imgCocktail,
    Shake: imgShake,
    'Other / Unknown': imgOther,
    Cocoa: imgCocoa,
    // Goat: imgGoat,
  };
  const [firstTwelveReceive, setFirstTwelveReceive] = useState([]);
  const [allCategoryName, setAllCategoryName] = useState([]);
  const [nameOfTheLastCategory, setNameOfTheLastCategory] = useState('');
  const maxLength = 12;
  const maxLengthCategory = 5;
  const dispatch = useDispatch();
  const resultSearch = useSelector((globalState) => globalState.searchBar.resultSearch);

  const componentDidMount = async () => {
    setFirstTwelveReceive(await firstTwelveCocktailApi());
    setAllCategoryName(await allCategoryDrinksApi());
  };

  useEffect(() => {
    componentDidMount();
  }, []);

  const onClickFilter = async ({ target: { name } }) => {
    setNameOfTheLastCategory(name);
    if (name === 'all' || name === nameOfTheLastCategory) {
      return setFirstTwelveReceive(await firstTwelveCocktailApi());
    }
    setFirstTwelveReceive(await firstTwelveCocktailByCategoryApi(name));
  };

  useEffect(() => {
    dispatch(resultSearchAction(firstTwelveReceive));
  }, [firstTwelveReceive]);

  return (
    <div className={ styles.recipe__container }>
      <Header
        title="Drinks"
        search
        image={
          <GiRiceCooker
            style={ {
              width: '5rem',
              height: '5rem',
              filter: `invert(9%) sepia(91%) saturate(3654%) 
        hue-rotate(261deg) brightness(90%) contrast(97%)`,
            } }
          />
        }
      />
      <div className={ styles.input__divs }>
        <input
          style={ {
            margin: '3% 0 3% 0',
            width: '5rem',
          } }
          src={ imgAll }
          alt="all button"
          data-testid="All-category-filter"
          type="image"
          name="all"
          onClick={ onClickFilter }
        />
        {allCategoryName.slice(0, maxLengthCategory).map((category) => (
          <input
            style={ {
              margin: '3% 0 3% 0',
              width: '5rem',
            } }
            type="image"
            alt={ category.strCategory }
            src={ objImages[category.strCategory] }
            name={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            key={ category.strCategory }
            onClick={ onClickFilter }
          />
        ))}
      </div>
      <div
        style={ {
          textAlign: 'center',
          maxWidth: '1024px',
        } }
      >
        {resultSearch.slice(0, maxLength).map((receive, index) => (
          <Link
            style={ {
              color: 'black',
            } }
            to={ `/drinks/${receive.idDrink}` }
            key={ receive.idDrink }
          >
            <div
              data-testid={ `${index}-recipe-card` }
              className={ styles.img__container }
            >
              <img
                style={ {
                  width: '100%',
                  borderRadius: '5px 5px 0 0',
                } }
                src={ receive.strDrinkThumb }
                alt={ receive.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {receive.strDrink}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
