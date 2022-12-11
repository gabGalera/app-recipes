import { RESULT_SEARCH_ACTION } from '../actions';

const inicialState = {
  resultSearch: [],
};

const searchBar = (state = inicialState, action) => {
  switch (action.type) {
  case RESULT_SEARCH_ACTION: return ({
    resultSearch: action.payload,
  });
  default: return state;
  }
};

export default searchBar;
