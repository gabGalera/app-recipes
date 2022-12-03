const renderIngredients = (API) => {
  const keys = Object.keys(API[0]);
  const ingredients = [];
  keys.forEach((entry) => {
    if (entry.includes('strIngredient') && API[0][entry]) {
      ingredients.push(entry);
    }
  });

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
