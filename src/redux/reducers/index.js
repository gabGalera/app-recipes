import { combineReducers } from 'redux';
import searchBar from './searchBar';
import recipeDetails from './recipeDetails';

const reducers = combineReducers({ searchBar, recipeDetails });

export default reducers;
