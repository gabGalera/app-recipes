import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('Testando o Componente Footer', () => {
  // test('Verifica se o componente Footer está renderizando na rota /meals', () => {
  //   const { getByTestId } = renderWithRouterAndRedux(<App />, '/meals');

  //   const foodBottom = getByTestId('meals-bottom-btn');
  //   const drinkBottom = getByTestId('drinks-bottom-btn');

  //   expect(foodBottom).toBeInTheDocument();
  //   expect(drinkBottom).toBeInTheDocument();
  // });

  test('Verifica se o componente Footer está renderizando na rota /drinks', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />, '/drinks');

    const foodBottom = getByTestId('meals-bottom-btn');
    const drinkBottom = getByTestId('drinks-bottom-btn');

    expect(foodBottom).toBeInTheDocument();
    expect(drinkBottom).toBeInTheDocument();
  });

  test('Verifica se ao clicar no bottom de drink o usuário é direcionado para a tela drink', () => {
    const { history, getByTestId } = renderWithRouterAndRedux(<App />, '/drinks');

    const foodBottom = getByTestId('meals-bottom-btn');

    fireEvent.click(foodBottom);
    expect(history.location.pathname).toBe('/meals');
  });

  test('Verifica se ao clicar no bottom de drink o usuário é direcionado para a tela drink', () => {
    const { history, getByTestId } = renderWithRouterAndRedux(<App />, '/meals');

    const drinkBottom = getByTestId('drinks-bottom-btn');

    fireEvent.click(drinkBottom);
    expect(history.location.pathname).toBe('/drinks');
  });
});
