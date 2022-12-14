import ingredientStyles from '../styles/RecipeInProgress.module.css';

const firstTimeInProgress = ({ API, type, id, inProgressRecipes, ingredients }) => {
  if (!inProgressRecipes[type][id]) {
    ingredients
      .forEach((ingredient) => {
        if (inProgressRecipes[type][id]) {
          inProgressRecipes[type][id].push(({ [ingredient]: false }));
          inProgressRecipes[type][id]
            .filter(
              (entry, index) => inProgressRecipes[type][id].indexOf(entry) === index,
            );
        } else {
          inProgressRecipes[type][id] = [({ [ingredient]: false })];
        }
      });
  }

  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  const JSX = (
    <div className={ ingredientStyles.ingredients__main__div }>
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
              className={ `check-ingredients-${index}` }
              id={ `check-ingredients-${index}` }
              onChange={ ({ target }) => {
                if (target.checked) {
                  target.checked = true;
                  document
                    .getElementById(`${index}-ingredient-step`)
                    .style.textDecoration = 'line-through solid rgb(0, 0, 0)';
                  inProgressRecipes[type][id][index][`strIngredient${index + 1}`] = true;
                  localStorage
                    .setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
                  document
                    .getElementById('finish-recipe-btn')
                    .disabled = inProgressRecipes[type][id]
                      .some((ingredient) => Object.values(ingredient)[0] === false);
                } else {
                  target.checked = false;
                  document
                    .getElementById(`${index}-ingredient-step`)
                    .style.textDecoration = 'none';
                  inProgressRecipes[type][id][index][`strIngredient${index + 1}`] = false;
                  localStorage
                    .setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
                  document
                    .getElementById('finish-recipe-btn')
                    .disabled = inProgressRecipes[type][id]
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
};

export default firstTimeInProgress;
