import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('User experience', () => {
  const mockClipboard = {
    writeText: jest.fn(),
  };
  global.navigator.clipboard = mockClipboard;

  global.alert = jest.fn();

  const dataTestIdEmail = 'email-input';
  const dataTestIdPassword = 'password-input';
  const emailTest = 'test@test.com';
  const recipeTitleStr = 'recipe-title';
  const profileBtnStr = 'profile-top-btn';
  const searchInput = 'search-input';
  const execButton = 'exec-search-btn';

  jest.setTimeout(32000);

  test('Testes para user experience com drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(dataTestIdEmail);
    const inputSenha = screen.getByTestId(dataTestIdPassword);
    const loginButton = screen.getByRole('button', { name: 'Enter' });
    userEvent.type(inputEmail, emailTest);
    userEvent.type(inputSenha, '1234567');
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);
    expect(history.location.pathname).toEqual('/meals');

    userEvent.click(screen.getByTestId('drinks-bottom-btn'));

    await waitFor(
      () => screen.findByTestId('0-card-img'),
    );
    expect(history.location.pathname).toEqual('/drinks');

    userEvent.click(await screen.findByTestId('Ordinary Drink-category-filter'));
    userEvent.click(await screen.findByTestId('Cocktail-category-filter'));
    userEvent.click(await screen.findByTestId('Shake-category-filter'));
    userEvent.click(await screen.findByTestId('Other / Unknown-category-filter'));
    userEvent.click(await screen.findByTestId('Cocoa-category-filter'));
    userEvent.click(await screen.findByTestId('All-category-filter'));

    await waitFor(
      () => screen.findByTestId(searchInput),
    );

    userEvent.type(screen.getByTestId(searchInput), '');
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.click(screen.getByTestId(execButton));
    expect(global.alert).toHaveBeenCalled();

    await waitFor(
      () => screen.findByTestId(searchInput),
    );

    userEvent.type(screen.getByTestId(searchInput), 'a');
    userEvent.click(screen.getByTestId(execButton));

    await waitFor(
      () => screen.findByTestId(searchInput),
    );

    userEvent.type(screen.getByTestId(searchInput), 'ahhdjdjjjjsaiejajl');
    userEvent.click(screen.getByTestId(execButton));

    await waitFor(
      () => screen.findByTestId(searchInput),
    );

    userEvent.type(screen.getByTestId(searchInput), 'water');
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.click(screen.getByTestId(execButton));

    await waitFor(
      () => screen.findByTestId(searchInput),
    );

    userEvent.type(screen.getByTestId(searchInput), 'a');
    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.click(screen.getByTestId(execButton));

    await waitFor(
      () => screen.findByTestId(searchInput),
    );

    userEvent.type(screen.getByTestId(searchInput), 'a');
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.click(screen.getByTestId(execButton));

    await waitFor(
      () => screen.findByTestId(searchInput),
    );

    userEvent.click(screen.getByTestId('drinks-bottom-btn'));

    const img = await screen.findByTestId('0-card-img');
    expect(img).toBeInTheDocument();
    userEvent.click(img);
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();

    await waitFor(
      () => screen.findByTestId(recipeTitleStr),
      { timeout: 10000 },
    );

    const recipeTitle = await screen.findByTestId(recipeTitleStr);
    expect(recipeTitle).toBeInTheDocument();
    const startButton = await screen.findByTestId('start-recipe-btn');
    const favoriteButton = await screen.findByTestId('favorite-btn');
    const shareButton = await screen.findByTestId('share-btn');

    userEvent.click(shareButton);
    userEvent.click(favoriteButton);
    userEvent.click(favoriteButton);
    userEvent.click(favoriteButton);
    userEvent.click(startButton);

    await waitFor(
      () => screen.findByTestId(recipeTitleStr),
      { timeout: 10000 },
    );

    const ingredientsId = await screen.findAllByRole('checkbox');
    userEvent.click(ingredientsId[0]);
    expect(ingredientsId[0]).toBeChecked();
    userEvent.click(ingredientsId[0]);
    expect(ingredientsId[0]).not.toBeChecked();
    ingredientsId
      .forEach((id) => {
        userEvent.click(id);
        expect(id).toBeChecked();
      });
    const finishButton = await screen.findByTestId('finish-recipe-btn');
    expect(finishButton).not.toBeDisabled();
    userEvent.click(finishButton);

    await waitFor(
      () => screen.findByTestId(profileBtnStr),
      { timeout: 10000 },
    );

    const shareHorizontal = await screen.findByTestId('0-horizontal-share-btn');
    userEvent.click(shareHorizontal);

    const userBtn = await screen.findByTestId(profileBtnStr);
    userEvent.click(userBtn);

    const favBtn = await screen.findByTestId('profile-favorite-btn');
    userEvent.click(favBtn);
    const gg = await screen.findByTestId('0-horizontal-name');
    expect(gg).toBeInTheDocument();

    const shareHorizontalFav = await screen.findByTestId('0-horizontal-share-btn');
    userEvent.click(shareHorizontalFav);

    userEvent.click(gg);

    await waitFor(
      () => screen.findByText(/continue/i),
      { timeout: 10000 },
    );

    const continueBtn = await screen.findByText(/continue/i);

    userEvent.click(continueBtn);

    await waitFor(
      () => screen.findByText(/finish/i),
      { timeout: 10000 },
    );

    userEvent.click(await screen.findByText(/finish/i));

    userEvent.click(screen.getByTestId('filter-by-all-btn'));
    userEvent.click(screen.getByTestId('filter-by-meal-btn'));
    userEvent.click(screen.getByTestId('filter-by-drink-btn'));

    const userBtn2 = await screen.findByTestId(profileBtnStr);
    userEvent.click(userBtn2);

    const favBtn2 = await screen.findByTestId('profile-favorite-btn');
    userEvent.click(favBtn2);

    const favHorizontalFav = await screen.findByTestId('0-horizontal-favorite-btn');
    userEvent.click(favHorizontalFav);
  });

  test('testa favoriteRecipes sem receita', async () => {
    localStorage.clear();
    renderWithRouterAndRedux(<App />, '/favorite-recipes');
    expect(global.alert).toHaveBeenCalled();
  });
});
