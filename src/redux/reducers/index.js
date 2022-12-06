import { combineReducers } from 'redux';
import login from './login';
import recipeDetails from './recipeDetails';

const reducers = combineReducers({ login, recipeDetails });

export default reducers;
