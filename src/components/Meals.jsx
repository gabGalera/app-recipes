import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GiRiceCooker } from 'react-icons/gi';
import { resultSearchAction } from '../redux/actions';
import { allCategoryMealsApi, firstTwelveMealsApi,
  firstTwelveMealsByCategoryApi } from '../services/searchApi';
import Footer from './Footer';
import Header from './Header';

function Meals() {
  const [firstTwelveReceive, setFirstTwelveReceive] = useState([]);
  const [allCategoryName, setAllCategoryName] = useState([]);
  const [nameOfTheLastCategory, setNameOfTheLastCategory] = useState('');
  const maxLength = 12;
  const maxLengthCategory = 5;
  const componentDidMount = async () => {
    setFirstTwelveReceive(await firstTwelveMealsApi());
    setAllCategoryName(await allCategoryMealsApi());
  };
  const resultSearch = useSelector((globalState) => globalState.searchBar.resultSearch);
  const dispatch = useDispatch();

  useEffect(() => {
    componentDidMount();
  }, []);

  const onClickFilter = async ({ target: { name } }) => {
    setNameOfTheLastCategory(name);
    if (name === 'all' || name === nameOfTheLastCategory) {
      return setFirstTwelveReceive(await firstTwelveMealsApi());
    }
    setFirstTwelveReceive(await firstTwelveMealsByCategoryApi(name));
  };

  useEffect(() => {
    dispatch(resultSearchAction(firstTwelveReceive));
  }, [firstTwelveReceive]);

  return (
    <div>
      <Header
        title="Meals"
        search
        image={
          <GiRiceCooker
            style={ {
              width: '5%',
              height: '5%',
              filter: `invert(9%) sepia(91%) saturate(3654%) 
          hue-rotate(261deg) brightness(90%) contrast(97%)`,
            } }
          />
        }
      />
      <div>
        {allCategoryName.slice(0, maxLengthCategory).map((category) => (
          <button
            type="button"
            name={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            key={ category.strCategory }
            onClick={ onClickFilter }
          >
            {category.strCategory}
          </button>
        ))}
        <button
          data-testid="All-category-filter"
          type="button"
          name="all"
          onClick={ onClickFilter }
        >
          All
        </button>
      </div>
      {resultSearch.slice(0, maxLength).map((receive, index) => (
        <Link to={ `/meals/${receive.idMeal}` } key={ receive.idMeal }>
          <div data-testid={ `${index}-recipe-card` }>
            <img
              src={ receive.strMealThumb }
              alt={ receive.strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{receive.strMeal}</p>
          </div>
        </Link>
      ))}
      <Footer />
    </div>
  );
}

export default Meals;
