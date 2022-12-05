export const fecthMealsDetails = async (pathname) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`;
  const response = await fetch(url);
  const result = await response.json();
  return result.meals;
};

export const fetchMealsRecommendations = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const result = await response.json();
  return result.drinks;
};

export const fecthDrinkDetails = async (pathname) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`;
  const response = await fetch(url);
  const result = await response.json();
  return result.drinks;
};

export const fetchDrinksRecommendations = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const result = await response.json();
  return result.meals;
};
