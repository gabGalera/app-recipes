import { JSONInProgressRecipesReader } from './JSONReaders';
import firstTimeInProgress from './firstTimeInProgress';
import styles from '../styles/RecipeDetails.module.css';
import ingredientStyles from '../styles/RecipeInProgress.module.css';

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
    if (!inProgressRecipes[type][id]) {
      const JSX = firstTimeInProgress({ API, type, id, inProgressRecipes, ingredients });

      return JSX;
    }
    const JSX = (
      <div
        className={ ingredientStyles.ingredients__main__div }
      >
        {
          ingredients.map((entry, index) => (
            <label
              htmlFor={ `check-ingredients-${index}` }
              key={ index }
              id={ `${index}-ingredient-step` }
              data-testid={ `${index}-ingredient-step` }
              style={ {
                margin: '5px',
              } }
            >
              <input
                type="checkbox"
                id={ `check-ingredients-${index}` }
                onChange={ ({ target }) => {
                  if (target.checked) {
                    target.checked = true;
                    document
                      .getElementById(`${index}-ingredient-step`)
                      .style.textDecoration = 'line-through solid rgb(0, 0, 0)';
                    inProgressRecipes[type][id][index][`strIngredient
                    ${index + 1}`] = true;
                    localStorage
                      .setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
                    document
                      .getElementById('finish-recipe-btn')
                      .disabled = inProgressRecipes[pathname
                        .split('/')[1]][pathname
                        .split('/')[2]]
                        .some((ingredient) => Object.values(ingredient)[0] === false);
                  } else {
                    target.checked = false;
                    document
                      .getElementById(`${index}-ingredient-step`)
                      .style.textDecoration = 'none';
                    inProgressRecipes[type][id][index][`strIngredient
                    ${index + 1}`] = false;
                    localStorage
                      .setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
                    document
                      .getElementById('finish-recipe-btn')
                      .disabled = inProgressRecipes[pathname
                        .split('/')[1]][pathname
                        .split('/')[2]]
                        .some((ingredient) => Object.values(ingredient)[0] === false);
                  }
                } }
              />
              {API[0][entry]}
              {' '}
              {API[0][`strMeasure${index + 1}`]}
            </label>
          ))
        }
      </div>
    );

    return JSX;
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
