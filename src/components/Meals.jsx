import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GiRiceCooker } from 'react-icons/gi';
import { resultSearchAction } from '../redux/actions';
import { allCategoryMealsApi, firstTwelveMealsApi,
  firstTwelveMealsByCategoryApi } from '../services/searchApi';
import styles from '../styles/Recipes.module.css';
import imgAll from '../images/All.svg';
import imgBeef from '../images/beef.svg';
import imgBreakfast from '../images/breakfast.svg';
import imgChicken from '../images/chicken.svg';
import imgDessert from '../images/dessert.svg';
import imgGoat from '../images/goat.svg';
import Footer from './Footer';
import Header from './Header';

function Meals() {
  const objImages = {
    All: imgAll,
    Beef: imgBeef,
    Breakfast: imgBreakfast,
    Chicken: imgChicken,
    Dessert: imgDessert,
    Goat: imgGoat,
  };
  const [allCategoryName, setAllCategoryName] = useState([]);
  const [nameOfTheLastCategory, setNameOfTheLastCategory] = useState('');
  const maxLength = 12;
  const maxLengthCategory = 5;
  const resultSearch = useSelector((globalState) => globalState.searchBar.resultSearch);
  const dispatch = useDispatch();

  const componentDidMount = async () => {
    dispatch(resultSearchAction(await firstTwelveMealsApi()));
    setAllCategoryName(await allCategoryMealsApi());
  };

  useEffect(() => {
    componentDidMount();
  }, []);

  const onClickFilter = async ({ target: { name } }) => {
    setNameOfTheLastCategory(name);
    if (name === 'all' || name === nameOfTheLastCategory) {
      return dispatch(resultSearchAction(await firstTwelveMealsApi()));
    }
    dispatch(resultSearchAction(await firstTwelveMealsByCategoryApi(name)));
  };

  return (
    <div
      className={ styles.recipe__container }
    >
      <Header
        title="Meals"
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
      <div
        className={ styles.input__divs }
      >
        <input
          className={ styles.img__input }
          data-testid="All-category-filter"
          alt="all-buttom"
          type="image"
          name="all"
          src={ imgAll }
          onClick={ onClickFilter }
        />
        {allCategoryName.slice(0, maxLengthCategory).map((category) => (
          <input
            className={ styles.img__input }
            src={ objImages[category.strCategory] }
            alt={ category.strCategory }
            type="image"
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
            to={ `/meals/${receive.idMeal}` }
            key={ receive.idMeal }
            style={ {
              color: 'black',
            } }
          >
            <div
              className={ styles.img__container }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                style={ {
                  width: '100%',
                  borderRadius: '5px 5px 0 0',
                } }
                src={ receive.strMealThumb }
                alt={ receive.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {receive.strMeal}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Meals;
