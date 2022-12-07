import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const testBigMac = '/meals/53013';
const testAce = '/drinks/17225';

describe('Testando a página RecipeDetails', () => {
  test('verifica se os detalhes de receita são exibitos em meals BigMac', async () => {
    renderWithRouterAndRedux(<App />, testBigMac);

    const shareButton = await screen.findByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
  });

  test('verifica se os detalhes de receita são exibitos em drink Ace,', async () => {
    renderWithRouterAndRedux(<App />, testAce);

    const shareButton = await screen.findByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
  });
});
