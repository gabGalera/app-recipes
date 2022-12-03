import { RECOMMENDATIONS_DETAILS,
  API_DETAILS } from '../actions';

const inicialState = {
  API: [],
  recommendations: [],
};

const recipeDetails = (state = inicialState, action) => {
  switch (action.type) {
  case API_DETAILS:
    return ({
      ...state,
      API: action.payload,
    });
  case RECOMMENDATIONS_DETAILS:
    return ({
      ...state,
      recommendations: action.payload,
    });
  default:
    return state;
  }
};

export default recipeDetails;
