import React, { useState, useEffect } from 'react';
import { firstTwelveMealsApi } from '../services/searchApi';
import Footer from './Footer';
import Header from './Header';

function Meals() {
  const [firstTwelveReceive, setFirstTwelveReceive] = useState([]);
  const maxLength = 12;
  const componentDidMount = async () => {
    setFirstTwelveReceive(await firstTwelveMealsApi());
  };

  useEffect(() => {
    componentDidMount();
  }, []);

  return (
    <div>
      <Header title="Meals" search />
      <Footer />
      {firstTwelveReceive.slice(0, maxLength).map((receive, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ receive.idMeal }>
          <img
            src={ receive.strMealThumb }
            alt={ receive.strMeal }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{receive.strMeal}</p>
        </div>
      ))}
    </div>
  );
}

export default Meals;
