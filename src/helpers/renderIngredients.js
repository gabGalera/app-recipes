const renderIngredients = (API, pathname) => {
  const keys = Object.keys(API[0]);
  const ingredients = [];
  keys.forEach((entry) => {
    if (entry.includes('strIngredient') && API[0][entry]) {
      ingredients.push(entry);
    }
  });

  if (pathname.split('/')[3] === 'in-progress') {
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
          onClick={ ({ target }) => {
            if (target.checked) {
              document
                .getElementById(`${index}-ingredient-step`)
                .style.textDecoration = 'line-through solid rgb(0, 0, 0)';
            } else {
              document
                .getElementById(`${index}-ingredient-step`)
                .style.textDecoration = 'none';
            }
          } }
        />
        {API[0][entry]}
        {' '}
        {API[0][`strMeasure${index + 1}`]}
      </label>
    ));

    return JSX;
  }
  const JSX = ingredients.map((entry, index) => (
    <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
      {API[0][entry]}
      {' '}
      {API[0][`strMeasure${index + 1}`]}
    </p>
  ));

  return JSX;
};

export default renderIngredients;
