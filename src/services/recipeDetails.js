export const fecthMealsDetails = async ({
  pathname,
  setAPIDetails,
  dispatch,
  setIsLoadingMain,
}) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`;
  const response = await fetch(url);
  const result = await response.json();
  setIsLoadingMain(false);
  dispatch(setAPIDetails(result.meals));
};

export const fetchMealsRecommendations = async ({
  setIsLoadingRecommendation,
  setRecommendationsDetails,
  dispatch,
}) => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const result = await response.json();
  dispatch(setRecommendationsDetails(result.drinks));
  setIsLoadingRecommendation(false);
};

export const fecthDrinkDetails = async ({
  pathname,
  setAPIDetails,
  dispatch,
  setIsLoadingMain,
}) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`;
  const response = await fetch(url);
  const result = await response.json();
  dispatch(setAPIDetails(result.drinks));
  setIsLoadingMain(false);
};

export const fetchDrinksRecommendations = async ({
  setRecommendationsDetails,
  dispatch,
  setIsLoadingRecommendation,
}) => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const result = await response.json();
  dispatch(setRecommendationsDetails(result.meals));
  setIsLoadingRecommendation(false);
};
