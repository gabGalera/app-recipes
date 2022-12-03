export const JSONFavRecipesReader = JSON
  .parse(localStorage.getItem('favoriteRecipes')) ? JSON
    .parse(localStorage.getItem('favoriteRecipes')) : [];

export const JSONInProgressRecipesReader = JSON
  .parse(localStorage.getItem('inProgressRecipes')) ? JSON
    .parse(localStorage.getItem('inProgressRecipes')) : {
    meals: { id: [] },
    drinks: { id: [] },
  };

export const JSONDoneRecipesReader = JSON
  .parse(localStorage.getItem('doneRecipes')) ? JSON
    .parse(localStorage.getItem('doneRecipes')) : [];
