export const ingredientApi = async (ingrediente = 'carrot') => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result.meals === null || undefined ? [] : result.meals;
};

export const nameApi = async (name) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result.meals === null || undefined ? [] : result.meals;
};

export const firstLetterApi = async (firstLetter) => {
  if (firstLetter.length === 1) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const reponse = await fetch(url);
    const result = await reponse.json();
    return result.meals === null || undefined ? [] : result.meals;
  } global.alert('Your search must have only 1 (one) character');
  return [];
};

export const ingredientCocktailApi = async (ingrediente) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result.drinks === null || undefined ? [] : result.drinks;
};

export const nameCocktailApi = async (name) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result.drinks === null || undefined ? [] : result.drinks;
};

export const firstLetterCocktailApi = async (firstLetter) => {
  if (firstLetter.length === 1) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const reponse = await fetch(url);
    const result = await reponse.json();
    return result.drinks === null || undefined ? [] : result.drinks;
  } global.alert('Your search must have only 1 (one) character');
  return [];
};

export const firstTwelveMealsApi = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result.meals;
};

export const firstTwelveCocktailApi = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result.drinks;
};

export const allCategoryMealsApi = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result.meals;
};

export const allCategoryDrinksApi = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result.drinks;
};

export const firstTwelveCocktailByCategoryApi = async (category) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result.drinks;
};

export const firstTwelveMealsByCategoryApi = async (category) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result.meals;
};

export const fecthMealsDetails = async ({
  pathname,
  setId,
  setInProgressRecipes,
  setDoneRecipes,
  setAPI,
  setIsLoadingMain,
}) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`;
  const response = await fetch(url);
  const result = await response.json();
  setId(pathname.split('/')[2]);
  setInProgressRecipes(JSON
    .parse(localStorage.getItem('inProgressRecipes')) ? JSON
      .parse(localStorage.getItem('inProgressRecipes')) : {
      meals: { id: [] },
      drinks: { id: [] },
    });
  setDoneRecipes(JSON
    .parse(localStorage.getItem('doneRecipes')) ? JSON
      .parse(localStorage.getItem('doneRecipes')) : []);
  setAPI(result.meals);
  setIsLoadingMain(false);
};

export const fetchMealsRecommendations = async ({
  setRecommendations,
  setIsLoadingRecommendation,
}) => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const result = await response.json();
  setRecommendations(result.drinks);
  setIsLoadingRecommendation(false);
};

export const fecthDrinkDetails = async ({
  pathname,
  setId,
  setInProgressRecipes,
  setDoneRecipes,
  setAPI,
  setIsLoadingMain,
  setIsFood,
}) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`;
  const response = await fetch(url);
  const result = await response.json();
  setId(pathname.split('/')[2]);
  setInProgressRecipes(JSON
    .parse(localStorage.getItem('inProgressRecipes')) ? JSON
      .parse(localStorage.getItem('inProgressRecipes')) : {
      meals: { id: [] },
      drinks: { id: [] },
    });
  setDoneRecipes(JSON
    .parse(localStorage.getItem('doneRecipes')) ? JSON
      .parse(localStorage.getItem('doneRecipes')) : []);
  setIsFood(false);
  setAPI(result.drinks);
  setIsLoadingMain(false);
};

export const fetchDrinksRecommendations = async ({
  setRecommendations,
  setIsLoadingRecommendation,
}) => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const result = await response.json();
  setRecommendations(result.meals);
  setIsLoadingRecommendation(false);
};
