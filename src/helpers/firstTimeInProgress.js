const firstTimeInProgress = ({ API, type, id, inProgressRecipes, ingredients }) => {
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

  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  const JSX = ingredients.map((entry, index) => (
    <label
      htmlFor="check-ingredients"
      key={ index }
      id={ `${index}-ingredient-step` }
      data-testid={ `${index}-ingredient-step` }
      style={ {
        margin: '5px',
      } }
    >
      <input
        type="checkbox"
        id="check-ingredients"
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
  ));
  return JSX;
};

export default firstTimeInProgress;