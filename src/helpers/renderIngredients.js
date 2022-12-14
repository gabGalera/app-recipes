import { JSONInProgressRecipesReader } from './JSONReaders';
import firstTimeInProgress from './firstTimeInProgress';
import styles from '../styles/RecipeDetails.module.css';

const renderIngredients = (API, pathname) => {
  const type = pathname.split('/')[1];
  const id = pathname.split('/')[2];
  const inProgressRecipes = JSONInProgressRecipesReader;
  const keys = Object.keys(API[0]);
  const ingredients = [];
  keys.forEach((entry) => {
    if (entry.includes('strIngredient') && API[0][entry]) {
      ingredients.push(entry);
    }
  });

  if (pathname.split('/')[3] === 'in-progress') {
    return firstTimeInProgress({ API, type, id, inProgressRecipes, ingredients });
  }

  const JSX = (
    <ul
      className={ styles.ingredients__ul }
    >
      {ingredients.map((entry, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {API[0][entry]}
          {' '}
          {API[0][`strMeasure${index + 1}`]}
        </li>
      ))}
    </ul>
  );

  return JSX;
};

export default renderIngredients;
