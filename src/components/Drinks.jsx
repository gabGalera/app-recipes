import React, { useState, useEffect } from 'react';
import { allCategoryDrinksApi,
  firstTwelveCocktailApi, firstTwelveCocktailByCategoryApi } from '../services/searchApi';
import Footer from './Footer';
import Header from './Header';

function Drinks() {
  const [firstTwelveReceive, setFirstTwelveReceive] = useState([]);
  const [allCategoryName, setAllCategoryName] = useState([]);
  const maxLength = 12;
  const maxLengthCategory = 5;
  const componentDidMount = async () => {
    setFirstTwelveReceive(await firstTwelveCocktailApi());
    setAllCategoryName(await allCategoryDrinksApi());
  };

  useEffect(() => {
    componentDidMount();
  }, []);

  const onClickFilter = async ({ target: { name } }) => {
    if (name === 'all') return setFirstTwelveReceive(await firstTwelveCocktailApi());
    setFirstTwelveReceive(await firstTwelveCocktailByCategoryApi(name));
  };

  return (
    <div>
      <Header title="Drinks" search />
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
      {firstTwelveReceive.slice(0, maxLength).map((receive, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ receive.idMeal }>
          <img
            src={ receive.strDrinkThumb }
            alt={ receive.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{receive.strDrink}</p>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default Drinks;
