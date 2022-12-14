import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import mealsMock from '../services/mealsMock';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('User experience', () => {
  const dataTestIdEmail = 'email-input';
  const dataTestIdPassword = 'password-input';
  const emailTest = 'test@test.com';
  const recipeTitleStr = 'recipe-title';
  const profileBtnStr = 'profile-top-btn';
  const cardImg0 = '0-card-img';
  const favoriteBtn = 'favorite-btn';

  jest.setTimeout(32000);

  test('Testes para user experience com meals', async () => {
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;

    global.alert = jest.fn();
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(dataTestIdEmail);
    const inputSenha = screen.getByTestId(dataTestIdPassword);
    const loginButton = screen.getByRole('button', { name: 'Enter' });
    userEvent.type(inputEmail, emailTest);
    userEvent.type(inputSenha, '1234567');
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);
    expect(history.location.pathname).toEqual('/meals');

    await waitFor(
      () => screen.findByTestId('Beef-category-filter'),
      { timeout: 10000 },
    );

    userEvent.click(await screen.findByTestId('Beef-category-filter'));
    userEvent.click(await screen.findByTestId('Breakfast-category-filter'));
    userEvent.click(await screen.findByTestId('Chicken-category-filter'));
    userEvent.click(await screen.findByTestId('Dessert-category-filter'));
    userEvent.click(await screen.findByTestId('Goat-category-filter'));
    userEvent.click(await screen.findByTestId('All-category-filter'));

    await waitFor(
      () => screen.findByTestId('search-input'),
    );

    userEvent.type(await screen.findByTestId('search-input'), '');
    userEvent.click(await screen.findByTestId('first-letter-search-radio'));
    userEvent.click(screen.getByTestId('exec-search-btn'));
    expect(global.alert).toHaveBeenCalled();

    await waitFor(
      () => screen.findByTestId(cardImg0),
    );

    userEvent.click(await screen.findByTestId('All-category-filter'));

    const img = await screen.findByTestId(cardImg0);

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
    const favoriteButton = await screen.findByTestId(favoriteBtn);
    const shareButton = await screen.findByTestId('share-btn');

    userEvent.click(shareButton);
    userEvent.click(favoriteButton);
    userEvent.click(favoriteButton);
    userEvent.click(favoriteButton);
    userEvent.click(startButton);
    await waitFor(
      () => screen.findByTestId(recipeTitleStr),
      { timeout: 30000 },
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
    userEvent.click(finishButton);

    await waitFor(
      () => screen.findByTestId(profileBtnStr),
      { timeout: 30000 },
    );
    const userBtn = await screen.findByTestId(profileBtnStr);
    userEvent.click(userBtn);

    const favBtn = await screen.findByTestId('profile-favorite-btn');
    userEvent.click(favBtn);
    const corbaRecipe = await screen.findByTestId('0-horizontal-name');
    expect(corbaRecipe).toBeInTheDocument();
    userEvent.click(corbaRecipe);

    await waitFor(
      () => screen.findByText(/continue/i),
      { timeout: 30000 },
    );
    const continueBtn = await screen.findByText(/continue/i);

    userEvent.click(await screen.findByTestId(favoriteBtn));
    userEvent.click(continueBtn);
    await waitFor(
      () => screen.findByText(/finish/i),
      { timeout: 30000 },
    );

    userEvent.click(await screen.findByText(/finish/i));
    userEvent.click(await screen.findByTestId(profileBtnStr));
    userEvent.click(await screen.findByTestId('drinks-bottom-btn'));

    await waitFor(
      () => screen.findByTestId(cardImg0),
      { timeout: 30000 },
    );

    userEvent.click(screen.getByTestId(cardImg0));
    await waitFor(
      () => screen.findByTestId(recipeTitleStr),
      { timeout: 30000 },
    );

    userEvent.click(await screen.findByTestId(favoriteBtn));
    userEvent.click(await screen.findByTestId('start-recipe-btn'));
    screen.debug();
    await waitFor(
      () => screen.findByTestId(recipeTitleStr),
      { timeout: 30000 },
    );

    const ingredientsId2 = await screen.findAllByRole('checkbox');
    userEvent.click(ingredientsId2[0]);
    expect(ingredientsId2[0]).toBeChecked();
    userEvent.click(ingredientsId2[0]);
    expect(ingredientsId2[0]).not.toBeChecked();
    ingredientsId2
      .forEach((id) => {
        userEvent.click(id);
      });

    userEvent.click(await screen.findByTestId('finish-recipe-btn'));

    userEvent.click(await screen.findByTestId('filter-by-all-btn'));
    userEvent.click(await screen.findByTestId('filter-by-meal-btn'));
    userEvent.click(await screen.findByTestId('filter-by-drink-btn'));

    userEvent.click(await screen.findByTestId(profileBtnStr));

    userEvent.click(await screen.findByTestId('profile-favorite-btn'));
    userEvent.click(await screen.findByTestId('0-horizontal-favorite-btn'));
    userEvent.click(await screen.findByTestId('filter-by-all-btn'));
    userEvent.click(await screen.findByTestId('filter-by-meal-btn'));
    userEvent.click(await screen.findByTestId('filter-by-drink-btn'));
  });
});
