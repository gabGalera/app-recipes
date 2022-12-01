import React, { useState, useEffect } from 'react';
import { firstTwelveCocktailApi } from '../services/searchApi';
import Footer from './Footer';
import Header from './Header';

function Drinks() {
  const [firstTwelveReceive, setFirstTwelveReceive] = useState([]);
  const maxLength = 12;
  const componentDidMount = async () => {
    setFirstTwelveReceive(await firstTwelveCocktailApi());
  };

  useEffect(() => {
    componentDidMount();
  }, []);

  return (
    <div>
      <Header title="Drinks" search />
      <Footer />
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
    </div>
  );
}

export default Drinks;
