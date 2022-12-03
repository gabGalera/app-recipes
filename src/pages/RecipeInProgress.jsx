import React from 'react';
import { useHistory } from 'react-router-dom';
// import DetailsInformationsMeals from '../components/DetailsInformationsMeals';

function RecipeInProgress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  if (pathname.split('/')[1] === 'meals') {
    return (
      <h1>Hello World!</h1>
    );
  }
  return (
    <h1>Hello World!</h1>
  );
}

export default RecipeInProgress;
