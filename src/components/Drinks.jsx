import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GiRiceCooker } from 'react-icons/gi';
import { resultSearchAction } from '../redux/actions';
import { allCategoryDrinksApi,
  firstTwelveCocktailApi, firstTwelveCocktailByCategoryApi } from '../services/searchApi';
import Footer from './Footer';
import Header from './Header';

function Drinks() {
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
    <div>
      <Header
        title="Drinks"
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
        <Link to={ `/drinks/${receive.idDrink}` } key={ receive.idDrink }>
          <div data-testid={ `${index}-recipe-card` }>
            <img
              src={ receive.strDrinkThumb }
              alt={ receive.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{receive.strDrink}</p>
          </div>
        </Link>
      ))}
      <Footer />
    </div>
  );
}

export default Drinks;
