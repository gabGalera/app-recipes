export const API_DETAILS = 'API_DETAILS';
export const RESULT_SEARCH_ACTION = 'resultsearchaction';

export const setAPIDetails = (API) => ({
  type: API_DETAILS,
  payload: API,
});

export const RECOMMENDATIONS_DETAILS = 'RECOMMENDATIONS_DETAILS';

export const setRecommendationsDetails = (API) => ({
  type: RECOMMENDATIONS_DETAILS,
  payload: API,
});

export const resultSearchAction = (payload) => ({
  type: RESULT_SEARCH_ACTION,
  payload,
});
