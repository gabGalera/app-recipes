import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import store from './redux';

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
