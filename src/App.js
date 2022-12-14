import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
// import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
// import store from './redux';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import RecipeDetails from './pages/RecipeDetails';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    // <div
    //   style={ {
    //     background: 'rgba(65, 25, 127, 1)',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     minHeight: '100vh',
    //   } }
    // >
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Recipes } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/meals/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
    </Switch>
    // </div>
  );
}

export default App;
