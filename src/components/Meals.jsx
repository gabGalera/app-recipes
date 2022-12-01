import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <div>
      <Header title="Meals" search />
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
